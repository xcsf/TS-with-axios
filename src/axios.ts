import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const request = Axios.prototype.request.bind(context)
  extend(request, context)
  return request as AxiosInstance
}
const axios = createInstance()
export default axios
