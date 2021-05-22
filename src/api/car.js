
import request from '@/utils/request'
export function getAllCar(params) {
    return request({
      url: '/user/car/getAllCar/'+params,
      method: 'get'
    })
  }

  export function deleteCarForId(params) {
    return request({
      url: '/user/car/deleteForId//'+params,
      method: 'get'
    })
  }

  export function updateCar(params) {
    return request({
      url: '/user/car/updateforid',
      method: 'get',
      params
    })
  }