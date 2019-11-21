import { isDate, isPlainObject, isURLSearchParams } from './util'
import { debug } from 'util'

interface URLOrigin {
    protocol: string
    host: string
}

function encode(value: string): string {
    return encodeURIComponent(value)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}
export function buildURL(
    url: string,
    params?: any,
    paramsSerializer?: (params: any) => string
): string {
    if (!params) {
        return url
    }
    let serializedParams
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {
        serializedParams = params.toString()
    } else {
        const parts: string[] = []
        Object.keys(params).forEach(key => {
            const value = params[key]
            if (value === null || typeof value === 'undefined') {
                return
            }
            let values = []
            if (Array.isArray(value)) {
                values = value
                key += '[]'
            } else {
                values = [value]
            }
            values.forEach(value => {
                if (isDate(value)) {
                    value = value.toISOString()
                } else if (isPlainObject(value)) {
                    value = JSON.stringify(value)
                }
                parts.push(`${encode(key)}=${encode(value)}`)
            })
        })
        serializedParams = parts.join('&')
    }
    if (serializedParams) {
        const markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
    return url
}

export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURL(requestURL)
    return (
        parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
    )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode

    return {
        protocol,
        host
    }
}
