import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/staff/getAllStaff/1',
    // url: '/config/rate/getAllRate',
    method: 'get',
    params
  })
}


