<template>
  <div class="login-page">
    <div class="container">
      <div class="left-img">
        <div class="titles">
          <div class="title">Welcome!</div>
          <div class="subTitle"></div>
        </div>
      </div>
      <div class="right-form">
        <div class="logo">
          <!--          <img src="../assets/images/logo.png" width="300" />-->
        </div>

        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="form" hide-required-asterisk>
          <el-form-item prop="username">
            <!--            <span slot="label"><i class="el-icon-user"></i></span>-->
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入账号" name="username" type="text" tabindex="1" autocomplete="off">
              <!-- <i class="el-icon-user" slot="prefix"></i> -->
              <template #prefix>
                <el-icon><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              show-password
              autocomplete="off"
              @keyup.enter.native="submitForm(loginFormRef)"
            >
              <template #prefix> <svg-icon name="password"> </svg-icon> </template>
            </el-input>
          </el-form-item>

          <el-row>
            <el-col :span="16">
              <el-form-item prop="code" class="mb15">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" @keyup.native.enter="submitForm(loginFormRef)">
                  <!-- <svg-icon icon-class="verifyCode" slot="prefix" /> -->
                  <template #prefix> <svg-icon name="verifyCode"> </svg-icon> </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height: 36px">
              <img :src="codeUrl" @click="getCode" class="login-code-img" style="margin-left: 5px" />
            </el-col>

            <!--                  <img ref="captcha" :src="codeUrl" style="width: 130px" @click="getNewCaptcha" />-->
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="6">
              <el-form-item class="mb15">
                <!--                暂时隐藏忘记密码-->
                <!-- <el-button class="forgetPwd" type="text" @click.prevent="forgetPassword">忘记密码</el-button> -->
              </el-form-item>
            </el-col>
            <el-col :span="11" class="rightBtns">
              <el-row>
                <!-- <el-button type="text" @click.prevent="institutionalRegister" class="reg1">单位注册</el-button> -->
                <!--                <span style="color: #1890ff">/</span>-->
                <!-- <svg-icon icon-class="jiange"></svg-icon> -->
                <!-- <el-button type="text" @click.prevent="individualRegister" class="reg2">个人注册</el-button> -->
              </el-row>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button class="btn-login" type="primary" @click="submitForm(loginFormRef)" :disabled="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { getCodeImg, login } from "@/api/login";
import md5 from "js-md5";
import { setToken } from "@/utils/auth";
import { useRouter, useRoute } from "vue-router";
import { Calendar, UserFilled } from "@element-plus/icons-vue";
import { uuid } from "@/utils";

const router = useRouter();
const route = useRoute();
const loginForm = reactive({
  username: "",
  password: "", //
  uuid: "",
  code: "",
});
const loginFormRef = ref<FormInstance>();
const codeUrl = ref("");
let loading = ref(false);

const getCode = async () => {
  // const res = await getCodeImg();
  // console.log(2,res.img)

  codeUrl.value = import.meta.env.VITE_APP_BASE_API + "/lls/permit/verifyCode" + `?UUID=${uuid()}&abc=${Math.random()}`;

  // getCodeImg({
  //   UUID: uuid(),
  //   abc: Math.random(),
  // }).then((res) => {
  //   codeUrl.value = res as any;
  //   // loginForm.uuid = res;
  // });
};

onMounted(() => {
  getCode();
});

const loginRules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
  code: [{ required: true, message: "请输入验证码", trigger: "change" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      loading.value = true;
      const data = {
        ...loginForm,
        password: md5(loginForm.password.trim()),
      };

      const username = data.username.trim();
      const password = data.password;
      const code = data.code;
      const uuid = data.uuid;

      login(username, password, code, uuid)
        .then((res) => {
          setToken(res?.token);
          loading.value = false;
          // if (!data) {
          //   return this.$message.error("账号或密码错误");
          // }
          // this.$router.push("/dashboard");
          // this.$router.push({ path: "/" }).catch(() => {});
          // this.$router.push({ path: this.redirect || "/" }).catch(() => {});

          getCode();
        })
        .catch((err) => {
          // console.log("error", err, err === "验证码错误", typeof err, JSON.stringify(err), Object.prototype.toString.call(err), err.valueOf());
          loginForm.code = "";
          loading.value = false;
          getCode();
        });

      // this.$store
      //   .dispatch("Login", data)
      //   .then((data) => {
      //     this.loading = false;
      //     console.log("info", data);
      //     // if (!data) {
      //     //   return this.$message.error("账号或密码错误");
      //     // }
      //     // this.$router.push("/dashboard");
      //     this.$router.push({ path: "/" }).catch(() => {});
      //     // this.$router.push({ path: this.redirect || "/" }).catch(() => {});
      //     this.getCode();
      //   })
      //   .catch((err) => {
      //     // console.log("error", err, err === "验证码错误", typeof err, JSON.stringify(err), Object.prototype.toString.call(err), err.valueOf());
      //     this.loginForm.code = "";

      //     this.loading = false;
      //     this.getCode();
      //   });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login-background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  overflow: auto;
  --el-component-size: 36px;
}
.container {
  width: 900px;
  height: 555px;
  display: flex;
  background-color: white;
  border-radius: 25px;

  align-self: center;
  .left-img {
    width: 53%;
    height: 100%;
    background-image: url("../assets/images/login-left.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .titles {
      position: relative;
      top: 55px;
      left: 50px;
      color: white;
      .title {
        font-size: 36px;
        font-weight: 500;
        letter-spacing: 1.1px;
      }
      .subTitle {
        margin-top: 15px;
        font-size: 17px;
        letter-spacing: 1px;
      }
    }
  }
  .svg-container {
    padding: 2px 5px 2px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .right-form {
    width: 47%;
    height: 100%;
    background-color: white;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
      margin-bottom: 25px;
    }
    .form {
      width: 300px;
      .mb15 {
        margin-bottom: 13px;
      }
      .forgetPwd {
        color: #c1c1c1;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: #a4a4a4;
        }
      }

      .rightBtns button {
        color: #0575e6;
        &:hover {
          color: #2c95ffd9;
        }
      }

      ::v-deep .el-input .el-input__prefix {
        left: 8px;
      }
      .login-code-img {
        cursor: pointer;
        height: 36px;
      }
    }
  }
}

.btn-login {
  width: 100%;
  border-radius: 20px;
  padding: 12px 20px;
  background-color: #0475e6;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  /*color: white;*/
  &.is-disabled {
    background-color: #8cc8ff;
  }
  &:hover {
    background: #46a6ff;
    border-color: #46a6ff;
  }
}
</style>
