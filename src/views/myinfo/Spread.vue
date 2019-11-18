<template>
    <div class="Spread">
        <base-title></base-title>
        <div class="top-box">
            <h1>624<span>元</span></h1>
            <div class="box clear">
                <div class="left left-box">
                    <p>账户余额</p>
                    <p>xxxxxxxxxx</p>
                </div>
                <div class="right right-box">
                    <span>提现</span>
                </div>
            </div>
        </div>
        <div class="spread-box clear">
            <div class="left img-box">
                <van-image width="100%" height="100%" fit="cover" src="" >
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
            <div class="info-box">
                <h2 class="ellipsis">分享推广得佣金</h2>
                <p>分享推广得佣金分享推广得佣金</p>
                <div class="clear"><span class="left money">分享推广得佣金：￥20</span><van-tag class="right" round plain type="success">分享</van-tag></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Spread"
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/mixin.scss";
    .Spread{
        background: #eeeeee;
        min-height: 100%;
        .top-box{
            margin: px2rem(20px);
            background: #ffffff;
            @include borderRadius(px2rem(8px));
            padding: px2rem(20px);
            h1{
                @include font(px2rem(100px),px2rem(180px));
                font-weight: bolder;
                text-align: right;
                position: relative;
                span{
                    position: absolute;
                    @include font(px2rem(32px),px2rem(40px));
                    color: #eeeeee;
                    bottom: px2rem(2px);
                    right: px2rem(10px);
                }
            }
            .box{
                margin-top: px2rem(10px);
                .left-box{
                    padding: px2rem(20px) 0;
                    p{
                        @include font(px2rem(32px),px2rem(40px))
                    }
                }
                .right-box{
                    span{
                        @include font(px2rem(28px),px2rem(28px));
                        color: #eeeeee;
                        padding: px2rem(5px) px2rem(10px);
                        border: 1px solid #eeeeee;
                        border-radius: px2rem(19px);
                    }
                }
            }
        }
        .spread-box{
            background: white;
            @include borderRadius(px2rem(8px));
            margin: 0 px2rem(20px);
            padding: px2rem(20px);
            .img-box{
                width: px2rem(260px);
                height: px2rem(180px);
            }
            .info-box{
                overflow: hidden;
                h2{
                    @include font(px2rem(38px),px2rem(60px));
                    font-weight: bolder;
                }
                p{
                    @include font(px2rem(28px),px2rem(40px));
                    @include ellipsis(2);
                }
                div{
                    span{
                        vertical-align: top;
                        font-size: px2rem(28px);
                    }
                    .momey{
                        color: #dddddd;
                        line-height: px2rem(44px);
                        height: px2rem(44px);
                    }
                }
            }
        }
    }

</style>
