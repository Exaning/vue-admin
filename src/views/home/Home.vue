<template>
  <div class="homeView">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../../assets/images/logo2.png" @click="goHome" />
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
      <el-container class="homeContent">
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
            :default-active="activeRoute"
            :router="true"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="rgba(255, 255, 255, 0.6)"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <!-- 意向用户 -->
            <el-menu-item index="users">
              <i class="el-icon-coin"></i>
              <span slot="title">意向用户</span>
            </el-menu-item>

            <!-- 添加客户 -->
            <el-menu-item index="adduser">
              <i class="el-icon-user"></i>
              <span slot="title">添加客户</span>
            </el-menu-item>

            <!-- 数据分析 -->
            <el-menu-item index="userdata">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- <Welcome /> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        activeRoute: window.location.hash.slice(2),
      };
    },
    // 监听路由状态，激活菜单
    watch: {
      $route() {
        this.activeRoute = window.location.hash.slice(2);
      },
    },
    methods: {
      // 退出登录
      logOut() {
        window.localStorage.clear();
        this.$message.success("退出成功");
        this.$router.push("/login");
      },
      // 菜单的折叠与展开
      menuCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      // 回到主页
      goHome() {
        this.$router.push("/welcome");
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
        cursor: pointer;
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

  .homeContent {
    height: calc(100% - 60px);
  }
</style>
