import axios from "axios";
import { fileUtils } from "@/util/common";
const fileutil=fileUtils()
const file =axios.create({
    // baseURL: 'http://localhost:8888/api',
    // baseURL: 'http://10.119.67.147:8888/api',
    baseURL: 'http://'+fileutil.path+':8888/api',
    timeout: 10000
})
// 请求头类型
// 1.application/x-www-form-urlencoded   用于标准的表单提交，例如键值对形式的数据。通常用于简单的 HTML 表单提交。
// 2.application/json   用于发送 JSON 数据。这是 RESTful API 最常用的格式之一。
// 3.multipart/form-data   用于文件上传，可以同时发送多个部分，每个部分可以包含文件或其他键值对。
// 4.text/plain  用于纯文本数据。
// 5.application/xml  用于 XML 数据。

file.interceptors.request.use(config=>{
    config.headers['Content-Type']='multipart/form-data';
    return config
},error=>{
    return Promise.reject(error)
});


// response 拦截器
// file.interceptors.response.use(
//     res=>res,
//     err=>Promise.reject(err)
// )

export default file