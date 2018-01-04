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
        watches: {}
      }
    },

    pouch: {
      watches: {}
    },

    watch: {
      async watches (w) {
        let id
        if (w.length !== 0) {
          id = w[0]._id
        } else {
          const doc = await this.$pouch.post('watches', {})
          id = doc.id

          this.$notify({
            title: 'Welcome',
            type: 'info',
            message: 'Create a new watch!'
          })
        }

        this.$router.replace({ name: 'watch', params: { id } })
      }
    }
  }
</script>

<style scoped>

</style>
