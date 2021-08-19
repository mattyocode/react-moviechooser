import { isArray, isPlainObject, camelCase } from "lodash";

export default function keysToCamel(obj) {
  if (isPlainObject(obj)) {
    const n = {};
    Object.keys(obj).forEach((k) => (n[camelCase(k)] = keysToCamel(obj[k])));
    return n;
  } else if (isArray(obj)) obj.map((i) => keysToCamel(i));
  return obj;
}
