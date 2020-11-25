<template>
  <div>123</div>
</template>

<script>
import appTypes from '../store/app/types'
export default {
  data: () => ({
    test: 'sss'
  }),
  mounted() {
    console.log(this.$route.params)
    this.$store.dispatch(
      `app/${appTypes.INIT_TEMPLATE}`,
      this.$route.params.code
    )
  }
}
</script>

<style></style>
