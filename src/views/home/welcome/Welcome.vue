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
                <el-card
                  v-for="(item, index) in weatherData"
                  :key="item.humidity"
                  shadow="hover"
                  class="weather-item"
                >
                  <div class="left">
                    <div class="icon">
                      <img :src="weatherIcon(item.conditionIdDay)" />
                    </div>
                    <div class="degree">
                      {{ item.tempDay }} - {{ item.tempNight }} ℃
                    </div>
                    <div class="text">
                      {{ item.conditionDay }}/{{ item.windDirDay }}
                    </div>
                  </div>
                  <div class="right">
                    <div class="day">
                      {{ dateComfirm(index) }}
                    </div>
                    <div class="time">
                      {{ item.predictDate }}
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
  import { weatherData } from "@/network/api";
  export default {
    created() {
      let weather = JSON.parse(window.localStorage.getItem("weather"));

      // 判断天气数据是否在一小时前被请求过，进而减少数据请求
      if (weather) {
        // 上次请求距离现在的时间间隔
        let timeGap = Date.now() - weather.time;
        // 一小时毫秒数
        let oneHour = 1000 * 60 * 60;

        // 距离上次数据请求和现在的时间间隔是否大于一个小时
        timeGap > oneHour
          ? this.getWeatherData()
          : (this.weatherData = weather.weatherData);
      } else {
        this.getWeatherData();
      }
    },
    data() {
      return {
        value: new Date(),
        weatherData: [],
      };
    },
    methods: {
      // 判断是哪一天
      dateComfirm(idx) {
        switch (idx) {
          case 0:
            return "今天";
          case 1:
            return "明天";
          case 2:
            return "后天";
        }
      },

      // 天气图标
      weatherIcon(value = 0) {
        return require("@/assets/images/weatherIcon/W" + value + ".png");
      },

      // 获取天气数据
      getWeatherData() {
        weatherData().then((res) => {
          this.weatherData = res.data.data.forecast;

          // 序列化缓存格式
          let weatherDataStorage = JSON.stringify({
            weatherData: this.weatherData,
            time: Date.now(), // 发送请求时的时间
          });

          window.localStorage.setItem("weather", weatherDataStorage);
        });
      },
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
          font-size: 18px;
          // margin-left: 5px;
          i {
            font-size: 22px;
            margin-right: 6px;
            transform: translateY(2px);
          }
          color: #67c23a;
        }
        .weather-main {
          .weather-item {
            margin-bottom: 16px;
            .el-card__body {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left {
                .icon {
                  width: 48px;
                  height: 48px;
                }
                display: flex;
                align-items: center;
                .degree {
                  font-size: 38px;
                  font-weight: bold;
                  margin: 0 20px 0 20px;
                }
                .text {
                  font-size: 16px;
                  color: #409eff;
                  transform: translateY(10px);
                }
              }
              .right {
                text-align: right;
                .day {
                  font-size: 40px;
                  font-weight: 800;
                  color: #67c23a;
                  margin-bottom: 10px;
                }
                .time {
                  font-size: 14px;
                  color: #aaa;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
