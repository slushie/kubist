<template>
  <el-table :data="queryResults(queryId)" height="100%">
  </el-table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'results',
    props: ['queryId'],

    computed: {
      ...mapGetters([
        'queryResults'
      ])
    }
  }
</script>

<style scoped>

</style>
