<template>
    <div class="MyOrder">
        <base-title :rightText="rightTwxt"></base-title>
        <goods-card></goods-card>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
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
                this.$axios.get('/study/my/getOrder').then(res => {
                    if(res.data.code == 0){
                        this.save_order_list(res.data.list);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/mixin";
    .MyOrder{
        background: #eeeeee;
        min-height: 100%;
    }
</style>
