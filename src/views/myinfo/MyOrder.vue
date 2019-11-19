<template>
    <div class="MyOrder">
        <base-title :rightText="rightTwxt"></base-title>
        <goods-card></goods-card>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {apigetOrderInfo} from '../../api/api'
    export default {
        name: "MyOrder",
        data () {
            return {
                rightTwxt: '编辑'
            }
        },
        mounted () {
            this.initOrder();
        },
        methods: {
            ...mapMutations({'save_order_list': 'CHANGE_MYORDER'}),
            initOrder () {
                apigetOrderInfo({userid: 1,status:0}).then(res => {
                    if(res.code == 0){
                        this.save_order_list(res.list);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../public/style/mixin.scss";
    .MyOrder{
        background: #eeeeee;
        min-height: 100%;
    }
</style>
