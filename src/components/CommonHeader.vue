<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/images/logo2.png" @click="goHome" />
      <div class="text">数据分析 · 管理系统</div>
    </div>

    <div class="logOut">
      <el-popconfirm title="确定退出登录吗？" @confirm="logOut">
        <el-button type="danger" slot="reference">
          退出登录
        </el-button>
      </el-popconfirm>
    </div>
  </el-header>
</template>

<script>
  export default {
    name: "",
    data() {
      return {};
    },
    methods: {
      // 回到主页
      goHome() {
        this.$router.push("/welcome");
      },
      // 退出登录
      logOut() {
        window.localStorage.clear();
        this.$message.success("退出成功");
        this.$router.push("/login");
      },
    },
  };
</script>

<style scoped lang="less">
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #17253f;
    .logo {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        display: block;
        height: 75%;
        cursor: pointer;
      }
      .text {
        font-size: 26px;
        color: rgba(255, 255, 255, 0.6);
        padding-left: 20px;
      }
    }
  }
</style>
