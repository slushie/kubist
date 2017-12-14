<template>
  <el-header id="tools" hidden>
    <el-button-group>
      <el-button size="mini" icon="fa fa-file-o" title="New"></el-button>
      <el-button size="mini" icon="fa fa-copy" title="Copy"></el-button>
      <el-button size="mini" icon="fa fa-save" title="Save"></el-button>
    </el-button-group>
  </el-header>
</template>

<script>
  export default {
    name: 'tools'
  }
</script>

<style scoped>
  #tools {
    background: #999;
  }
</style>
