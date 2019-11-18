<template>
    <div class="MyInfo">
        <div class="top-box">
            <div class="top clear center">
                <div class="img-box left">
                    <van-image width="100%" height="100%" fit="cover" round :src="userphoto" >
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </div>
                <div class="info-box left">
                    <h3>{{username}}</h3>
                    <p v-if="myphone != ''">{{myphone}}</p>
                    <p v-else>绑定手机号></p>
                </div>
            </div>
            <div class="bottom">
                <ul class="clear">
                    <li>
                        <div>
                            <h2>{{entrance?'开始学习':'报名入学'}}</h2>
                            <p>高见NBA</p>
                        </div>
                    </li>
                    <li>
                        <router-link tag="div" to="myscore">
                            <h2>{{entrance?score:0}}</h2>
                            <p>我的分数</p>
                        </router-link>
                    </li>
                </ul>
                <div class="spread-box clear">
                    <span class="left">推广给好友赚学费，边学边赚~</span>
                    <span class="right">></span>
                </div>
            </div>
        </div>
        <div class="bottom-box">
            <div class="van-cell-box">
                <van-cell-group>
                    <van-cell title="购买订单" value="" is-link to="myorder" />
                    <van-cell title="毕业证书" value="" is-link to="certificate" />
                </van-cell-group>
            </div>
            <div class="van-cell-box">
                <van-cell-group>
                    <van-cell title="推广返现" value="" is-link to="spread" />
                    <van-cell title="联系电话" value="13756432678" is-link to="index" />
                    <van-cell title="关于我们" value="" is-link to="aboutours" />
                </van-cell-group>
            </div>
        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "MyInfo",
        //components: {bottomNav},
        data () {
            return {
                username: '',
                userphoto: '',
                myphone: '',
                entrance: false,
                score: 0
            }
        },
        mounted () {
            this.username = this.name;
            this.$axios.get('/study/getMyData').then( res => {
                var info = res.data;
                if(info.code == 0) {
                    this.userphoto = info.userphoto;
                    this.myphone = info.myphone;
                    this.entrance = info.entrance;
                    this.score = info.score;
                }
            })
        },
        computed: {
            ...mapState({name: state => state.username})
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin.scss";
    .MyInfo{
        background: #eeeeee;
        height: 100%;
        .top-box{
            padding: px2rem(40px) 0;
            .top{
                display: flex;
                .img-box{
                    @include wh(px2rem(200px),px2rem(200px));
                    margin: px2rem(20px);
                }
                .info-box{
                    flex: 1;
                    margin: px2rem(20px) 0;
                    h3{
                        @include font(px2rem(44px),px2rem(60px));
                        font-weight: bolder;
                        color: #999999;
                        margin-top: px2rem(40px);
                    }
                    p{
                        @include font(px2rem(32px),px2rem(60px));
                        margin-bottom: px2rem(40px);
                    }
                }

            }
            .bottom{
                ul{
                    li{
                        float: left;
                        width: 50%;
                        div{
                            background: #ffffff;
                            @include borderRadius(px2rem(8px));
                            padding: px2rem(20px) 0;
                            text-align: center;
                            &:nth-child(1){
                                margin-left: px2rem(40px);
                                margin-right: px2rem(20px);
                            }
                            &:nth-child(2){
                                margin-left: px2rem(20px);
                                margin-right: px2rem(40px);
                            }
                            h2{
                                @include font(px2rem(38px),px2rem(60px));
                                font-weight: bolder;
                            }
                            p{
                                @include font(px2rem(32px),px2rem(40px));
                                color: #999999;
                            }
                        }
                    }
                }
                .spread-box{
                    margin: px2rem(40px) px2rem(40px) 0 px2rem(40px);
                    background: #3190e8;
                    @include borderRadius(px2rem(8px));
                    span{
                        @include font(px2rem(40px),px2rem(50px));
                        padding: px2rem(10px) px2rem(20px);
                        color: #ffffff;
                    }
                }
            }
        }
        .bottom-box{
            .van-cell-box{
                margin-bottom: px2rem(20px);
            }
        }
    }

</style>
