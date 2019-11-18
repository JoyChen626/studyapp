<template>
    <div class="TeachingFeatures">
        <base-title></base-title>
        <div class="banner-box">
            <img :src="bannerImg" alt="">
<!--            <sapn>分享最高赚￥19.9</sapn>-->
        </div>
        <div class="procedure-box">
            <ul class="">
                <li class="" v-for="(item,index) in procedureList" :key="index+1">
                    <span class="top-right-xian"></span>
                    <div class="right-xian">
                        <span class="up-xian"></span>
                        <span class="down-xian"></span>
                    </div>
                    <span class="bottom-xian"></span>
                    <div class="left-xian">
                        <span class="up-xian"></span>
                        <span class="down-xian"></span>
                    </div>
                    <span class="top-xian"></span>
                    <span class="jian">></span>
                    <h2 class="title">{{item.name}}</h2>
                    <div class="detail">
                        <p>{{item.title}}</p>
                        <p v-for="(items,index) in item.list" :key="index+1">{{items}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detail-box">
            <h3 class="title">{{title}}</h3>
            <p class="detail" v-for="(item,index) in detail" :key="index+1">{{item}}</p>
        </div>
        <div class="pic-detail">
            <img :src="picDetail" alt="">
        </div>
        <div class="other-box">
            <div class="box">
                <van-grid :border="borderNone">
                    <van-grid-item icon="photo-o" text="文字" />
                    <van-grid-item icon="photo-o" text="文字" />
                    <van-grid-item icon="photo-o" text="文字" />
                    <van-grid-item icon="photo-o" text="文字" />
                </van-grid>
            </div>
        </div>
        <div class="bottom-box">
            <div class="enter">enter -></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TeachingFeatures",
        data () {
            return {
                borderNone: false,
                bannerImg: '',
                procedureList: [],
                title:'',
                detail: [],
                picDetail:''
            }
        },
        mounted() {
            this.$axios.get('/study/my/teachFeatures').then( res => {
                var data = res.data;
                if(data.code == 0){
                    this.bannerImg = data.bannerImg;
                    this.procedureList = data.procedureList;
                    this.title = data.title;
                    this.detail = data.detail;
                    this.picDetail = data.picDetail;
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/mixin.scss";
    .TeachingFeatures{
        min-height: 100%;
        .banner-box{
            @include wh(100%,px2rem(300px));
        }
        .procedure-box{
            height: px2rem(842px);
            ul{
                padding: px2rem(27px);
                font-size: 0;
                text-align: center;
                li{
                    display: inline-block;
                    position: relative;
                    @include wh(px2rem(232px),px2rem(354px));
                    margin: px2rem(20px) 0;
                    span{
                        background: #3190e8;
                        position: absolute;
                    }
                    .top-right-xian{
                        @include wh(px2rem(16px),px2rem(4px));
                        top: 0;
                        right: px2rem(14px);
                    }
                    .right-xian{
                        .up-xian{
                            @include wh(px2rem(4px),px2rem(160px));
                            top: 0;
                            right: px2rem(14px);
                            transform: rotate(-10deg);
                        }
                        .down-xian{
                            @include wh(px2rem(4px),px2rem(200px));
                            top: px2rem(157px);
                            right: px2rem(16px);
                            transform: rotate(10deg);
                        }
                    }
                    .bottom-xian{
                        @include wh(px2rem(206px),px2rem(4px));
                        bottom: 0;
                        right: px2rem(32px);
                    }
                    .left-xian{
                        .up-xian{
                            @include wh(px2rem(4px),px2rem(160px));
                            top: 0;
                            left: px2rem(12px);
                            transform: rotate(-10deg);
                        }
                        .down-xian{
                            @include wh(px2rem(4px),px2rem(200px));
                            top: px2rem(156px);
                            left: px2rem(10px);
                            transform: rotate(10deg);
                        }
                    }
                    .top-xian{
                        @include wh(px2rem(180px),px2rem(4px));
                        top: 0;
                        left: 0;
                    }
                    .jian{
                        font-size: px2rem(40px);
                        background: transparent;
                        font-weight: bolder;
                        color: #3190e8;
                        top: px2rem(-28px);
                        right: px2rem(44px);
                    }
                    .title{
                        position: absolute;
                        @include font(px2rem(40px),px2rem(120px));
                        width: px2rem(120px);
                        height: px2rem(120px);
                        border-radius: 50%;
                        top: px2rem(20px);
                        left: 50%;
                        background:#3190e8;
                        color: white;
                        text-align: center;
                        font-weight: bolder;
                        margin-left: px2rem(-60px);
                    }
                    .detail{
                        position: absolute;
                        top: px2rem(152px);
                        left: 0;
                        width: 100%;
                        p{
                            font-size: px2rem(28px);
                            line-height: px2rem(40px);
                            text-align: center;
                            color: #444444;
                            &:nth-child(1){
                                color: #222222;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
        .detail-box{
            .title{
                text-align: center;
                @include font(px2rem(36px),px2rem(px2rem(70px)));
                font-weight: bolder;
            }
            .detail{
                text-align: center;
                @include font(px2rem(28px),px2rem(px2rem(60px)));
                padding: px2rem(10px) px2rem(20px);
            }
        }
        .other-box {
            background: white;
            .box{
                margin: 0 px2rem(20px);
                border-top: 1px dotted #eeeeee;
            }
        }
        .enter{
            height: px2rem(80px);
            line-height: px2rem(80px);
            background: #444444;
            color: #ffffff;
            text-align: center;
            font-size: px2rem(28px);
        }
    }
</style>
