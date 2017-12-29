<template>
  <el-container>
    <el-header>
      <editor v-if="queryId" :queryId="queryId"></editor>
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
        queryId: {},
        query: {}
      }
    },

    pouch: {
      query () {
        return {
          database: 'queries',
          selector: { _id: this.queryId },
          first: true
        }
      }
    },

    watch: {
      queryId (id) {
        if (!id) this.createQuery()
      },

      query (query) {
        if (!query || query.length === 0) {
          this.$notify({
            title: 'Not found',
            message: `Query ${this.queryId} not found`,
            type: 'error'
          })
        } else {
          this.$debug('loaded query %j', query)
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
