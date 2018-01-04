<template>
  <b-container fluid>
    <b-row v-if="!hasQueries">
      <create :watch="watch" />
    </b-row>
    <template v-else>
      <v-row>
        <save :watch="watch" />
      </v-row>
      <v-row>
        <queries :watch="watch" />
      </v-row>
    </template>
  </b-container>
</template>

<script>
import _ from 'lodash'
import Create from './WatchView/Create'
import Queries from './WatchView/Queries'
import Save from './WatchView/Save'

export default {
  name: 'watch-view',
  props: [ 'watchId' ],
  components: { Create, Queries, Save },

  data () {
    return {
      watch: {}
    }
  },

  computed: {
    hasQueries () {
      return !!_.get(this.watch, 'queries.length')
    }
  },

  pouch: {
    watch () {
      return {
        database: 'watches',
        selector: { _id: this.watchId },
        first: true
      }
    }
  },

  watches: {
    async watch (w) {
      if (!w || w.length === 0) {
        this.$notify({
          title: 'Not found',
          message: `Watch ${this.watchId} not found`,
          type: 'error'
        })

        await this.$pouch.put('watches', { _id: this.watchId })
      } else {
        let dirty
        if (!w.queries) dirty = w.queries = []
        if (dirty) await this.$pouch.put('watches', w)
      }
    }
  }
}
</script>

<style scoped>

</style>
