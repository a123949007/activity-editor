<template>
  <img class="background" :src="source[0].url">
</template>

<script>
export default {
  name: 'Background',
  props: {
    source: Array
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .background{
    position: absolute;
    width:100%;
    top:0;
    left:0;
    z-index: 0;
  }
</style>
