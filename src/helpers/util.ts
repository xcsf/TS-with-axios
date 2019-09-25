const toString = Object.prototype.toString

export function isDate(value: any): boolean {
  return toString.call(value) === '[object Date]'
}

// export function isObject(value: any): boolean {
//   return value !== null && typeof value === 'object'
// }

//这里为什么要使用 isPlainObject 函数判断，而不用之前的 isObject 函数呢，
//因为 isObject 的判断方式，对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true，
//但是这些类型的数据我们是不需要做处理的，而 isPlainObject 的判断方式，只有我们定义的普通 JSON 对象才能满足。
export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
}
