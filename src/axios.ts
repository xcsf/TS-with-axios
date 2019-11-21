import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/cancel'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config)
    const request = Axios.prototype.request.bind(context)
    extend(request, context)
    return request as AxiosStatic
}
const axios = createInstance(defaults)

axios.create = function create(config) {
    return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
    return Promise.all(promises)
}

axios.spread = function(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr)
    }
}

axios.Axios = Axios

export default axios
