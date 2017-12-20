<template>
  <el-table :data="results" stripe>
    <el-table-column prop="name" label="Name"></el-table-column>
  </el-table>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'

  export default {
    name: 'results',
    props: ['queryId'],

    computed: {
      ...mapState({
        objects: (state) => state.Informer.objects || {}
      }),

      results () {
        const objects = this.objects[this.queryId]
        if (!objects) return []

        return Object.keys(objects).filter(Boolean)
          .map(name => _(objects[name]))
          .map(o => ({ name: o.get('metadata.name') }))
      }
    }
  }
</script>

<style scoped>

</style>
