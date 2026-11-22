#!/usr/bin/env bash
# Builds the nginx image and checks its routing against an HTTP echo server standing in
# for the Django `api` container. Exits non-zero on the first failed check.
#
#   scripts/test-nginx.sh            # builds the image
#   IMAGE=foo:bar SKIP_BUILD=1 scripts/test-nginx.sh
set -euo pipefail

IMAGE="${IMAGE:-react-moviechooser:test}"
ECHO_IMAGE="${ECHO_IMAGE:-mendhak/http-https-echo:43}"
RUN_ID="nginx-test-$$"
NETWORK="$RUN_ID"
WEB="$RUN_ID-web"
# The echo servers get unique names and answer to `api` through a network alias.
API_ONE="$RUN_ID-api-one"
API_TWO="$RUN_ID-api-two"

cd "$(dirname "$0")/.."

cleanup() {
  status=$?
  if [ "$status" -ne 0 ] && docker inspect "$WEB" >/dev/null 2>&1; then
    echo "--- nginx logs ---" >&2
    docker logs "$WEB" 2>&1 | tail -n 50 >&2 || true
  fi
  docker rm -f "$WEB" "$API_ONE" "$API_TWO" >/dev/null 2>&1 || true
  docker network rm "$NETWORK" >/dev/null 2>&1 || true
  exit "$status"
}
trap cleanup EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "ok - $*"; }

if [ -z "${SKIP_BUILD:-}" ]; then
  docker build -t "$IMAGE" .
fi

docker network create "$NETWORK" >/dev/null

# Start nginx before `api` exists: it must still start, since `api` is resolved per request.
docker run -d --name "$WEB" --network "$NETWORK" -p 127.0.0.1::8080 "$IMAGE" >/dev/null
PORT="$(docker port "$WEB" 8080/tcp | head -n1 | sed 's/.*://')"
BASE="http://127.0.0.1:$PORT"

# start_api <container name> <hostname it reports>
start_api() {
  docker run -d --network "$NETWORK" --name "$1" --network-alias api --hostname "$2" \
    -e HTTP_PORT=8000 "$ECHO_IMAGE" >/dev/null
  # Wait for this echo server itself (by its own name) to accept connections.
  for _ in $(seq 1 30); do
    if docker exec "$WEB" wget -qO- "http://$1:8000/__ready" >/dev/null 2>&1; then return 0; fi
    sleep 0.5
  done
  fail "echo server $2 did not start"
}

for _ in $(seq 1 30); do
  curl -fsS "$BASE/healthz" >/dev/null 2>&1 && break
  sleep 0.5
done

# --- checks -----------------------------------------------------------------

body="$(curl -fsS "$BASE/healthz")" || fail "/healthz request failed"
[ "$body" = "ok" ] || fail "/healthz body was '$body'"
pass "GET /healthz returns ok (nginx started without api)"

[ "$(docker inspect -f '{{.Config.User}}' "$IMAGE")" != "" ] || fail "image has no non-root USER"
uid="$(docker exec "$WEB" id -u)"
[ "$uid" != "0" ] || fail "nginx runs as root"
pass "container runs as uid $uid"

start_api "$API_ONE" api-one

# Fetches a URL; sets $code, $headers (lower-cased) and $body.
fetch() {
  local tmp
  tmp="$(mktemp -d)"
  # Exist even if curl never connects, so a dead nginx fails the check, not the script.
  touch "$tmp/body" "$tmp/headers"
  code="$(curl -sS -o "$tmp/body" -D "$tmp/headers" -w '%{http_code}' "$@")" || code=000
  headers="$(tr 'A-Z' 'a-z' <"$tmp/headers" | tr -d '\r')"
  body="$(cat "$tmp/body")"
  rm -rf "$tmp"
}

INDEX="$(docker exec "$WEB" cat /usr/share/nginx/html/index.html)"
is_index() { [ "$body" = "$INDEX" ]; }
# The echo server returns JSON; anything else means the request didn't reach it.
echo_field() { jq -er "$1" <<<"$body" 2>/dev/null; }
reached_api() {
  echo_field '.path' >/dev/null || fail "$1 did not reach api (status $code): ${body:0:200}"
}

fetch "$BASE/"
[ "$code" = 200 ] || fail "GET / returned $code"
is_index || fail "GET / did not return index.html"
grep -q '^cache-control: no-cache$' <<<"$headers" || fail "GET / missing Cache-Control: no-cache"
! grep -q '^vary: accept' <<<"$headers" || fail "GET / has Vary: Accept"
pass "GET / returns index.html with no-cache (no Vary: Accept)"

fetch -H 'Accept: text/html' "$BASE/movies/some-slug"
[ "$code" = 200 ] && is_index || fail "GET /movies/some-slug did not return index.html ($code)"
grep -q '^cache-control: no-cache$' <<<"$headers" || fail "deep link missing Cache-Control: no-cache"
pass "GET /movies/some-slug returns index.html"

