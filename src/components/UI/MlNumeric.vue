<template>
  <div class="ml-numeric">
    <button @click.stop="decrement">
      <v-icon>mdi-minus</v-icon>
    </button>
    <div>{{ counter }}</div>
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
  data: () => ({
    counter: null
  }),
  mounted() {
    this.counter = this.value
  },
  methods: {
    increment() {
      this.$emit('input', ++this.counter)
    },
    decrement() {
      if (this.counter > MIN_VALUE) {
        this.$emit('input', --this.counter)
      }
    }
  }
}
</script>
