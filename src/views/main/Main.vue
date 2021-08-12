<template>
  <div class="homeView">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../../assets/images/logo2.png" alt="" />
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
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- <el-tooltip
            class="item"
            effect="dark"
            :content="isCollapse ? '打开菜单' : '折叠菜单'"
            placement="right"
          > -->
          <div class="fold" @click="menuCollapse">
            <i class="el-icon-d-arrow-right" v-show="isCollapse"></i>
            <i class="el-icon-d-arrow-left" v-show="!isCollapse"></i>
          </div>
          <!-- </el-tooltip> -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#304156"
            text-color="rgba(255, 255, 255, 0.6)"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <!-- 意向用户 -->
            <el-menu-item index="1">
              <i class="el-icon-coin"></i>
              <span slot="title">意向用户</span>
            </el-menu-item>

            <!-- 添加客户 -->
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span slot="title">添加客户</span>
            </el-menu-item>

            <!-- 数据分析 -->
            <el-menu-item index="3">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <p>这是 mainView 上的新代码，我将要把他们提交到远程的 mainView 分支上</p>
    <p>这是 mainView 上的新代码，我将要把他们提交到远程的 mainView 分支上</p>
    <p>
      这是 mainView 上的新代码，我将要使用 VSCode 的 git 插件把他们提交到远程的
      mainView 分支上
    </p>
    <p>
      再次测试使用 VSCode 推送本地代码到远程
    </p>
    <p>
      第三次测试VSCode 推送本地代码到远程
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      // 退出登录
      logOut() {
        window.sessionStorage.removeItem("token");
        this.$message.success("退出成功");
        this.$router.push("/");
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 菜单的折叠与展开
      menuCollapse() {
        this.isCollapse = !this.isCollapse;
      },
    },
  };
</script>

<style lang="less">
  .homeView {
    height: 100%;
  }

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
      }
      .text {
        font-size: 26px;
        color: rgba(255, 255, 255, 0.6);
        padding-left: 20px;
      }
    }
  }

  .el-aside {
    background-color: #304156;
    position: relative;
    .fold {
      position: absolute;
      top: calc(50% - 30px);
      right: 0;
      width: 40px;
      height: 50px;
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      line-height: 50px;
      color: rgba(255, 255, 255, 0.6);
      background-color: #17253f;
      &:active {
        background-color: #304156;
      }
    }
    .el-menu {
      border-right: none;
    }
  }

  .el-container {
    background-color: #f8f8f8;
    height: 100%;
  }
</style>
