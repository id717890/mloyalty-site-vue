<template>
  <div class="par" @click="selectPar" :class="{ active }">
    <input
      @input="$emit('input', Number($event.target.value))"
      style="width: 61px"
      min="1"
      type="number"
      placeholder="Указать"
      :value="value"
      v-if="!readonly"
    />
    <span v-else>{{ value }}</span>
    <span class="ml-1">₽</span>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: null
    },
    readonly: {
      type: Boolean,
      required: false,
      default: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  directives: {
    mask
  },
  methods: {
    selectPar() {
      if (this.readonly) {
        this.$emit('change-par', this.value)
      }
    }
  }
}
</script>

<style></style>
