import request from '@/utils/request'
export function getList(params) {
    return request({
      url: '/pro/building/getBuilding/'+params,
      method: 'get'
    })
  }

  export function deletes(params) {
    return request({
      url: '/pro/building/deleteForId/'+params,
      method: 'get'
    })
  }

  export function updates(params) {
    return request({
      url: '/pro/building/saveBuilding/'+params,
      method: 'get'
    })
  }

  export function getByCode(params) {
    return request({
      url: '/pro/building/getBuildingForCode/'+params,
      method: 'get'
    })
  }


  export function uploads(params) {
    return request({
      url: '/pro/building/import',
      method: 'post',
      Headers:{'Content-type': 'multipart/form-data'},
      params
     
    })
  }