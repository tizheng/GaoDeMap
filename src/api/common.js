
import service from '../utils/request'

export function OrderStatus (data = {}) {
  return service.request({
    method: 'post',
    url: '/cityPicker/',
    data
  })
}
