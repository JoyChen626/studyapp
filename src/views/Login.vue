<template>
    <div class="Login">
        <div class="logo-box">
            <van-image width="10rem" height="10rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="center">
            <div class="input-box">
                <van-cell-group>
                    <van-field v-model="username" required clearable label="用户名" left-icon="contact" placeholder="请输入用户名" />
                    <van-field v-model="password" :right-icon="showPW?'eye':'closed-eye'" :type="showPW?'text':'password'" label="密码" placeholder="请输入密码" required  @click="right_icon_click()"/>
                </van-cell-group>
            </div>
            <div class="btn-box">
                <van-button class="btn" type="info" @click="login_click()">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    export default {
        name: "Login",
        data () {
            return {
                username: '',
                password: '',
                showPW: true,
                btnClock: false
            }
        },
        methods: {
            right_icon_click () {
                this.showPW = !this.showPW;
            },
            ...mapMutations({'save_userinfo':'SAVE_USERNAME','set_token': 'SET_TOKEN'}),
            login_click () {
                if(this.btnClock){return false}
                if (this.username == '' && this.password == '') {
                    this.$notify({ type: 'warning', message: '用户名、密码不能为空！',duration: 2000 });
                    return false;
                } else if(this.username == ''){
                    this.$notify({ type: 'warning', message: '用户名不能为空！',duration: 2000 });
                    return false;
                } else if (this.password == '') {
                    this.$notify({ type: 'warning', message: '密码不能为空！',duration: 2000 });
                    return false;
                }
                this.$axios.post('/study/login').then(res => {
                    var data = res.data;
                    if (data.code == 0) {
                        this.btnClock = true;
                        this.set_token(res.token);
                        this.save_userinfo(this.username);
                        this.$router.push({path: '/home'});
                    } else {
                        this.$notify({ type: 'danger', message: data.msg, duration: 2000 });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin.scss";
    .Login{
        .logo-box{
            text-align: center;
            padding: px2rem(80px) 0;
        }
        .input-box{
            margin-bottom: px2rem(40px);
        }
        .btn-box{
            text-align: center;
            .btn{
                @include wh(100%,px2rem(80px));
                line-height: px2rem(80px);
            }
        }
    }
</style>
