<template>
  <div class="login">
    <div class="outer">
      <div class="logo">
        <img src="@/assets/images/logo1.jpg" alt="" />
      </div>
      <div class="inner">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="120px"
          status-icon
        >
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              确认登录
            </el-button>
            <el-button @click="onReset">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { loginAxios } from "@/network/api";

  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          username: "",
          password: "",
        },
        loginRules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 5, max: 30, message: "用户名应在 5 - 30位" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      // 重置登录表单
      // resetFields() 是 element-ui 针对整个表单定义的方法，作用是清空表单内所有项的值
      onReset() {
        this.$refs["loginForm"].resetFields();
      },

      // 信息验证
      onSubmit() {
        this.$refs["loginForm"].validate((valid) => {
          // 验证失败，提示信息
          if (!valid) {
            this.$message.info("用户名或密码格式错误！");
            return;
          } else {
            // 提交信息
            loginAxios(this.loginForm).then((res) => {
              if (res.data.code == 200) {
                window.sessionStorage.setItem("token", res.data.token);
                this.$message.success("登陆成功！");
                this.$router.push("/main");
              } else {
                this.$message.error("用户名或密码错误！");
              }
            });
          }
        });
      },
    },
  };
</script>
<style lang="less">
  .login {
    height: 100%;
    background-color: #0d3f67;
    position: relative;
    .outer {
      width: 460px;
      height: 340px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      // 居中定位
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: calc(50% - 60px);
        top: -60px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .inner {
        min-height: 200px;
        padding-top: 100px;
        padding-right: 50px;
      }
    }
  }
</style>
