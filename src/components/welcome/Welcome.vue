<template>
  <div class="welcome">
    <el-card shadow="hover">
      <div slot="header" class="headerTitle">
        <i class="el-icon-message-solid"></i>
        <span>欢迎使用 exan 后台管理系统</span>
      </div>
      <div class="main">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="never">
              <el-calendar v-model="value"> </el-calendar>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="weather" shadow="never">
              <div slot="header" class="weatherTitle">
                <i class="el-icon-sunny"></i>
                <span>最近三天的天气</span>
              </div>
              <div class="weather-main">
                <el-card shadow="hover" class="weather-item">
                  <div class="left">
                    <div class="icon">
                      <img src="../../assets/images/weatherIcon/W0.png" />
                    </div>
                    <div class="degree"></div>
                    <div class="text">
                      晴/北风
                    </div>
                  </div>
                  <div class="right">
                    <div class="day">今天</div>
                    <div class="time">
                      {{ new Date().getFullYear() }} -
                      {{ new Date().getMonth() + 1 }} -
                      {{ new Date().getDate() }}
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(),
      };
    },
  };
</script>

<style lang="less">
  .welcome {
    .headerTitle {
      font-size: 30px;
      color: #409eff;
      font-weight: 600;
      span {
        padding-left: 10px;
      }
    }
    .main {
      .weather {
        .weatherTitle {
          font-size: 20px;
          font-weight: bold;
          // margin-left: 5px;
          i {
            font-size: 22px;
            margin-right: 6px;
          }
          color: #67c23a;
        }
        .weather-main {
          .weather-item {
            margin-bottom: 16px;
          }
        }
      }
    }
  }
</style>
