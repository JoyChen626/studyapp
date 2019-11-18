<template>
    <div class="Title">
        <div class="full-box"></div>
        <div class="top-box clear">
            <van-nav-bar :title="title" @click-left="onClickLeft" @click-right="onClickRight" :right-text="rightText" left-arrow></van-nav-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props:{
            rightText: {type: String,default: ''}
        },
        data () {
            return {
                title: this.$route.meta.title
            }
        },
        methods: {
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin.scss";
    .full-box{height: px2rem(80px)}
    .top-box{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        @include wh(100%,px2rem(80px));
        background: #2f9a1c;
        /deep/ .van-nav-bar{
            @include wh(100%,px2rem(80px));
            background: #2f9a1c;
            .van-icon {
                color: #ffffff;
            }
            .van-nav-bar__text{
                color: #ffffff;
            }
            .van-nav-bar__title{
                height: px2rem(80px);
                line-height: px2rem(80px);
                color: #ffffff;
            }
        }
    }
</style>
