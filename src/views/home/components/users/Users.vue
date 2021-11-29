<template>
  <div class="users">
    <el-card class="top-bar" shadow="always">
      <el-row :gutter="10">
        <el-col :span="12">
          <!--搜索时必须将键盘监听事件绑定到 input 上，按钮上无法监听  -->
          <el-input
            v-model="keyword"
            placeholder="请输入关键字"
            @change="searchUser"
          >
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" @click="searchUser">
            搜索
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 点击【编辑】时弹出的对话框 -->
    <DialogCmpnt ref="Dialog" />

    <!-- 表格 -->
    <el-card shadow="always">
      <el-table :data="userData" style="width: 100%" stripe border>
        <el-table-column align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="nickname" label="用户名">
        </el-table-column>
        <el-table-column align="center" label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>
              {{ dateFormat(scope.row.posttime) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="contact" label="电话" width="130">
        </el-table-column>
        <el-table-column align="center" prop="weixin" label="微信">
        </el-table-column>
        <el-table-column align="center" prop="qq" label="QQ"></el-table-column>
        <el-table-column align="center" prop="infoclass" label="咨询课程">
        </el-table-column>
        <el-table-column align="center" prop="laiyuan" label="信息来源">
        </el-table-column>
        <el-table-column align="center" prop="zhuanye" label="专业">
        </el-table-column>
        <el-table-column align="center" prop="kefu" label="客服">
        </el-table-column>
        <el-table-column align="center" prop="dizhi" label="所在地">
        </el-table-column>
        <!-- 操作按钮组 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editUserInfo(scope.row.id)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUser(scope.row.id)"
              >
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-card shadow="always" class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { yxList, yxDelRow } from "@/network/api";
  import { timeStampFormat } from "@/assets/js/common";

  export default {
    created() {
      this.getAllUsersData();
    },
    components: {
      // 模态框
      DialogCmpnt: () => import("@/components/DialogCmpnt"),
    },
    data() {
      return {
        // 关键字
        keyword: "",
        // 用户数据
        userData: [],
        // 当前页码
        currentPage: 1,
        // 每页数据条数
        pageSize: 20,
        // 数据总数
        totalNum: 0,
      };
    },
    methods: {
      // 获取所有用户数据
      getAllUsersData() {
        // 参数
        let params = {
          num: this.pageSize,
          page: this.currentPage,
          keyword: this.keyword,
        };
        // 请求
        yxList(params).then((res) => {
          // console.log(res.data.results);
          this.userData = res.data.results;
          this.totalNum = res.data.num;
        });
      },

      // 时间戳格式化
      dateFormat(date) {
        return timeStampFormat(date);
      },

      // 改变每页数据条数时触发的回调
      // 参数 val 为数据条数
      handleSizeChange(size) {
        this.pageSize = size;
        this.getAllUsersData();
      },

      // 页面切换时触发的回调
      // 参数 page_index 为需要跳转到的页码
      handleCurrentChange(page_index) {
        this.currentPage = page_index;
        this.getAllUsersData();
      },

      // 搜索
      searchUser() {
        this.getAllUsersData();
      },

      // 删除用户
      deleteUser(id) {
        let param = { id };
        // 确认删除弹框
        this.$confirm("此操作将永久删除该用户数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 删除用户信息的接口
            yxDelRow(param).then((res) => {
              if (res.data.code && res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                setTimeout(() => {
                  this.$router.go(0);
                }, 1500);
              }
            });
          })
          .catch(() => {
            // 按个人偏好取消注释或注释
            // this.$message({
            //   type: "info",
            //   message: "已取消删除",
            // });
          });
      },

      // 编辑用户信息
      editUserInfo(id) {
        // 弹出修改框(模态框组件)
        this.$refs.Dialog.showDialog = true;
        this.$refs.Dialog.id = id;
        this.$refs.Dialog.getUserData(); // 第一种方法：父组件调用子组件的方法
      },
    },
  };
</script>

<style lang="less" scoped>
  .top-bar {
    margin-bottom: 10px;
  }

  .pagination-box {
    text-align: center;
    margin-top: 10px;
  }
</style>
