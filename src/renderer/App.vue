<template>
  <el-container direction="horizontal">
    <el-aside width="auto">
      <sidebar id="sidebar"></sidebar>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import Sidebar from './components/Sidebar'

  export default {
    name: 'kubist',
    components: { Sidebar }
  }
</script>

<style>
  html, body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  #sidebar {
    height: 100%
  }
</style>
