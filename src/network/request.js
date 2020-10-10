import axios from 'axios'
//封装axios
export function request(config){
  const instace  = axios.create({
    baseURL: ' http://easy-mock.ncgame.cc/mock/5f80200a737ed2509e5e0a2d/demo1', //mock接口BaseUrl
    timeout: 5000
  })
  // response拦截器
  instace.interceptors.response.use(res => {
    return res.data
  })
  return instace(config)
}