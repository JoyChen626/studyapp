<template>
  <div class="ClassDetail">
    <div class="banner-box">
      <img src alt />
    </div>
    <div class="part part1">
      <h2 class="title"></h2>
    </div>
    <div class="part part2">
      <h2 class="title"></h2>
    </div>
    <div class="part part3">
      <h2 class="title"></h2>
    </div>
    <div class="part part4">
      <h2 class="title"></h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "ClassDetail"
};
</script>
<style scoped lang="scss">
  @import "../../../public/style/mixin.scss";
.ClassDetaill {
  min-height: 100%;
  .banner-box {
    @include wh(100%, px2rem(300px));
  }
  .part{
    .title{
      padding-left: px2rem(8px);
      border-left: px2rem(4px) solid #2f9a1c;
      font-weight: bolder;
      @include font(px2rem(32px),px2rem(60px));
    }
  }
}
</style>
