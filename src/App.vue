<template>
  <div id="app">
    <router-view/>
    <van-overlay :show="loading">
      <van-loading size="28px" type="spinner" vertical>加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        loading: false
      }
    },
    methods:{

    },
    computed: {
      loadingStatus () {
        return this.$store.state.loading;
      }
    },
    watch: {
      loadingStatus (val) {
        this.loading = val;
      }
    }
  }
</script>
<style lang="scss">
  @import "./../public/style/common.scss";
  @import "../public/style/mixin.scss";
  #app{
    @include wh(100%,100%);
    background: #ffffff;
    /deep/ .van-loading{
      text-align: center;
      .van-loading__spinner{
        margin-top: px2rem(400px);
      }
    }

  }
</style>
