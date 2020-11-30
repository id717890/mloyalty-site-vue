<template>
  <div class="ml-numeric">
    <button @click.stop="decrement">
      <v-icon>mdi-minus</v-icon>
    </button>
    <div>{{ value }}</div>
    <button @click.stop="increment">
      <v-icon>mdi-plus</v-icon>
    </button>
  </div>
</template>

<script>
const MIN_VALUE = 0

export default {
  name: 'MlNumeric',
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
  data: () => ({}),
  mounted() {},
  watch: {},
  updated(v) {},
  methods: {
    increment() {
      const n = this.value + 1
      this.$emit('input', n)
    },
    decrement() {
      if (this.value > MIN_VALUE) {
        let n = this.value - 1
        this.$emit('input', n)
      }
    }
  }
}
</script>
