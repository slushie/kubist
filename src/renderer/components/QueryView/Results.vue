<template>
  <el-table :data="queryResults(id)" height="100%">
  </el-table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'results',
    props: ['id'],

    computed: {
      ...mapGetters([
        'queryResults'
      ])
    }
  }
</script>

<style scoped>

</style>
