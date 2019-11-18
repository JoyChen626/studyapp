<template>
    <div class="ClassRoom">
        <base-title></base-title>
        <div class="video-box">
            <video class="video" :src="videoUrl"></video>
        </div>
        <div class="info-box">
            <van-tabs v-model="active" @click="tabsClick()">
                <van-tab title="课程介绍" class="jianjie">
                    <div class="top clear">
                        <div class="img-box left">
                            <van-image width="100%" round height="100%" fit="fill" :src="jianjieInfo.photo" >
                                <template v-slot:error>加载失败</template>
                            </van-image>
                            <p>{{jianjieInfo.name}}</p>
                        </div>
                        <div class="title-box left">
                            <h4>{{jianjieInfo.title}}</h4>
                            <p class="clear"><span class="time left">时间：{{jianjieInfo.time}}</span><span class="play right">播放：{{jianjieInfo.play}}</span></p>
                        </div>
                    </div>
                    <div class="detail-box">
                        <p ref="details" :class="(pHeight>=260&&ellipsis)?'pellipsis':''" :style="{height:(pHeight>=260&&ellipsis?'130px':pHeight+'px')}">{{jianjieInfo.detail}}</p>
                        <div v-show="pHeight>=260" ref="btnClick" class="btn-click" @click="show_all_detail()">点击{{ellipsis?'展开详情':'收起详情'}}</div>
                        <div ref="kong" style="opacity: 0;height: 1px"></div>
                    </div>
                </van-tab>
                <van-tab title="课程目录" class="catalog">
                    <div class="list-box">
                        <van-cell-group v-for="(item,index) in catalogList" :key="index">
                            <van-cell :title="index+'.'+item.name" value="课后习题" value-class="done" v-if="item.done"/>
                            <van-cell :title="index+'.'+item.name" value="课后习题" value-class="do" v-else/>
                        </van-cell-group>
                    </div>
                </van-tab>
                <van-tab title="学习收获" class="comment">
                    <div class="comment-box">
                        <div class="to-comment">
                            <van-button plain hairline type="info" @click="to_comment()">细边框按钮</van-button>
                        </div>
                        <ul class="comment-ul" v-if="commentList.length>0">
                            <li v-for="(items,index1) in commentList" :key="index1">
                                <div class="top clear">
                                    <div class="img-box left">
                                        <van-image width="100%" height="100%" fit="fill" round :src="items.photo" >
                                            <template v-slot:error>加载失败</template>
                                        </van-image>
                                    </div>
                                    <h4 class="left">{{items.name}} <span class="vip" v-if="items.vip>0">vip{{items.vip}}</span></h4>
                                </div>
                                <div class="bottom clear">
                                    <div class="info">
                                        <p>{{items.detail}}</p>
                                        <div class="clear"><span class="time left">{{items.time}}</span><span class="right">items.zan</span><span class="zan right">{{items.flag?'U':'O'}}</span></div>
                                        <div class="bottom">
                                            <van-tag color="#f2826a" plain>评论({{items.list.length}})</van-tag>
                                            <van-tag color="#ff0025" class="btn-del" plain v-if="items.del">删除</van-tag>
                                        </div>
                                    </div>
                                    <div class="other-comment" v-if="items.list.length > 0">
                                        <div class="comment" v-for="(itemss,index2) in items.list" :key="index2">
                                            <div class="box">
                                                <div class="top clear">
                                                    <div class="name">{{itemss.name}}:</div>
                                                    <p>{{itemss.content}}</p>
                                                    <div class="zan clear"><span class="right">{{itemss.zan}}</span><span class="right">{{itemss.flag?'U':'O'}}</span></div>
                                                </div>
                                                <div class="bottom">
                                                    <van-tag color="#f2826a" plain>回复({{itemss.list.length}})</van-tag>
                                                    <van-tag color="#ff0025" class="btn-del" plain v-if="itemss.del">删除</van-tag>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <p v-else style="line-height: 80px;text-align: center">暂无评论~</p>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "ClassRoom",
        data () {
            return {
                videoUrl: '',
                active: 0,
                pHeight: null,
                ellipsis: true,
                jianjieInfo: {},
                catalogList: [{name: 'hhhhhhhh',id: 100,done: true},{name: 'hhhhhhhh',id: 100,done: false},{name: 'hhhhhhhh',id: 100,done: false},{name: 'hhhhhhhh',id: 100,done: false},],
                commentList: [],
                new_comment: '',
            }
        },
        methods: {
            to_comment () {
                this.$router.push({path:'/tocomment'});
            },
            ...mapMutations({'change_active':'SAVE_CLASS_ACTIVE'}),
            tabsClick(){
                this.change_active(this.active);
                if (this.active == 1) {
                    this.$axios.get('/study/classroom/getCommentList').then( res => {
                        if (res.data.code == 0) {
                            this.commentList = res.data.list;
                            if(this.new_comment != ''){
                                this.commentList.unshift(this.new_comment);
                            }
                        }
                    });
                } else {
                    this.$axios.get('/study/classroom/getVideoInfo').then( res => {
                        if (res.data.code == 0) {
                            this.jianjieInfo = res.data.info;
                        }
                        var self = this;
                        setTimeout(function(){
                            self.pHeight = self.$refs.kong.offsetTop - self.$refs.details.offsetTop;
                        },10);
                    });
                }
            },
            show_all_detail(){
                this.ellipsis = !this.ellipsis;
            }
        },
        mounted () {
            this.new_comment = this.$store.state.newComment;
            this.$axios.get('/study/classroom/getVideoUrl').then( res => {
                if (res.data.code == 0) {
                    this.videoUrl = res.data.videoUrl;
                }
            });
            this.active = Number(this.$store.state.classActive);
            this.tabsClick();
        },
        computed: {
            change_class_active () {
                return this.$store.state.classActive;
            }
        },
        watch: {
            change_class_active (status) {
                this.active = status;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin.scss";
    .ClassRoom{
        background: #eeeeee;
        .video-box{
            background: #ffffff;
            @include wh(100%,px2rem(300px));
            padding-bottom: px2rem(20px);
            margin-bottom: px2rem(20px);
            .video{
                @include wh(100%,px2rem(300px));
            }
        }
        .info-box{
            padding: px2rem(20px);
            .jianjie{
                padding: px2rem(20px) 0;
                .top{
                    .img-box{
                        @include wh(px2rem(200px),px2rem(200px));
                        position: relative;
                        overflow: hidden;
                        p{
                            width: 100%;
                            position: absolute;
                            bottom: 0;
                            @include font(px2rem(24px),px2rem(60px));
                            color: #ffffff;
                            font-weight: bolder;
                            text-align: center;
                            background: rgba(0,0,0,.4);
                        }
                    }
                    .title-box{
                        padding: px2rem(20px);
                        h4{
                            @include font(px2rem(32px),px2rem(80px));
                            font-weight: bolder;
                        }
                        p{
                            span{
                                vertical-align: top;
                                @include font(px2rem(24px),px2rem(80px));
                                color: #555555;
                            }
                        }
                    }
                }
                .detail-box{
                    padding: px2rem(20px);
                    p{
                        @include font(px2rem(24px),26px);
                        color: #999999;
                        transition: .8s;
                    }
                    .pellipsis{
                        @include ellipsis(10);
                        transition: .8s;
                    }
                    .btn-click{
                        @include font(px2rem(24px),px2rem(50px));
                        border: 1px solid #666666;
                        background: #ffffff;
                        text-align: center;
                        color: #666666;
                    }
                }
            }
            .catalog{
                .list-box{
                    padding-top: px2rem(10px);
                    height: px2rem(400px);
                    overflow: scroll;
                    .van-cell-group{
                        margin-bottom: px2rem(10px);
                        .done{
                            color: #2f9a1c;
                        }
                    }
                }
            }
            .comment{
                .comment-box{
                    position: relative;
                    .to-comment{
                        @include wh(100%,px2rem(120px));
                        padding: px2rem(20px) 0;
                        button{
                            @include wh(100%,px2rem(80px));
                            line-height: px2rem(80px);
                        }
                    }
                    ul{
                        position: absolute;
                        top: px2rem(120px);
                        left: 0;
                        width: 100%;
                        max-height: px2rem(680px);
                        overflow: scroll;
                        li{
                            padding: px2rem(20px);
                            border: 1px solid #eeeeee;
                            .top{
                                .img-box{
                                    @include wh(px2rem(80px),px2rem(80px));
                                }
                                h4{
                                    @include font(px2rem(28px),px2rem(60px));
                                    font-weight: bolder;
                                    margin-left: px2rem(20px);
                                    .vip{
                                        @include font(px2rem(24px),px2rem(60px));
                                        color: lightsalmon;
                                        vertical-align: top;
                                        margin-left: px2rem(10px);
                                    }
                                }

                            }
                            .bottom{
                                .info{
                                    border-bottom: 1px dotted #eeeeee;
                                    p{
                                        @include font(px2rem(24px),px2rem(48px));
                                        @include ellipsis(5);
                                    }
                                    div{
                                        span{
                                            @include font(px2rem(24px),px2rem(32px));
                                            color: #999999;
                                        }
                                        .zan{
                                            margin-right: px2rem(10px);
                                        }
                                    }
                                    .bottom{
                                        text-align: right;
                                        margin-bottom: px2rem(20px);
                                        span{
                                            @include font(px2rem(24px),px2rem(30px));
                                        }
                                        .btn-del{
                                            margin-left: px2rem(10px);
                                        }
                                    }
                                }
                                .other-comment{
                                    padding-top: px2rem(20px);
                                    .comment{
                                        border-bottom: 1px dotted #eeeeee;
                                        padding-bottom: px2rem(20px);
                                        .box{
                                            .top{
                                                position: relative;
                                                .name{
                                                    @include font(px2rem(24px),px2rem(40px));
                                                    font-weight: bolder;
                                                    color: lightsalmon;
                                                }
                                                p{
                                                    @include font(px2rem(24px),px2rem(30px));
                                                    color: #999999;
                                                }
                                                .zan{
                                                    position: absolute;
                                                    right: 0;
                                                    top: 0;
                                                    span{
                                                        @include font(px2rem(24px),px2rem(40px));
                                                        color: #999999;
                                                    }
                                                }
                                            }
                                            .bottom{
                                                text-align: right;
                                                span{
                                                    @include font(px2rem(24px),px2rem(30px));
                                                }
                                                .btn-del{
                                                    margin-left: px2rem(10px);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
