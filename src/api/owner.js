import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/owner/getAllOwner/'+params,
    // url: '/config/rate/getAllRate',
    method: 'get',
  
  })
}

export function saveOwner(params) {
  return request({
    url: '/user/owner/save',
    method: 'get',
    params
  })
}



export function deleteOwnerById(ownerid) {
  return request({
    url: '/user/owner/deleteForId/'+ownerid,
    method: 'get'
  })
}




export function updateOwnerById(params) {
  return request({
    url: '/user/owner/updateForId',
    method: 'get',
    params
  })
}




export function getOwnerByPhone(params) {
  return request({
    url: '/getOwnerForPhone/'+params,
    method: 'get'
  })
}