asset="$(grep -oE '/assets/[^"]+\.js' <<<"$INDEX" | head -n1)"
[ -n "$asset" ] || fail "no /assets/*.js referenced from index.html"
fetch "$BASE$asset"
[ "$code" = 200 ] || fail "GET $asset returned $code"
grep -q '^cache-control: public, max-age=31536000, immutable$' <<<"$headers" || fail "GET $asset not immutable"
pass "GET $asset is cached as immutable"

fetch -H 'Accept: text/html' "$BASE/assets/missing.js"
[ "$code" = 404 ] || fail "GET /assets/missing.js returned $code"
! is_index || fail "GET /assets/missing.js returned index.html"
pass "GET /assets/missing.js returns 404"

fetch -H 'Host: moviechooser.co.uk' -H 'CF-Connecting-IP: 203.0.113.9' \
  -H 'Authorization: JWT test-token' "$BASE/api/movies/?q=x"
reached_api "GET /api/movies/?q=x"
[ "$(echo_field '.url')" = "/api/movies/?q=x" ] || fail "path/query changed: $(echo_field '.url')"
[ "$(echo_field '.headers["x-forwarded-proto"]')" = https ] || fail "x-forwarded-proto not https"
[ "$(echo_field '.headers.host')" = moviechooser.co.uk ] || fail "host was $(echo_field '.headers.host')"
pass "GET /api/movies/?q=x reaches api unchanged, with x-forwarded-proto: https and the client's host"

[ "$(echo_field '.headers["x-forwarded-for"]')" = 203.0.113.9 ] || fail "x-forwarded-for was $(echo_field '.headers["x-forwarded-for"]')"
[ "$(echo_field '.headers["x-real-ip"]')" = 203.0.113.9 ] || fail "x-real-ip was $(echo_field '.headers["x-real-ip"]')"
[ "$(echo_field '.headers["cf-connecting-ip"]')" = 203.0.113.9 ] || fail "cf-connecting-ip not passed through"
[ "$(echo_field '.headers.authorization')" = "JWT test-token" ] || fail "authorization not passed through"
pass "CF-Connecting-IP becomes x-forwarded-for/x-real-ip; Authorization passes through"

fetch -H 'Accept: text/html' "$BASE/auth/signin"
[ "$code" = 200 ] && is_index || fail "GET /auth/signin (html) did not return index.html ($code)"
grep -q '^vary: accept$' <<<"$headers" || fail "GET /auth/signin (html) missing Vary: Accept"
pass "GET /auth/signin (Accept: text/html) returns index.html with Vary: Accept"

fetch -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' \
  --data '{"email":"a@b.c"}' "$BASE/auth/login/"
reached_api "POST /auth/login/"
[ "$(echo_field '.method')" = POST ] && [ "$(echo_field '.path')" = /auth/login/ ] || fail "POST /auth/login/ arrived as $(echo_field '.method') $(echo_field '.path')"
grep -q '^vary: accept$' <<<"$headers" || fail "POST /auth/login/ missing Vary: Accept"
pass "POST /auth/login/ (Accept: application/json) reaches api with Vary: Accept"

fetch -H 'Accept: text/html' "$BASE/auth/password-reset-confirm/abc/def/"
reached_api "GET /auth/password-reset-confirm/abc/def/"
[ "$(echo_field '.path')" = /auth/password-reset-confirm/abc/def/ ] || fail "reset path was $(echo_field '.path')"
pass "GET /auth/password-reset-confirm/abc/def/ (Accept: text/html) reaches api"

for path in /list/ /admin/ /accounts/ /static/admin/css/base.css /admin /list /accounts; do
  fetch -H 'Accept: text/html' "$BASE$path"
  reached_api "GET $path"
  [ "$(echo_field '.path')" = "$path" ] || fail "$path arrived as $(echo_field '.path')"
  pass "GET $path reaches api"
done

# Restart test: replace `api` with a new container on a new IP, without restarting nginx.
# The new one starts while the old one still holds its IP, so Docker can't reuse it.
ip_of() { docker inspect -f "{{(index .NetworkSettings.Networks \"$NETWORK\").IPAddress}}" "$1"; }
old_ip="$(ip_of "$API_ONE")"
start_api "$API_TWO" api-two
new_ip="$(ip_of "$API_TWO")"
docker stop -t 1 "$API_ONE" >/dev/null
[ "$old_ip" != "$new_ip" ] || fail "new api container reused IP $old_ip"

start=$SECONDS
deadline=$((SECONDS + 15))
while :; do
  fetch --max-time 4 "$BASE/api/movies/" || true
  if [ "$(echo_field '.os.hostname')" = api-two ]; then break; fi
  echo "  waiting for nginx to re-resolve api (got status $code after $((SECONDS - start))s)"
  [ "$SECONDS" -lt "$deadline" ] || fail "GET /api/movies/ did not reach the new api ($new_ip) within 15s (status $code)"
  sleep 1
done
pass "after api is recreated ($old_ip -> $new_ip), within $((SECONDS - start))s /api/movies/ reaches it without restarting nginx"

echo "All nginx routing checks passed."
