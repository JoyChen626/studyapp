<template>
    <div class="Home">
        <div class="center">
            <div class="banner-box">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="image in images" :key="image.imgId">
                        <img v-lazy="image.imgUrl" />
                        <template v-slot:error>加载失败</template>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="characteristic-box">
                <van-row v-if="characteristic.length>0">
                    <van-col span="16">
                        <div class="img-box img-box1">
                            <van-image width="100%" height="100%" fit="fill" :src="characteristic[1].imgUrl" >
                                <template v-slot:error>加载失败</template>
                            </van-image>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <van-row>
                            <van-col span="24">
                                <div class="img-box img-box2">
                                    <van-image width="100%" height="100%" fit="fill" :src="characteristic[2].imgUrl" >
                                        <template v-slot:error>加载失败</template>
                                    </van-image>
                                </div>
                            </van-col>
                            <van-col span="24">
                                <div class="img-box img-box3">
                                    <van-image width="100%" height="100%" fit="fill" :src="characteristic[3].imgUrl" >
                                        <template v-slot:error>加载失败</template>
                                    </van-image>
                                </div>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </div>
            <div class="part-box">
                <div class="part part1">
                    <div class="part-title">
                        <h3 class="clear">精品课堂<span class="right">查看更多></span></h3>
                    </div>
                    <div class="content-box">
                        <ul class="class-ul clear">
                            <li class="class-li left" v-for="item in boutiqueClass" :key="item.id">
                                <div class="img-box">
                                    <van-image width="100%" height="100%" fit="fill" :src="item.classImg" >
                                        <template v-slot:error>加载失败</template>
                                    </van-image>
                                    <van-icon color="#ffffff" size="1.25rem" class="icon-play" name="play" />
                                    <span class="time">{{item.time}}</span>
                                </div>
                                <p class="video-title ellipsis">{{item.classTitle}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="adsense-box">
                        <van-image width="100%" height="100%" fit="fill" :src="adsense" >
                            <template v-slot:error>加载失败</template>
                        </van-image>
                    </div>
                </div>
                <div class="part part2">
                    <div class="part-title">
                        <h3 class="clear">NBA选修课<span class="right">查看更多></span></h3>
                    </div>
                    <div class="content-box">
                        <ul class="class-ul">
                            <li class="class-li" v-for="item in NBAClass" :key="item.id">
                                <van-row>
                                    <van-col span="8">
                                        <div class="img-box">
                                            <van-image width="100%" height="100%" fit="fill" :src="item.img" >
                                                <template v-slot:error>加载失败</template>
                                            </van-image>
                                        </div>
                                    </van-col>
                                    <van-col span="16">
                                        <div class="info-box">
                                            <h4 class="info-title">{{item.title}}</h4>
                                            <p class="info-detail ellipsis">{{item.detail}}</p>
                                            <div class="other-info clear"><span class="money left">￥{{item.money}}</span> <span class="see right">{{item.study}}学习</span></div>
                                        </div>
                                    </van-col>
                                </van-row>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="part part3">
                    <div class="part-title">
                        <h3 class="clear">名师介绍<span class="right">查看更多></span></h3>
                    </div>
                    <div class="content-box">
                        <ul class="class-ul">
                            <li class="class-li" v-for="item in harvests" :key="item.id">
                                <div class="item-box">
                                    <div class="item-top clear">
                                        <div class="photo-box left">
                                            <van-image width="100%" height="100%" fit="cover" round :src="item.photo" >
                                                <template v-slot:error>加载失败</template>
                                            </van-image>
                                        </div>
                                        <div class="user-info left">
                                            <h2 class="name">{{item.name}}</h2>
                                            <div class="clear">
                                                <span class="identity left">{{item.company}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.position}}</span>
                                            </div>
                                            <div>
                                                <span class="class-room">{{item.classroom}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-bottom">
                                        <h2>{{item.title}}</h2>
                                        <p>{{item.detail}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
    import {apigetHomeData} from '../api/api'
    export default {
        name: "Home",
        data () {
            return {
                images: [],
                characteristic: {},
                boutiqueClass: [],
                adsense: '',
                NBAClass: [],
                harvests: []
            }
        },
        mounted () {
            this.initHome();
        },
        methods: {
            initHome () {
                apigetHomeData({}).then( res => {
                    const data = res;
                    this.images = data.banner;
                    this.characteristic = data.characteristic;
                    this.boutiqueClass = data.b_class;
                    this.adsense = data.adsense;
                    this.NBAClass = data.nba_class;
                    this.harvests = data.harvests;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/style/mixin.scss";
    .Home{
        padding-top: px2rem(20px);
        background: #eeeeee;
        /deep/ .van-swipe{
            @include wh(100%,100%);
            img{
                width: 100%;
            }
        }
        .banner-box{
            @include wh(100%,px2rem(300px));
            overflow: hidden;
        }
        .characteristic-box{
            .img-box1{
                margin: px2rem(20px) 0;
                height: px2rem(240px);
                margin-right: px2rem(20px);
            }
            .img-box2{
                height: px2rem(110px);
                margin-top: px2rem(20px);
                margin-bottom: px2rem(10px);
            }
            .img-box3{
                height: px2rem(110px);
                margin-top: px2rem(10px);
                margin-bottom: px2rem(20px);
            }
        }
        .part-box{
            .part{
                .part-title{
                    h3{
                        padding-left: px2rem(8px);
                        border-left: px2rem(6px) solid #2f9a1c;
                        @include font(px2rem(39px),px2rem(48px));
                        font-weight: bolder;
                        span{
                            color: #999999;
                            @include font(px2rem(24px),px2rem(48px));
                            font-weight: normal;
                        }
                    }
                }
            }
            .part1{
                .content-box{
                    .class-ul{
                        margin-top: px2rem(20px);
                        .class-li{
                            @include wh(50%,auto);
                            .img-box{
                                height: px2rem(230px);
                                position: relative;
                                .icon-play{
                                    position: absolute;
                                    left: px2rem(20px);
                                    bottom: px2rem(20px);
                                }
                                .time{
                                    @include font(px2rem(24px),px2rem(40px));
                                    color: #ffffff;
                                    position: absolute;
                                    right: px2rem(20px);
                                    bottom: px2rem(20px);
                                }
                            }
                            .video-title{
                                @include font(px2rem(32px),px2rem(60px));
                                font-weight: bolder;
                            }
                            &:nth-child(1) .img-box,&:nth-child(3) .img-box{
                                margin-right: px2rem(20px);
                            }
                        }
                    }
                }
                .adsense-box{
                    @include wh(auto,px2rem(250px));
                    @include borderRadius(px2rem(16px));
                    border: px2rem(4px) solid #2f9a1c;
                    margin: px2rem(20px) 0;
                }
            }
            .part2{
                .content-box{
                    .class-ul{
                        margin-bottom: px2rem(20px);
                        .class-li{
                            padding: px2rem(20px) 0;
                            border-bottom: 1px dotted #e4e4e4;
                            .img-box{
                                height: px2rem(140px);
                                margin-right: px2rem(20px);
                            }
                            .info-box{
                                .info-title{
                                    @include font(px2rem(32px),px2rem(60px));
                                    font-weight: bolder;
                                }
                                .info-detail{
                                    @include font(px2rem(28px),px2rem(30px));
                                    margin-bottom: px2rem(10px);
                                    color: #555555;
                                }
                                .other-info{
                                    span{
                                        @include font(px2rem(24px),px2rem(40px));
                                        color: #999999;
                                    }
                                    .money{
                                        color: lightsalmon;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .part3{
                .content-box{
                    .class-ul{
                        margin-top: px2rem(20px);
                        .class-li{
                            background: #ffffff;
                            @include borderRadius(px2rem(8px));
                            margin-bottom: px2rem(20px);
                            .item-top{
                                display: flex;
                                padding: px2rem(20px);
                                border-bottom: 1px dotted #e4e4e4;
                                .photo-box{
                                    @include wh(px2rem(120px),px2rem(120px));
                                    margin: px2rem(20px);
                                    margin-left: 0;
                                }
                                .user-info{
                                    flex: 1;
                                    padding: px2rem(30px) 0;
                                    .name{
                                        @include font(px2rem(32px),px2rem(40px));
                                        font-weight: bolder;
                                    }
                                    .identity,.class-room{
                                        height: px2rem(30px);
                                        @include font(px2rem(24px),px2rem(30px));
                                        color: #999999;
                                    }
                                }
                            }
                            .item-bottom{
                                padding: px2rem(20px);
                                h2{
                                    @include font(px2rem(32px),px2rem(60px));
                                    font-weight: bolder;
                                }
                                p{
                                    @include font(px2rem(24px),px2rem(40px));
                                    @include ellipsis(2);
                                    color: #999999;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


</style>
