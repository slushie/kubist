<template>
  <el-container>
    <el-header>
      <editor @run-query="handleRun"
              @save-query="handleSave"
              @stop-query="handleStop"
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

  const defaultQuery = {}

  export default {
    name: 'query-view',

    components: { Editor, Results },

    data () {
      return {
        queryId: null,
        query: _.clone(defaultQuery),
        running: false
      }
    },

    watch: {
      async queryId (id) {
        if (!id) {
          this.running = false
          return
        }

        const query = this.queries[id]
        if (query) {
          this.$debug('Loaded query %j', query)
          this.query = _.clone(query)
        } else {
          this.$debug('Creating new query object %j', defaultQuery)
          this.query = _.clone(defaultQuery)
        }

        const queries = await this.listRunningQueries()

        if (~queries.indexOf(id)) {
          this.running = true
          await this.listenForQueryResults(id)
          await this.syncQueryResults(id)
        }
      }
    },

    computed: {
      ...mapState({
        queries: (state) => state.Queries.queries
      })
    },

    methods: {
      ...mapActions([
        'listRunningQueries',
        'listenForQueryResults',
        'syncQueryResults'
      ]),

      async handleRun () {
        this.$debug('Running %j', this.query)

        try {
          await this.$store.dispatch('runQuery', this.query)
          this.running = true
        } catch (err) {
          this.$debug('Failed to run query', err.stack)
          this.$notify.error({
            title: 'Query Failed',
            message: err.message.trim()
          })
        }
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
      },

      async handleStop () {
        await this.$store.dispatch('stopQuery', this.queryId)
        this.running = false
      }
    },

    mounted () {
      this.queryId = _.get(this.$route, 'params.id')
    },

    beforeRouteUpdate (to, from, next) {
      this.queryId = to.params.id
      next()
    }
  }
</script>

<style scoped>

</style>
