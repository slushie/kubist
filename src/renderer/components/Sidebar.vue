<template>
    <el-menu router>
      <el-menu-item v-for="query in queries" :key="query.id"
                    :index="query.id" :route="`/query/${query.id}`">
        <i class="swatch" :style="{backgroundColor: query.color}"></i>
        <span slot="title">{{query.name}}</span>
      </el-menu-item>
    </el-menu>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar',

    computed: {
      ...mapGetters(['queries'])
    },

    data () {
      const queries = this.$store.getters.queries
      return {
        collapsed: true,
        query: queries[0]
      }
    }
  }
</script>

<style scoped>
  .swatch {
    border-radius: 0.25rem;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    vertical-align: text-bottom;
    display: inline-block;
  }
</style>
