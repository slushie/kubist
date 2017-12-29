<script>
  export default {
    name: 'home',
    render: () => {},
    pouch: {
      queries: {}
    },
    mounted () {
      if (this.queries && this.queries.length > 0) {
        const id = this.queries[0]._id
        this.$debug('loading first query %j', id)

        this.$router.replace({
          name: 'query-view',
          params: { id }
        })
      } else {
        this.$notify({
          title: 'Welcome',
          message: 'Created an empty query',
          type: 'info'
        })

        this.$router.replace({
          name: 'create-query'
        })
      }
    }
  }
</script>
