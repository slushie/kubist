<template>
  <v-form inline>
    <b-col>
      <label>
        Resource Kind:
        <b-form-select v-model="query.resource" :options="resources">
        </b-form-select>
      </label>
    </b-col>
    <b-col cols="8">
      <label>
        Selector:
        <b-input type="text" v-model="query.selector"></b-input>
      </label>
    </b-col>
  </v-form>
</template>

<script>
const resources = [
  { value: 'v1/pods', text: 'Pods' },
  { value: 'v1/services', text: 'Services' }
]

export default {
  name: 'query',
  props: {
    query: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      resources
    }
  }
}
</script>

<style scoped>

</style>
