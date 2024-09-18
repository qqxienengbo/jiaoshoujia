import axios from "axios";
import { fileUtils } from "@/util/common";
const fileutil=fileUtils()
const excel =axios.create({
    // baseURL: 'http://localhost:8888/api',
    // baseURL: 'http://10.119.67.147:8888/api',
    baseURL: 'http://'+fileutil.path+':8888/api',
    timeout: 10000
})

excel.interceptors.request.use(
    config => {
        // 不需要设置 Content-Type，因为 GET 请求不需要请求体
        // config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default excel