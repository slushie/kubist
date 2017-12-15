<template>
  <el-card>
    <el-button @click="$emit('run-query', query)"
               :disabled="running">
      Run
    </el-button>
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
