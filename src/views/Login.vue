<script setup>
import request from '@/http/request';
import router from '@/router';
import { userTabsStore } from '@/stores/tabs';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const tabsStroe = userTabsStore()

//属性的名字必须和后端类的属性名一致，否则获取不到数据
const form = ref({
    phone: '',
    password: ''
})

/**
 * 登录
 */
const Login = () => {
    if(form.value.phone==='1'&&form.value.password==='1'){
        sessionStorage.setItem('user',{
            phone:'1',
            password:'1'
        })
        tabsStroe.setUser({
            phone:'1',
            password:'1'
        })
        router.push('/')
        ElMessage.success('登录成功！')
    }else{
        ElMessage.error("账号或密码错误！")
    }
}

</script>
<template>
    <div class="maxdiv">
        <div class="conterbox">
            <div class="box-item1">
                <div class="box-item1-box1">
                    <img src="../assets/img/logo.png" alt="" width="170px" height="170px">
                    <h2 style="color: white; display: block;">广西华谊新材料</h2>
                </div>
            </div>
            <div class="box-item2">
                <h2>登&nbsp;&nbsp;&nbsp;录</h2>
                <el-form :model="form" class="myform" style="width: 300px;"> 
                <el-form-item>
                    <el-input v-model="form.phone" placeholder="账号" @keydown.enter="Login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="密码" type="password"
                        @keydown.enter="Login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;;" @click="Login">登录</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                </el-form-item>
            </el-form>
            </div>
        </div> 
    </div>
</template>
<style scoped>

.maxdiv {
    width: 100vw;
    height: 100vh;
    background-color: rgb(20, 31, 120);
    display: flex;
    justify-content: center;
    align-items: center; /* 水平垂直居中 */
}

.conterbox {
    width: 900px;
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: row;
    justify-content: space-between; /* 水平居中 */
}

.box-item1 {
    width: 450px;
    height: 400px;
    background-color: rgb(118, 155, 237);
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.box-item2 {
    width: 450px; /* 调整宽度以适应内容 */
    height: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
}
</style>