const toString = Object.prototype.toString

export function isDate(value: any): boolean {
  return toString.call(value) === '[object Date]'
}

// export function isObject(value: any): boolean {
//   return value !== null && typeof value === 'object'
// }

export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}