<template>
  <div>
    <h2>Kubist</h2>
    <p>
      <i class="fa fa-spinner fa-spin"></i>
      Please wait...
    </p>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        queries: {}
      }
    },

    pouch: {
      queries: {}
    },

    watch: {
      queries (q) {
        if (q.length === 0) {
          this.$notify({
            title: 'Welcome',
            type: 'info',
            message: 'Created a new query'
          })

          this.$router.replace({ name: 'create-query' })
        } else {
          const id = q[0]._id
          this.$router.replace({ name: 'query-view', params: { id } })
        }
      }
    }
  }
</script>

<style scoped>

</style>
