<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          width="2"
          color="#000000"
        ></v-progress-circular>
        <div v-if="text" class="mt-3">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
