<template>
  <div class="ml-panel-sending-page">
    <v-btn @click.stop="next"></v-btn>
  </div>
</template>

<script>
import { START_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({}),
  methods: {
    next() {
      this.changePanelPage(START_PAGE)
    }
  }
}
</script>
