<template>
    <div class="MyScore">
        <div class="box">
            <base-title></base-title>
            <div class="top-box">
                <h1>{{myscore}}</h1>
                <h3>已获得学分</h3>
                <p>学分>2000可领取xxxx证书</p>
            </div>
            <div class="list-box">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        :error.sync="error"
                        error-text="请求失败，点击重新加载"
                        @load="onLoad"
                >
                    <van-cell-group v-for="(item,index) in list" :key="index">
                        <van-cell
                                :key="item"
                                :title="item.reason"
                                :value="'+'+item.score"
                        />
                    </van-cell-group>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import {apiscore} from '../../api/api'
    export default {
        name: "MyScore",
        data () {
            return {
                myscore: 0,
                list: [],
                scoreList: [],
                finished: false,
                error: false,
                loading: false,
                index: 0,
                totalcount: 0
            }
        },
        mounted(){
            this.initPage();
        },
        methods: {
            onLoad() {
                // 异步更新数据
                var self = this;
                setTimeout(() => {
                    for (let i = 0; i < self.scoreList[self.index].length; i++) {
                        const item = self.scoreList[self.index][i];
                        self.list.push(item);
                    }
                    // 加载状态结束
                    self.load = false;
                    // 数据全部加载完成
                    if (self.list.length >= self.totalcount) {
                        self.finished = true;
                    }
                    self.index += 1;
                }, 1000)
            },
            groupList(list){
                var result = [];
                for(var i=0;i<list.length;i+=5){
                    result.push(list.slice(i,i+5));
                }
                return result;
            },
            initPage () {
                apiscore({userid:1}).then( res => {
                    var data = res;
                    for (let i = 0; i < data.list.length; i++) {
                        const argument = data.list[i];
                        this.myscore+=argument.score;
                    }
                    this.scoreList = this.groupList(data.list);
                    this.onLoad();
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../public/style/mixin.scss";
    .MyScore{
        background: #eeeeee;
        .top-box{
            background: #ffffff;
            margin: px2rem(40px) px2rem(20px);
            padding: px2rem(25px);
            text-align: center;
            h1{
                @include font(px2rem(40px),px2rem(80px));
                font-weight: bolder;
            }
            h3{
                @include font(px2rem(32px),px2rem(50px));
                text-align: center;
            }
            p{
                @include font(px2rem(28px),px2rem(40px));
            }
        }
        .list-box{
            background: #ffffff;
        }
    }

</style>
