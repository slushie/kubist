<template>
  <el-container>
    <el-header>
      <editor @run-query="handleRun"></editor>
    </el-header>
    <el-main>
      <results :id="id"></results>
    </el-main>
  </el-container>
</template>

<script>
  import Editor from './QueryView/Editor'
  import Results from './QueryView/Results'

  import { createClient, createEventSource } from 'kubernetes-stream/src/kubernetes'
  import KubernetesStream from 'kubernetes-stream/src/stream'

  import { mapState } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'query-view',

    components: { Editor, Results },

    data () {
      return {
        id: null,
        query: {},
        ...mapState(['queries'])
      }
    },

    methods: {
      updateView (id) {
        this.id = id

        const query = this.queries[id]
        if (query) this.query = _.clone(query)
        console.log('my id is', this.id)
      },

      handleRun () {
        const namespace = this.query.namespace
        const k = this.query.kind.split('/', 2)
        const apiVersion = k.length === 1 ? 'v1' : k.shift()
        const kind = k.shift()

        const client = createClient({ kind, apiVersion, namespace })
        return new KubernetesStream(createEventSource(client))
      }
    },

    mounted () {
      console.log(this.$route.params)
      this.updateView(this.id)
    },

    beforeRouteUpdate (to, from, next) {
      this.updateView(to.params.id)
      next()
    }
  }
</script>

<style scoped>

</style>
