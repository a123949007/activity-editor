<template>
  <div class="containers">
    <component :key="index" v-for="(item,index) in displayList" :is="item.name" :source="item.attr"></component>
  </div>
</template>

<script>
import {postLpImp} from '$aweso/api/api'

export default {
  name: 'page',
  components: {
  },
  props: {
    configData: Object
  },
  data () {
    return {
    }
  },
  computed: {
    displayList () {
      return this.$root.json.components || []
    }
  },
  mounted () {
    postLpImp()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .containers{
    position: relative;
    overflow-x: hidden;
    width:100%;
    height:100%;
    background-size:100%;
  }
</style>
