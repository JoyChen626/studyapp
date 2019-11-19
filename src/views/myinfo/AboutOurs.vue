<template>
    <div class="AboutOurs">
        <base-title></base-title>
        <div class="box">
            <div class="logo-box">
                <van-image round width="100%" height="100%" :src="logoImg"/>
            </div>
            <h4>{{title}}</h4>
            <div class="detail-box">
                <p>{{detail}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutOurs",
        data () {
            return {
                logoImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                title: '沟通沟通过',
                detail: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或'
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../public/style/mixin.scss";
    .AboutOurs{
        .box{
            padding-top: px2rem(200px);
        }
        .logo-box{
            @include wh(px2rem(160px),px2rem(160px));
            border-radius: 50%;
            margin: 0 auto;
        }
        h4{
            @include font(px2rem(36px),px2rem(60px));
            font-weight: bolder;
            text-align: center;
        }
        .detail-box{
            padding: px2rem(20px) px2rem(40px);
            p{
                text-indent: 2em;
                @include font(px2rem(32px),px2rem(60px));
                color: #999999;
            }
        }
    }
</style>
