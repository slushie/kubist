<template>
  <el-card>
    <el-button-group>
      <el-button @click="$emit('run-query')"
                 :disabled="running" title="Run">
        <i class="fa fa-play"></i>
      </el-button>
      <el-button @click="$emit('stop-query')"
                 :disabled="!running" title="Stop">
        <i class="fa fa-stop"></i>
      </el-button>
    </el-button-group>
  </el-card>
</template>

<script>
  export default {
    name: 'editor',
    props: ['query', 'running']
  }
</script>

<style scoped>

</style>
