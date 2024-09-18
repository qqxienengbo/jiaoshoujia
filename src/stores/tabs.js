// 导入方法 defineStore
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
// 异步请求地址
const API_URL='http://geek.itheima.net/v1_0/channels'

// 定义一般是user+模块名字
export const userTabsStore= defineStore('counter',()=>{
    // 定义数据(state)
    //标签页的操作
    //记录所有的标签页信息
    const allTabs=ref({
        '/':'首页',
        '/MeIndex':'个人中心',
        '/Test':'测试'
    })
    //标签页列表
    const tabsList=ref([
        {
            title:'首页',
            url:'/'
        }
    ])
    //记录当前激活的标签页
    const selectTab=ref('/')

    /**
     * 添加标签页
     * @param {*} tab 
     */
    const addTab=(url)=>{
        const existingTab = tabsList.value.find(item => item.url === url);
        if (!existingTab) {
            tabsList.value.push({
                title:allTabs.value[url],
                url:url
            });
        }
        selectTab.value=url
    }
    /**
     * 删除标签页
     */
    const removeTab=(url)=>{
        if(tabsList.value.length===1){
            ElMessage.error("至少保留一个标签页！")
        }else{
            //筛选掉删除的标签页
            tabsList.value=tabsList.value.filter(tab=>tab.url!==url)
            //激活最后一个标签页
            selectTab.value=tabsList.value[tabsList.value.length-1].url
        }
    }
    /**
     * 
     * @param {*} url 
     */
    const changeTab=(url)=>{
        selectTab.value=url;
    }
    watch(selectTab,()=>{
        // console.log("标签页发生改变")
        router.push(selectTab.value)
    })


    //菜单栏的操作
    //记录是否收缩菜单栏
    const isCollapse=ref(false)
    /**
     * 改变菜单栏的收缩状态
     */
    const changeCollapse=()=>{
        isCollapse.value=!isCollapse.value
    }

    /**
     * 退出时，初始化状态管理
     */
    const clear=()=>{
        tabsList.value=[{
            title:'首页',
            url:'/'
        }]
    }

    //记录登录的用户信息
    const user=ref({})
    /**
     * 
     * @param {*} loginUser 
     */
    const setUser=(loginUser)=>{
        user.value=loginUser;
    }


    // 定义getter 计算属性
    const doubleCount=computed(()=>count.value*2)


    // 定义异步action
    // const list=ref([])
    // const getList=async ()=>{
    //     const res=await axios.get(API_URL)
    //     list.value=res.data.data.channels
    // }

    // 以对象的方式return供组件使用
    return {
        tabsList,
        addTab,
        removeTab,
        changeTab,
        selectTab,
        allTabs,
        changeCollapse,
        isCollapse,
        clear,
        user,
        setUser
    }
})