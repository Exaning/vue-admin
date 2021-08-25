<template>
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
</template>

<script>
  export default {};
</script>

<style></style>
