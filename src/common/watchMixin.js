export default {
  watch: {
    source: {
      deep: true,
      handler: function () {
        this.getStyle()
      }
    }
  }
}
