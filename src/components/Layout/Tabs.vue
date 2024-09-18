<script setup>
import { ref } from 'vue';
import { userTabsStore } from '@/stores/tabs';
const tabsStroe=userTabsStore()


/**
 * 点击删除标签页
 */
const removeTab=(url)=>{
  tabsStroe.removeTab(url)
}
</script>

<template>
  <div class="tabs-div">
  <el-tabs
    v-model="tabsStroe.selectTab"
    type="card"
    closable
    class="demo-tabs"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabsStroe.tabsList"
      :key="item.url"
      :label="item.title"
      :name="item.url"
    >
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<style scoped>
.tabs-div{
  border-top: 1px solid rgb(229, 230, 235);
}


</style>