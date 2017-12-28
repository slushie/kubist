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
        queryId: null
      }
    },

    pouch: {
      query () {
        console.log('searching for', this.queryId)
        return {
          database: 'queries',
          selector: { _id: this.queryId },
          first: true
        }
      }
    },

    watch: {
      async queryId (id) {
        if (!id) return this.createQuery()
      }
    },

    methods: {
      ...mapActions(['nextColor']),

      async createQuery () {
        const color = await this.nextColor()
        const name = 'Untitled Query'

        const doc = await this.$pouch.post('queries', { color, name })
        console.log('created new doc', doc)
        this.$router.push(`/query/${doc.id}`)
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
