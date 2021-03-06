import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/'+data.username+'/'+data.password,
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/loginout/'+token,
    method: 'get'
  })
}
