<script setup>
import { userTabsStore } from '@/stores/tabs';
import { onMounted, ref ,watch} from 'vue';

const tabsStroe=userTabsStore()

const user=sessionStorage.getItem("user")
/**
 * 菜单展开时的回调
 */
const handleOpen=()=>{

}

/**
 * 菜单收起时的回调
 */
const handleClose=()=>{

}

/**
 * 菜单激活的回调
 */
 const handSelect=(url)=>{
  // tabsStroe.addTab({
  //   title:url,
  //   url:url
  // })
  tabsStroe.addTab(url)
}

onMounted(()=>{

})


</script>

<template>
  <div class="System">
    <div class="SystemName">
      <img class="logo" src="/src/assets/img/logo.png" alt="logo" width="35px" height="35px" style="margin-top: 10px;">
    <h6 v-if="!tabsStroe.isCollapse">数字化运维三维模型在线审批平台</h6>
    </div>
  </div>
<el-menu
    router  
    :default-active="tabsStroe.selectTab"
    class="el-menu-vertical-demo"
    :collapse="tabsStroe.isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="handSelect"
  >
    <el-menu-item index="/" >
      <el-icon><Menu /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/Test" >
      <el-icon><Document /></el-icon>
      <template #title>测试</template>
    </el-menu-item>
    <el-menu-item index="/MeIndex" >
      <el-icon><User /></el-icon>
      <template #title>个人中心</template>
    </el-menu-item>
  </el-menu>
</template>
<style scoped>
/* 去除element的边框样式 */
.el-menu{
  border: none;
  background-color: #f8f9fa;
}
.System{
  height: 7vh;
  display: flex;
}
.SystemName{
  margin: auto auto;
  height: 100%;
  display: flex;
}
.SystemName h6{
  margin-left: 10px;
  /* text-overflow: ellipsis; */
  white-space: nowrap;/**文本不换行 */
  /* overflow: hidden; */
}
</style>
