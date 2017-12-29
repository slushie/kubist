<template>
  <el-card>
    <el-row :gutter="10">
      <el-col :span="2">
        <el-color-picker v-model="query.color"
                         :disabled="watching">
        </el-color-picker>
      </el-col>
      <el-col :span="22">
        <el-input :disabled="watching"
                  v-model="query.name"
                  placeholder="Name" required>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-select v-model="query.resource"
                   placeholder="Resource"
                   :disabled="watching">
          <el-option v-for="r in resources"
                     :key="r.value"
                     :label="r.label"
                     :value="r.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-input :disabled="watching"
                  v-model="query.selector"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button-group>
          <el-button @click="handleWatch"
                     :disabled="watching" title="Watch">
            <i class="fa fa-play"></i>
          </el-button>
          <el-button @click="handleStop"
                     :disabled="!watching" title="Stop">
            <i class="fa fa-stop"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { mapActions } from 'vuex'

  const resources = [
    { label: 'Pods', value: 'v1/pod' },
    { label: 'Services', value: 'v1/service' }
  ]

  export default {
    name: 'editor',
    props: ['queryId'],

    data () {
      return {
        resources,
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

    computed: {
      watching () {
        if (!this.query) return false
        return this.$store.getters.isWatching(this.query._id)
      }
    },

    watch: {
      query (query) {
        if (!query.resource) {
          query.resource = resources[0].value
        }
      }
    },

    methods: {
      ...mapActions([
        'createWatch',
        'deleteWatch'
      ]),

      async handleWatch () {
        await this.$pouch.put('queries', this.query)
        return this.createWatch(this.queryId)
      },

      async handleStop () {
        return this.deleteWatch(this.queryId)
      }
    }
  }
</script>

<style scoped>

</style>
