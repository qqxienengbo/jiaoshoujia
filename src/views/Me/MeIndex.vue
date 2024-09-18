<script setup>
import request from '@/http/request';
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import { userTabsStore } from '@/stores/tabs';
import router from '@/router';
const tabsStroe=userTabsStore()
var user = ref(sessionStorage.getItem("user"))


//更新邮箱信息
const newemail = ref(null)
//显示更新邮箱框
const EmailDialogVisible = ref(false)

const showUpdateEmail = () => {
    newemail.value = user.value.email
    EmailDialogVisible.value = true
}

const updateEmail = () => {
    //邮箱正则
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailPattern.test(newemail.value)) {
        ElMessage.error("邮箱格式不正确!")
    } else {
        request.get("/user/updateEmail", {
            params: {
                phone: user.value.phone,
                email: newemail.value
            }
        }).then(res => {
            if (res.code === '0') {
                user.value.email = newemail.value
                sessionStorage.setItem("user", JSON.stringify(user.value))
                ElMessage.success("邮箱更新成功！")

            }
        })
    }
    EmailDialogVisible.value = false
}


//显示修改密码框
const PasswordDialogVisible = ref(false)
//旧密码
const oldpaw = ref('')
//新密码
const newpaw = ref('')
//确认密码
const confirmpaw = ref('')

const showUpdatePassword = () => {
    PasswordDialogVisible.value = true
}

//确定修改密码
const updatePassword = () => {
    if (oldpaw.value === user.value.password) {
        if (newpaw.value === confirmpaw.value) {
            request.get("/user/updatePassword", {
                params: {
                    phone: user.value.phone,
                    password: newpaw.value
                }
            }).then(res => {
                if (res.code === '0') {
                    //清空状态
                    tabsStroe.clear()
                    //清空登录的用户信息
                    sessionStorage.clear()
                    router.push('/Login')
                    ElMessage.success("密码修改成功，请重新登录！")
                }
            })
        } else {
            ElMessage.error("两次密码不一致!")
        }

    } else {
        ElMessage.error("旧密码不正确!")
    }
}

</script>


  <template>
    <div class="personal-center">
      <div class="user-card">
        <div class="avatar">
            <!-- <el-avatar :size="100" :icon="UserFilled" /> -->
        </div>
        <div class="info">
          <div class="info-item">
            <span class="label">姓名：</span>
            <span class="content">管理员</span>
          </div>
          <div class="info-item">
            <span class="label">账号：</span>
            <span class="content">123456789</span>
          </div>
          <div class="info-item">
            <span class="label">角色：</span>
            <span class="content">管理员</span>
          </div>
          <div class="info-item">
            <span class="label">邮箱：</span>
            <span class="content">123456789@qq.com</span>
          </div>
          <div class="actions">
            <el-button type="warning" @click="showUpdateEmail">修改邮箱</el-button>
            <el-button type="warning" @click="showUpdatePassword">修改密码</el-button>
          </div>
        </div>
      </div>
  
      <el-dialog v-model="EmailDialogVisible" title="更新邮箱" width="500px" center>
        <el-input v-model="newemail" placeholder="请输入新的邮箱地址"></el-input>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="updateEmail">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
  
      <el-dialog v-model="PasswordDialogVisible" title="修改密码" width="500px" center>
        <el-form label-position="left" label-width="80px">
          <el-form-item label="旧密码">
            <el-input type="password" v-model="oldpaw" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="newpaw" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="confirmpaw" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="updatePassword">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>

<style scoped>
.personal-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f8f9fa;
}

.user-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.avatar {
  margin-bottom: 30px;
}

.avatar-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  /* border-bottom: 1px solid #ebebeb; */
  padding-bottom: 10px;
}

.label {
  flex-basis: 70px;
  text-align: right;
  margin-right: 15px;
  font-weight: bold;
}

.content {
  /* flex-grow: 1;
  text-align: left;
  display: inline-block;
  position: relative; */
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 下划线 */
.content::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.el-button {
  width: 200px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>