<template>
    <div class="Certificate">
        <base-title></base-title>
        <div class="show-box" v-if="certificate!=''">
            <div class="img-box">
                <van-image @click="show_big_img()" width="100%" height="100%" fit="fill" :src="certificate"/>
            </div>
            <div class="btn-box">
                <van-buttom type="info">联系客服，邮寄证书</van-buttom>
            </div>
        </div>
        <div class="no-box" v-else style="line-height: 200px;text-align: center">无证书</div>
        <picture-preview></picture-preview>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "Certificate",
        data () {
            return {
                certificate:'https://img.yzcdn.cn/vant/cat.jpeg'
            }
        },
        methods: {
            ...mapMutations({'show_big_picture': 'CHANGE_PICTURE'}),
            show_big_img () {
                this.show_big_picture(true);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../public/style/mixin.scss";
    .img-box{
        padding: px2rem(30px) px2rem(20px) px2rem(10px) px2rem(20px);
        @include wh(100%,px2rem(1000px));
    }
    .btn-box{
        padding: px2rem(20px);
        buttom{
            @include wh(100%,px2rem(40px));
            line-height: px2rem(40px);
        }
    }

</style>
