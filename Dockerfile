# syntax=docker/dockerfile:1

FROM node:26-alpine AS build
WORKDIR /app
# Node 25+ images no longer bundle Yarn, so install the Yarn 1 the lockfile uses.
RUN npm install -g yarn@1.22.22
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
# Vite reads .env.production and writes to build/. The chmod makes sure nginx's
# unprivileged user can read everything, whatever modes the source files had.
RUN yarn build && chmod -R a+rX build

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/proxy-api.conf /etc/nginx/snippets/proxy-api.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
