//有关文件的工具类
import { Base64 } from "js-base64"
import request from "@/http/request"
import { ElMessage } from "element-plus"

export function fileUtils() {
    //本地测试
    const path = 'localhost'
    // 服务器测试路径
    // const path='10.119.67.147'
    //编写多个公共方法
    // 文件下载
    const downloadfile = (filename) => {
        location.href = 'http://' + path + ':8888/api/files/down/' + filename
    }
    //文件预览
    const Previewfile = (filename) => {
        var url = 'http://'+path+':8888/file/' + filename
        window.open('http://'+path+':8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(url)));
    }
    //文件删除
    const deletefile =async (filename, formid)=>{
      return new Promise((resolve, reject)=>{
        request.delete("/files/deletefile", {
          params: {
            filename: filename,
            formid: formid
          }
        }).then(res => {
          if (res.code === '0') {
            ElMessage.success("文件删除成功！")
            resolve(res);
          } else {
            ElMessage.error(res.msg)
            reject(res.msg);
          }
        })
      })
    }

    //把公共方法导出去
    return {
        downloadfile,
        Previewfile,
        deletefile,
        path
    };
}