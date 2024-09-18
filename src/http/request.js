import axios from "axios";
import { fileUtils } from "@/util/common";
const fileutil=fileUtils()
const request =axios.create({
    // baseURL: 'http://localhost:8888/api',
    // baseURL: 'http://10.119.67.147:8888/api',
    baseURL: 'http://'+fileutil.path+':8888/api',
    timeout: 10000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数进行加密
request.interceptors.request.use(config=>{
    // 设置请求头
    config.headers['Content-Type']='application/json;charset=utf-8';

    // const user=sessionStorage.getItem("user");
    // if(user){
    //     // 把从后台传回的登录用户中所带的token存到请求头headers中
    //     config.headers['token']=JSON.parse(user).token;
    // }
    return config
},error=>{
    return Promise.reject(error)
});


// response 拦截器
request.interceptors.response.use(
    // response.data即为后端返回的Result
    response =>{
        let res=response.data;
        // 兼容服务器返回的字符串数据
        if(typeof res==='string'){
            res=res ? JSON.parse(res) : res
        }
        return res;
    },
    error=>{
        console.log('err'+error)
        return Promise.reject(error)
    }
)

export default request