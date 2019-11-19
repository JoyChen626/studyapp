<template>
    <div class="BottomNav">
        <div class="full-box"></div>
        <div class="nav-box">
            <van-tabbar v-model="current">
                <van-tabbar-item :icon="item.icon" v-for="item in navList" :key="item.id" @click="nav_link(item)">{{item.name}}</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BottomNav",
        data () {
            return {
                current: 0,
                navList: [
                    {id: 1, name:'商学院', to: '/home', icon: 'home-o'},
                    {id: 2, name:'私家课', to: '/privatelessons', icon: 'search'},
                    {id: 3, name:'我的', to: '/myinfo', icon: 'friends-o'}
                ]
            }
        },
        methods: {
            nav_link (item) {
                this.$router.push({path:item.to});
            }
        },
        computed: {
            currentActive () {
                return this.$route.meta.routeCode;
            }
        },
        watch: {
            currentActive(val) {
                this.current = val;
                console.log(val)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/style/mixin.scss";
    .BottomNav{
        .full-box{
            height: 50px;
        }
        .nav-box{
            position: fixed;
            bottom: 0;
            left: 0;
        }
    }

</style>
