<template>
  <el-table :data="objects" empty-text="Nothing here">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <pre>{{JSON.stringify(scope.row, null, 2)}}</pre>
      </template>
    </el-table-column>
    <el-table-column label="Name"
                     prop="metadata.name">
    </el-table-column>

    <el-table-column label="Namespace"
                     prop="metadata.namespace">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'objects',

    pouch: {
      objects: {}
    }
  }
</script>

<style scoped>

</style>
