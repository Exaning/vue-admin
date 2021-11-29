<template>
  <el-dialog
    title="修改用户信息"
    :visible="showDialog"
    @close="cancel"
    width="60%"
    :close-on-click-modal="false"
  >
    <el-form
      :model="updateUserForm"
      :rules="updateUserRules"
      ref="updateUserForm"
      label-width="100px"
      status-icon
    >
      <!-- 客户名 -->
      <el-form-item
        label="客户名称："
        prop="nickname"
        placeholder="请输入客户名"
      >
        <el-input v-model.trim="updateUserForm.nickname"></el-input>
      </el-form-item>

      <!-- 联系电话 -->
      <el-form-item
        label="联系电话："
        prop="contact"
        placeholder="请输入联系方式"
      >
        <el-input v-model.trim="updateUserForm.contact"></el-input>
      </el-form-item>

      <!-- QQ -->
      <el-form-item label="QQ：" prop="qq" placeholder="请输入QQ号">
        <el-input v-model.trim="updateUserForm.qq"></el-input>
      </el-form-item>

      <!-- 微信号 -->
      <el-form-item label="微信：" prop="weixin" placeholder="请输入微信号">
        <el-input v-model.trim="updateUserForm.weixin"></el-input>
      </el-form-item>

      <!-- 咨询专业 -->
      <el-form-item label="咨询专业：" prop="zhuanye">
        <el-input
          placeholder="请输入专业简述"
          v-model.trim="updateUserForm.zhuanye"
          class="input-with-select"
        >
          <el-select
            v-model="updateUserForm.infoclass"
            slot="prepend"
            placeholder="请选择专业"
            class="major-selector"
            clearable
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.id"
              :label="item.classname"
              :value="item.classname"
            >
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>

      <!-- 信息来源 -->
      <el-form-item
        label="信息来源："
        prop="laiyuan"
        placeholder="请输入信息来源"
      >
        <el-input v-model.trim="updateUserForm.laiyuan"></el-input>
      </el-form-item>

      <!-- 地址 -->
      <el-form-item
        label="所在地区："
        prop="dizhi"
        placeholder="请输入所在地区"
      >
        <el-input v-model.trim="updateUserForm.dizhi"></el-input>
      </el-form-item>

      <!-- 选择客服 -->
      <el-form-item label="客服：" prop="kefu">
        <el-select
          v-model="updateUserForm.kefu"
          placeholder="请选择客服"
          multiple
          clearable
        >
          <el-option
            v-for="item in customServiceOptions"
            :key="item.id"
            :label="item.classname"
            :value="item.classname"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-divider></el-divider>

      <!-- 按钮组 -->
      <el-form-item>
        <div class="btn-container">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-button type="primary" :style="btnStyle" @click="updateData">
                确认提交
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="warning"
                plain
                :style="btnStyle"
                @click="onReset"
              >
                重置
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  // 接口
  import { yxLoad, yxUpdata, yxRow } from "@/network/api";
  // 重复信息校验
  import { validate_repeat_info } from "@/assets/js/validator";
  export default {
    name: "dialogcmpnt",
    created() {
      // 页面加载前获取客服数据
      this.getCustomService();
    },
    data() {
      return {
        // 对话框显隐
        showDialog: false,
        id: "", // 用户 id
        updateUserForm: {
          nickname: "",
          contact: "",
          qq: "",
          weixin: "",
          laiyuan: "",
          zhuanye: "",
          infoclass: "",
          dizhi: "",
          kefu: [],
        },
        updateUserRules: {
          // 客户名
          nickname: [
            { required: true, message: "客户名为必填项！", trigger: "blur" },
            {
              min: 3,
              max: 30,
              message: "客户名应在 3 - 30位",
              trigger: "blur",
            },
          ],
          // 联系电话(手机号码)
          contact: [
            {
              validator: validate_repeat_info,
              trigger: "blur",
            },
          ],
          // 微信
          weixin: [
            {
              validator: validate_repeat_info,
              trigger: "blur",
            },
          ],
          qq: [
            {
              validator: validate_repeat_info,
              trigger: "blur",
            },
          ],
          // 信息来源
          laiyuan: [
            { required: true, message: "信息来源为必填项！", trigger: "blur" },
          ],
          // 专业
          zhuanye: [
            { required: true, message: "专业为必填项！", trigger: "blur" },
          ],
          // 专业
          infoclass: [
            { required: true, message: "专业简述为必填项！", trigger: "blur" },
          ],
          // 客服
          kefu: [
            {
              type: "array",
              required: true,
              message: "请至少选择一个客服",
              trigger: "change",
            },
          ],
        },
        // 专业数据
        majorOptions: [],
        // 客服数据
        customServiceOptions: [],
        // 被选中客服值
        customServiceValue: "",
        // 按钮样式
        btnStyle: {
          width: "100%",
          height: "50px",
        },
      };
    },
    watch: {
      id(val) {
        // console.log(val);
        // this.getUserData(); // 第二种方法
      },
    },
    methods: {
      // 取消(关闭对话框 )
      cancel() {
        this.showDialog = false;
        window.localStorage.removeItem("userData");
      },

      // 获取客服信息
      getCustomService() {
        yxLoad().then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            this.customServiceOptions = res.data.kefu;
            this.majorOptions = res.data.infoclass;
          }
        });
      },

      // 获取单个用户的数据
      getUserData() {
        let id = this.id;
        yxRow({ id }).then((res) => {
          // 清空表单
          this.$refs["updateUserForm"].resetFields();
          // 将后台返回的数据转换为数组形式
          res.data.results.kefu = res.data.results.kefu.split("-");
          // 数据回显(覆盖 updateUserForm 中的信息)
          this.updateUserForm = res.data.results;
          // 将该用户信息加入缓存
          let userData = JSON.stringify(res.data.results);
          window.localStorage.setItem("userData", userData);
        });
      },

      // 修改某一个用户的数据
      updateData() {
        // 提交数据之前先校验
        this.$refs["updateUserForm"].validate((valid) => {
          if (valid) {
            yxUpdata(this.updateUserForm).then((res) => {
              if (res.data.code == 200) {
                this.showDialog = false;
                this.$message.success("用户信息修改成功!");
                this.$parent.getAllUsersData();
              }
            });
          }
        });
      },

      // 重置表单
      onReset() {
        this.getUserData();
        // this.$refs["updateUserForm"].resetFields();
        // this.updateUserForm = {}; // 这样也可以清空表单
      },
    },
  };
</script>
<style lang="less" scoped>
  .major-selector {
    width: 140px;
  }
</style>
