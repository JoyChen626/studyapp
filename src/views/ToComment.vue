<template>
    <div class="ToComment">
        <base-title></base-title>
        <div class="text-box">
            <van-field v-model="message" type="textarea" placeholder="请输入"/>
        </div>
        <div class="btn-box">
            <van-button type="primary" @click="publish()">发布</van-button>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "ToComment",
        data () {
            return {
                message: ''
            }
        },
        methods: {
            publish () {
                if(this.message == ''){
                    this.$notify({type: 'warning',message: ''});
                    return false;
                } else {
                    var obj ={};
                    obj.photo = 'https://img.yzcdn.cn/vant/cat.jpeg';
                    obj.name = this.$store.state.username;
                    obj.time = this.getTime();
                    obj.detail = this.message;
                    obj.del = true;
                    obj.flag = false;
                    obj.zan = 0;
                    obj.comment = 0;
                    obj.list = [];
                    this.save_comment(obj);
                }
            },
            ...mapMutations({'save_comment': 'SAVE_COMMENT'}),
            getTime () {
                var myTime = new Date();
                var year = myTime.getFullYear();
                var month = myTime.getMonth() + 1 < 10 ? '0' + myTime.getMonth() + 1 : myTime.getMonth() + 1;
                var day = myTime.getDate() < 10 ? '0' + myTime.getDate() : myTime.getDate();
                var hour = myTime.getHours() < 10 ? '0' + myTime.getHours() : myTime.getHours();
                var minu = myTime.getMinutes() < 10 ? '0' + myTime.getMinutes() : myTime.getMinutes();
                var sec = myTime.getSeconds() < 10 ? '0' + myTime.getSeconds() : myTime.getSeconds();
                var time = year + '/' + month + '/' + day + ' ' + hour + ':' + minu + ':' + sec;
                return time;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/style/mixin.scss";
    .ToComment{
        .text-box{
            margin: px2rem(20px);
            border: 1px solid #eeeeee;
            height: px2rem(1000px);
            textarea{
                height: 100%;
                @include font(px2rem(28px),px2rem(40px));
                color: #555555;
            }
        }
        .btn-box{
            padding: px2rem(20px);
            button{
                @include wh(100%,px2rem(80px));
                height: px2rem(80px);
            }
        }
    }

</style>
