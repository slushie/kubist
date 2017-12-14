<template>
  <el-card>
    <el-button @click="$emit('run-query', query)">Run</el-button>
  </el-card>
</template>

<script>
  export default {
    name: 'editor',
    props: ['query']
  }
</script>

<style scoped>

</style>
