<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="query.resource" placeholder="Resource">
          <el-option v-for="r in resources"
                     :key="r.value"
                     :label="r.label"
                     :value="r.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-button @click="$emit('run-query')"
                     :disabled="running" title="Run">
            <i class="fa fa-play"></i>
          </el-button>
          <el-button @click="$emit('stop-query')"
                     :disabled="!running" title="Stop">
            <i class="fa fa-stop"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  const resources = [
    { label: 'Pods', value: 'v1/pod' },
    { label: 'Services', value: 'v1/service' }
  ]

  export default {
    name: 'editor',
    props: ['query', 'running'],
    data () {
      return {
        resources
      }
    }
  }
</script>

<style scoped>

</style>
