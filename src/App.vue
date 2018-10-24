<template>
  <div id="app" :style="{background}">
    <Page/>
  </div>
</template>

<script>
import Page from './page/Page'
export default {
  name: 'app',
  components: {
    Page
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    background () {
      return this.$root.json.backgroundColor || '#fff'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
html,body{
  padding:0;
  margin:0;
  width:100%;
  height:100%;
}
::-webkit-scrollbar {
  display: none;
}
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#fff;
}
</style>
