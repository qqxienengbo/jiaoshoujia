<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { userTabsStore } from '@/stores/tabs';
import { onBeforeMount, ref } from 'vue';
import router from '@/router';
const tabsStroe=userTabsStore()
/**
 * 点击收缩菜单栏
 */
const handClick=()=>{
  tabsStroe.changeCollapse();
}
//获取登录用户的信息
const user=ref(sessionStorage.getItem('user'))
// const user=ref(tabsStroe.user)
// const user=ref(tabsStroe.user)

/**
 *退出登录
 */
const Logout=()=>{
  //清空状态
  tabsStroe.clear()
  //清空登录的用户信息
  sessionStorage.clear()
  router.push('/Login')
}
</script>

<template>
  <div style="height: 100%;" class="conter">
   <div class="ShouSuo">
    <div class="icon-container">
      <el-icon style="font-size: 24px;" class="icon" @click="handClick">
        <Fold v-if="!tabsStroe.isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    </div>
   <div class="User">
      <el-dropdown placement="bottom">
        <div class="User-container">
      <h3>管理员</h3>&nbsp;&nbsp;&nbsp;
      <!-- <el-avatar :icon="UserFilled" /> -->
    </div>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item>The Action 1st</el-dropdown-item>
          <el-dropdown-item>The Action 2st</el-dropdown-item> -->
          <el-dropdown-item @click="Logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
  </div>
</template>

<style scoped>

div{
  height: 100%;
}
.ShouSuo{
  float: left;
  height: 100%;
}
.icon-container {
  display: flex; /* 启用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器高度占满父容器 */
}
.icon-container svg{
  background-color: #dedfe0;
  border-radius: 20%;
  transition: all 1s;
}
.icon-container svg:hover{
  border-radius: 50%;
}
.User{
  float: right;
}
.User-container{
  display: flex; /* 启用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器高度占满父容器 */
  outline: none;/*覆盖浏览器的样式，否则出现边框 */
  border: none;
}

</style>
