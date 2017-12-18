<template>
  <el-table :data="queryResults(queryId)">
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
    },

    watch: {
      queryResults (val) {
        this.$debug('new query results: %j', val)
      }
    }
  }
</script>

<style scoped>

</style>
