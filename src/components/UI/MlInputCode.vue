<template>
  <input
    v-bind="$attrs"
    class="form-control ml-input-code"
    :class="{ invalid }"
    :value="value"
    @input="$emit('input', $event.target.value)"
    maxlength="1"
    v-mask="'#'"
  />
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'MlInputCode',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  directives: { mask },
  props: {
    value: {
      type: null,
      required: true
    },
    invalid: {
      type: Boolean
    }
  }
}
</script>
