export const BASE_URL = 'http://wxtest.ilinjia.cn'
// export const BASE_URL = 'http://172.31.98.82:9088'
// export const BASE_URL = 'http://172.31.98.150:9088'

export const defaultTimeout = 5000

export const defaultContentType = 'application/x-www-form-urlencoded;charset=UTF-8'

export const statusCodeMap = {
  301: '永久重定向',
  400: '请求语法错误',
  401: '未授权',
  403: '禁止访问',
  404: '没有资源',
  500: '服务器错误',
  503: '服务器错误'
}
