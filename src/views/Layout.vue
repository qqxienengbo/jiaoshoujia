<script setup>
import Header from '@/components/Layout/Header.vue';
import Aside from '@/components/Layout/Aside.vue';
import Tabs from '@/components/Layout/Tabs.vue';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { userTabsStore } from '@/stores/tabs';
import router from '@/router';

onBeforeMount(()=>{
  if(sessionStorage.getItem('user')===null){
    // ElMessage.error('用户未登录，禁止访问！')
    router.push('/Login')
  }
})

const tabsStroe=userTabsStore()
onMounted(()=>{
  const aside=document.getElementById('aside')
  const Tabs=document.getElementById('Tabs')
  const main=document.getElementById('main')
  //监听是否展开导航栏,第一个参数使用箭头函数方式，可以精确监听
  watch(()=>tabsStroe.isCollapse,()=>{
    console.log(tabsStroe.isCollapse)
    if(tabsStroe.isCollapse){
      aside.style.width="5vw"
      Tabs.style.width="95vw"
      main.style.width="95vw"
    }else{
      aside.style.width="15vw"
      Tabs.style.width="85vw"
      main.style.width="85vw"
    }
  })

  //激活首页
  tabsStroe.selectTab=tabsStroe.tabsList[0].url
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside id="aside"><Aside></Aside></el-aside>
      <el-container>
        <el-header height="7vh"><Header></Header></el-header>
        <div>
          <Tabs id="Tabs"></Tabs>
          <el-main id="main">
            <RouterView></RouterView>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout{
    width: 100vw;
    height: 100vh;
}
.el-aside{
  border-right: 1px solid #dedfe6;
  width: 15vw;
  height: 100vh;
  transition: all 1s;
  background-color: #f8f9fa;
}
.el-header{
  background-color: #f8f9fa;
}
.Tabs{
  height: 6vh;
  width: 85vw;
  transition: all 1s;
}
.el-main{
  --el-main-padding: 10px;
  /* margin: 10px; */
  height: 87vh;
  width: 85vw;
  transition: all 1s;
}
</style>
