<template>
  <el-container>
    <el-header>
      <editor @run-query="handleRun"
              :running="running"
              :query="query"></editor>
    </el-header>
    <el-main>
      <results :queryId="queryId"></results>
    </el-main>
  </el-container>
</template>

<script>
  import Editor from './QueryView/Editor'
  import Results from './QueryView/Results'

  import { mapState, mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'query-view',

    components: { Editor, Results },

    data () {
      const empty = {}

      return {
        queryId: null,
        query: empty,
        running: false
      }
    },

    computed: {
      ...mapState({
        queries: (state) => state.Queries.queries
      })
    },

    methods: {
      ...mapActions(['runQuery']),

      updateView (id) {
        this.queryId = id
        this.$debug('Showing query %j', id)

        const query = this.queries[id]
        if (query) this.query = _.clone(query)
      },

      handleRun () {
        this.$debug('Running %j', this.query)
        this.runQuery(this.query).then(
          () => { this.running = true },
          (err) => this.$notify.error({
            title: 'Query Failed',
            message: err.message.trim()
          })
        )
      },

      handleSave () {
        const { id, query } = this

        this.$store.commit('STORE_QUERY', query)

        if (query.id !== id) {
          this.queryId = query.id

          // delete the query with the old id
          if (id !== null) {
            this.$store.commit('DELETE_QUERY', id)
          }
        }
      }
    },

    mounted () {
      this.updateView(this.$route.params.id)
    },

    beforeRouteUpdate (to, from, next) {
      this.updateView(to.params.id)
      next()
    }
  }
</script>

<style scoped>

</style>
