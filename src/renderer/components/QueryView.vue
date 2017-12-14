<template>
  <el-container>
    <el-header>
      <editor @run-query="handleRun" :query="query"></editor>
    </el-header>
    <el-main>
      <results :id="id"></results>
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
        id: null,
        query: empty
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
        this.id = id

        const query = this.queries[id]
        if (query) this.query = _.clone(query)
      },

      handleRun () {
        console.log(this.id, this.query)
        // this.$store.commit('STORE_QUERY', this.query)
        this.runQuery(this.query)
      },

      handleSave () {
        const { id, query } = this

        this.$store.commit('STORE_QUERY', query)

        if (query.id !== id) {
          this.id = query.id

          // delete the query with the old name
          if (id !== null) {
            this.$store.commit('DELETE_QUERY', id)
          }
        }
      }
    },

    mounted () {
      this.id = this.$route.params.id

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
