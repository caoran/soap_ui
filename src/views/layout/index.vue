<template>
  <div class="site-content__wrapper" :style="siteContentWarpperStyles">
    <router-view></router-view>
  </div>
</template>

<script>
  import ContentTabs from './content-tabs'
  import API from '@/api'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        loading: true
      }
    },
    components: {
      ContentTabs
    },
    computed: {
      siteWarpperClasses () {
        return [
          { 'site-sidebar--collapse': this.$store.state.sidebarCollapse }
        ]
      },
      siteContentWarpperStyles () {
        return [
          { 'minHeight': this.$store.state.documentClientHeight + 'px' }
        ]
      }
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
      this.resetDocumentClientHeight()
      window.onresize = () => {
        this.resetDocumentClientHeight()
      }
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.UPDATE_DOCUMENT_CLIENT_HEIGHT({ height: document.documentElement['clientHeight'] })
      }
    }
  }
</script>
