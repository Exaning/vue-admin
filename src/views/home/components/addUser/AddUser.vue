<template>
  <div class="add-user">
    <el-card class="top-bar" shadow="always">
      <el-row>
        <el-col :span="10">
          <div class="addTitle">
            <i class="el-icon-user-solid"></i>
            <span>添加新用户资料</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="always" class="main-form">
      <el-row>
        <el-col :span="16">
          <el-form
            :model="addUserForm"
            :rules="addUserRules"
            ref="addUserForm"
            label-width="100px"
          >
            <!-- 客户名 -->
            <el-form-item
              label="客户名称："
              prop="nickname"
              placeholder="请输入客户名"
            >
              <el-input v-model="addUserForm.nickname"></el-input>
            </el-form-item>

            <!-- 联系电话 -->
            <el-form-item
              label="联系电话："
              prop="contact"
              placeholder="请输入联系方式"
            >
              <el-input v-model="addUserForm.contact"></el-input>
            </el-form-item>

            <!-- QQ -->
            <el-form-item label="QQ：" prop="qq" placeholder="请输入QQ号">
              <el-input v-model="addUserForm.qq"></el-input>
            </el-form-item>

            <!-- 微信号 -->
            <el-form-item
              label="微信："
              prop="weixin"
              placeholder="请输入微信号"
            >
              <el-input v-model="addUserForm.weixin"></el-input>
            </el-form-item>

            <!-- 微信号 -->
            <el-form-item
              label="信息来源："
              prop="laiyuan"
              placeholder="请输入信息来源"
            >
              <el-input v-model="addUserForm.laiyuan"></el-input>
            </el-form-item>

            <!-- 地址 -->
            <el-form-item
              label="所在地区："
              prop="laiyuan"
              placeholder="请输入所在地区"
            >
              <el-input v-model="addUserForm.dizhi"></el-input>
            </el-form-item>

            <!-- 咨询专业 -->
            <el-form-item label="咨询专业：">
              <el-select v-model="majorValue" placeholder="请选择专业">
                <el-option
                  v-for="item in majorOptions"
                  :key="item.id"
                  :label="item.classname"
                  :value="item.classname"
                  multiple
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="客服：">
              <el-select v-model="customServiceValue" placeholder="请选择客服">
                <el-option
                  v-for="item in customServiceOptions"
                  :key="item.id"
                  :label="item.classname"
                  :value="item.classname"
                  multiple
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { yxLoad } from "@/network/api";
  export default {
    created() {
      this.getCustomService();
    },
    data() {
      return {
        // 表单初始数据
        addUserForm: {
          nickname: "",
          contact: "",
          qq: "",
          weixin: "",
          laiyuan: "",
          dizhi: "",
        },
        // 客户信息校验规则
        addUserRules: {
          // 客户名
          nickname: [
            { required: true, message: "客户名为必填项！", trigger: "blur" },
            {
              min: 5,
              max: 30,
              message: "客户名应在 5 - 30位",
              trigger: "blur",
            },
          ],
          // 信息来源
          laiyuan: [
            { required: true, message: "信息来源为必填项！", trigger: "blur" },
          ],
        },
        // 专业数据
        majorOptions: {},
        // 专业值
        majorValue: "",
        // 客服数据
        customServiceOptions: [],
        // 被选中客服值
        customServiceValue: "",
      };
    },
    methods: {
      // 获取客服信息
      getCustomService() {
        yxLoad().then((res) => {
          if (res.status == 200) {
            this.customServiceOptions = res.data.kefu;
            this.majorOptions = res.data.infoclass;
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .addTitle {
    font-size: 28px;
    color: #409eff;
    span {
      padding-left: 10px;
    }
  }

  .main-form {
    margin-top: 30px;
    padding: 30px 0;
  }
</style>
