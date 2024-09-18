import { defineStore } from "pinia";
import { ref } from "vue";


export const userUserStore=defineStore('counter',()=>{
        //记录登录的用户信息
        const user=ref(null)
        /**
         * 记录登录的用户信息
         * @param {*} loginUser 
         */
        const setUser=(loginUser)=>{
            user.value=loginUser;
        }

        /**
         * 初始化状态
         */
        const clear=()=>{
            user.value=null
        }


    return{
        user,
        setUser
    }
})