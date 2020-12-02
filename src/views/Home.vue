<template>
  <div class="row h100">
    <div class="col-12 h100 d-flex justify-content-center align-center">
      <v-btn color="pink" dark @click.stop="togglePanel">
        Toggle
      </v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapMutations } from 'vuex'
import panelTypes from '@/store/panel/types'

export default {
  name: 'Home',
  components: {},
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),

    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    }
  }
}
</script>
