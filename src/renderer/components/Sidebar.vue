<template>
    <el-menu router>
      <el-menu-item v-for="query in queries" :key="query._id"
                    :index="query._id" :route="`/query/${query.id}`">
        <i class="swatch" :style="{backgroundColor: query.color}"></i>
        <span slot="title">{{query.name}}</span>
      </el-menu-item>
    </el-menu>

</template>

<script>
  export default {
    name: 'sidebar',

    pouch: {
      queries: {}
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
