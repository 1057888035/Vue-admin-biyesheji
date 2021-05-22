import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/staff/getAllStaff/'+params,
    // url: '/config/rate/getAllRate',
    method: 'get',
  
  })
}

export function saveStaff(params) {
  return request({
    url: '/user/staff/save',
    method: 'get',
    params
  })
}



export function deleteStaffById(staffid) {
  return request({
    url: '/user/staff/deleteForId/'+staffid,
    method: 'get'
  })
}


export function getDepartment() {
  return request({
    url: '/user/dp/getAllDp',
    method: 'get'
  })
}


export function updateStaffById(params) {
  return request({
    url: '/user/staff/updateForId',
    method: 'get',
    params
  })
}




export function getStaffByPhone(params) {
  return request({
    url: 'getStaffForPhone/'+params,
    method: 'get'
  })
}