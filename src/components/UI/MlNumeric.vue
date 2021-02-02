<template>
  <div class="ml-numeric">
    <button @click.stop="decrement">
      <v-icon>mdi-minus</v-icon>
    </button>
    <input type="number" v-bind="$attrs" :value="value" @input="change" />
    <button @click.stop="increment">
      <v-icon>mdi-plus</v-icon>
    </button>
  </div>
</template>

<script>
const MIN_VALUE = 0

export default {
  name: 'MlNumeric',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    change(v) {
      this.$emit('input', Number(v.target.value))
    },
    increment() {
      const max = this.$attrs?.max
      if (max && this.value >= max) return
      const n = this.value + 1
      this.$emit('input', n)
      this.$forceUpdate()
    },
    decrement() {
      const min = this.$attrs?.min
      if (min && this.value <= min) return
      let n = this.value - 1
      this.$emit('input', n)
      this.$forceUpdate()
    }
  }
}
</script>
