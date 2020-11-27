<template>
  <div>
    SENDING
    <v-btn @click.stop="next"></v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { START_PAGE } from '@/helpers/const/widgetPage'
import panelTypes from '@/store/panel/types'

export default {
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    next() {
      this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
    }
  }
}
</script>
