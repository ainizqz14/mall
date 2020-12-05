import axios from 'axios';



export function request(config){
//创建axios实例
const instance = axios.create({
  baseURL:"http://152.136.185.210:8000/api/w6",
  timeout:50000
})

//   2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })


//发送真正的请求
return instance (config)

// instance(config)
// .then(res =>{
//   console.log(res);
// })
// .catch(
//   err =>{
//     console.log(err);
//   }
// )
}