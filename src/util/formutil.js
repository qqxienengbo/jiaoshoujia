//有关获取form表信息的工具类，
import request from "@/http/request"
import { ElMessage } from "element-plus"

export function formUtils() {

    //Promise 主要有三种状态：
    // 1.Pending（待定）：初始状态，既不是成功也不是失败。
    // 2.Resolved（已解决）：表示异步操作成功完成，可以通过 .then() 访问到结果。
    // 3.Rejected（已拒绝）：表示异步操作失败，可以通过 .catch() 处理错误。
    //查询全部的需求单信息
    const getallformdata=()=>{
        //在你的场景中，request.get 是一个异步操作，它返回一个 Promise。这是因为网络请求通常是异步的，
        // 不能立即得到结果。当你直接调用 request.get 时，它返回一个 Promise，
        // 这个 Promise 在未来某个时刻会通过 .then 或 .catch 回调函数来处理结果或错误。
        return new Promise((resolve,reject)=>{
            request.get("/Form/PgetForm").then(res => {
                if (res.code === '0') {
                  resolve(res.data)
                }else{
                    resolve([])
                }
              })
        })
    }
    //根据完整编号查询
    const formdatabyformid=(formid)=>{
        return new Promise((resolve,reject)=>{
            request.get("/Form/Pselectbyformid", {
                params: {
                  formid: formid
                }
              }).then(res => {
                if (res.code === '0') {
                    resolve(res.data)
                }else{
                    resolve([])
                }
              })
        })
    }

    //根据日期查询
    const formdatabycreatedate=(createdata)=>{
        return new Promise((resolve,reject)=>{
            request.get("/Form/Pselectbycreateddata", {
                params: {
                  createdata: createdata,
                }
              }).then(res => {
                if (res.code === '0') {
                  resolve(res.data)
                }else{
                    resolve([])
                }
              })
        })
    }

    //根据问题描述查询
    const formdatabyproblem=(problem)=>{
        return new Promise((resolve,reject)=>{
            request.get("/Form/Pselectbyproblem",{
                params:{
                  problem:problem
                }
              }).then(res=>{
                if(res.code==='0'){
                  resolve(res.data)
                }else{
                    resolve([])
                }
              })
        })
    }
    //把公共方法导出去
    return {
        getallformdata,
        formdatabyformid,
        formdatabycreatedate,
        formdatabyproblem
    };
}