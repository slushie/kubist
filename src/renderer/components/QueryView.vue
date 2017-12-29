<template>
  <el-container>
    <el-header>
      <editor v-if="queryId && query._id" :queryId="queryId"></editor>
    </el-header>
    <el-main>
      <objects></objects>
    </el-main>
  </el-container>
</template>

<script>
  import Editor from './QueryView/Editor'
  import Objects from './QueryView/Objects'

  import _ from 'lodash'
  import { mapActions } from 'vuex'

  export default {
    name: 'query-view',

    components: { Editor, Objects },

    data () {
      return {
        queryId: null,
        query: {}
      }
    },

    pouch: {
      queries: {},
      query () {
        return {
          database: 'queries',
          selector: { _id: this.queryId },
          first: true
        }
      }
    },

    computed: {
      firstQueryId () {
        if (this.queries.length > 0) {
          return this.queries[0]._id
        } else {
          return null
        }
      }
    },

    watch: {
      async queryId (id) {
        if (id) return

        if (this.queries.length !== 0) {
          this.queryId = this.firstQueryId
        } else {
          await this.createQuery()
          this.$notify({
            title: 'Welcome',
            message: 'Created an empty query',
            type: 'info'
          })
        }
      },

      query (query) {
        if (query.length === 0) {
          this.$notify({
            title: 'Not found',
            message: `Query ${this.queryId} not found`,
            type: 'error'
          })

          this.$router.replace({ name: 'create-query' })
        }
      }
    },

    methods: {
      ...mapActions(['nextColor']),

      async createQuery () {
        const color = await this.nextColor()
        const name = 'Untitled Query'

        const doc = await this.$pouch.post('queries', { color, name })
        this.$router.push({ name: 'query-view', params: { id: doc.id } })
      },

      async selectFirstQuery () {
        if (this.queries.length === 0) {
          await this.createQuery()
          this.$notify({
            title: 'Welcome',
            message: 'Created an empty query',
            type: 'info'
          })
        }
      }
    },

    mounted () {
      this.queryId = _.get(this.$route, 'params.id')
    },

    beforeRouteUpdate (to, from, next) {
      this.queryId = _.get(to, 'params.id')
      next()
    }
  }
</script>

<style scoped>

</style>
