<template>
    <div class="GoodsCard">
        <div class="box" v-if="list.length>0">
            <van-list
                    v-model="load"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <van-checkbox v-for="(item,index) in list" :key="index+1" :name="item.key">
                        <van-card
                                :num="item.num"
                                :price="item.price"
                                :origin-price="item.origin_price"
                                :desc="item.desc"
                                :title="item.title"
                                :thumb="item.thumb"
                        >
                            <div slot="tags">
                                <van-tag plain type="danger">标签</van-tag>
                                <van-tag plain type="danger">标签</van-tag>
                            </div>
                            <div slot="footer">
                                <van-button size="mini">退款</van-button>
                                <van-button size="mini">删除</van-button>
                            </div>
                        </van-card>
                    </van-checkbox>
                </van-checkbox-group>
            </van-list>
        </div>
        <div class="no-data" v-if="list.length==0">暂无数据！</div>
        <div class="btn-box">
            <van-button type="primary" size="small" @click="checkAll">{{checkAllOrder?'反选':'全选'}}</van-button>
            <van-button type="info" size="small" @click="deleteAll">删除</van-button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "GoodsCard",
        data() {
            return {
                totalcount: 30,
                goodsList: [],
                index: 0,
                list: [],
                load: false,
                finished: false,
                result: [],
                checkAllOrder: false
            }
        },
        methods: {
            initPage (list) {
                this.goodsList = list;
                this.totalcount = list.length;
                this.goodsList = this.groupList(this.goodsList);
                this.onLoad();
            },
            onLoad() {
                // 异步更新数据
                var self = this;
                setTimeout(() => {
                    for (let i = 0; i < self.goodsList[self.index].length; i++) {
                        const item = self.goodsList[self.index][i];
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
            checkAll() {
                this.checkAllOrder = !this.checkAllOrder;
                if(this.checkAllOrder){
                    this.$refs.checkboxGroup.toggleAll();
                } else {
                    this.$refs.checkboxGroup.toggleAll(true);
                }
            },
            deleteAll() {
                for (let i = 0; i < this.list.length; i++) {
                    if(this.result.indexOf(this.list[i].key)>=0){
                        this.list.splice(i,1);
                        i-=1;
                        console.log(this.list);
                    }
                }
            }
        },
        computed: {
            ...mapState({'get_my_list': 'myOrderList'})
        },
        watch: {
            get_my_list(list) {
                this.initPage(list);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin.scss";
    .GoodsCard{
        background: #ffffff;
        .box{
            margin: px2rem(20px) 0;
        }
        .no-data{
            @include font(px2rem(48px),px2rem(180px));
            color: #444444;
            font-weight: bolder;
            text-align: center;
        }
        .btn-box{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }
</style>
