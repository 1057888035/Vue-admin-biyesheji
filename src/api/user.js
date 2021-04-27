import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/13321541234/123456',
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

export function logout() {
  return request({
    url: '/loginout/13321541234',
    method: 'get'
  })
}
