<template>
  <el-card class="top-bar" shadow="always">
    <slot name="content"></slot>
  </el-card>
</template>

<script>
  export default {
    props: {
      isSearchBar: {
        type: Boolean,
      },
      isTitleBar: {
        type: Boolean,
      },
    },
  };
</script>

<style></style>
