<template>
    <div class="Register">
        <div class="logo-box">
            <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="onchange" multiple :max-count="1"/>
        </div>
        <div class="">
            <div class="input-box">
                <van-cell-group>
                    <van-field v-model="username" required clearable label="用户名" left-icon="contact" placeholder="请输入用户名" />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="password2" type="password" label="确认密码" placeholder="请再次输入密码" required/>
                </van-cell-group>
                <van-cell title="性别" value="" />
                <van-radio-group v-model="sex">
                    <van-cell-group>
                        <van-cell title="男" clickable @click="sex = '1'">
                            <van-radio slot="right-icon" name="1" />
                        </van-cell>
                        <van-cell title="女" clickable @click="sex = '2'">
                            <van-radio slot="right-icon" name="2" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
                <van-cell-group>
                    <van-field v-model="userphone" required label="手机号" placeholder="请输入手机号" error-message=""/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="sms" required center clearable label="短信验证码" placeholder="请输入短信验证码">
                        <van-button slot="button" size="small" type="primary" @click="sendSMS()" v-if="count==60||count==0">{{count==60?'发送验证码':'再次发送'}}</van-button>
                        <van-button slot="button" size="small" type="primary" disabled v-else>{{count+'s后重新发送'}}</van-button>
                    </van-field>
                </van-cell-group>
            </div>
            <div class="btn-box">
                <van-button class="btn" type="info" @click="register_click()">注册</van-button>
            </div>
            <div class="toLogin clear">
                已有账号？
                <router-link tag="span" class="right" to="/login">去登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {apiGetCode,apiAddUser} from '../api/api'
    export default {
        name: "Register",
        data (){
            return {
                fileList:[],
                username:'',
                password:'',
                password2:'',
                userphone:'',
                sms:'',
                sex:'',
                count: 60,
                imgObj: {}
            }
        },
        methods:{
            ...mapMutations({'save_userinfo':'SAVE_USERNAME','set_token': 'SET_TOKEN'}),
            beforeRead(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    console.log('请上传 jpg || png 格式图片');
                    return false;
                }
                return true;
            },
            // 文件上传
            onchange (){
                var self = this;
                let formData = new FormData;
                formData.append('file',this.fileList[0].file)
                const instance= axios.create({
                    withCredentials: true
                })
                instance.post('/api/study/upload', formData)
                    .then(res => {
                        console.log(res)
                        self.imgObj.path = res.data.data.path;
                        self.imgObj.id = res.data.data.id;
                    })
            },
            register_click(){
                var self = this;
                if(this.username == ''||this.password == ''||this.password2 == ''||this.userphone == ''||this.sms == ''){
                    this.$notify({ type: 'warning', message: '必填项不能为空！',duration: 2000 });
                    return false;
                } else {
                    var sendData = {};
                    sendData.userphoto = self.imgObj.path;
                    sendData.userphotoid = self.imgObj.id;
                    sendData.username=this.username;
                    sendData.password=this.password;
                    sendData.password2=this.password2;
                    if(validatePhoneTwo(this.userphone)){
                        sendData.userphone=this.userphone;
                    }else {
                        return false
                    }
                    sendData.sms=this.sms;
                    sendData.sex=this.sex;
                    apiAddUser(sendData).then( (res) => {
                        if(res.code == 0) {
                            this.$notify({ type: 'primary', message: '注册成功，将为您自动登录', duration: 2000 });
                            this.set_token(res.token);
                            this.save_userinfo(this.username);
                            setTimeout( () =>{
                                self.$router.push({path:'/myinfo'});
                            },2000)
                        } else {
                            this.$notify({ type: 'danger', message: res.msg, duration: 2000 });
                        }
                    })
                }
            },
            sendSMS(){
                apiGetCode({userphone:this.userphone}).then( res => {
                    if(res.code == 0){
                        if(this.count == 60){
                            this.cutCount();
                        } else if (this.count ==0){
                            this.count = 59;
                            this.cutCount();
                        }
                    } else {
                        this.$notify({ type: 'danger', message: res.msg, duration: 2000 });
                    }
                })
            },
            cutCount(){
                var self = this;
                setTimeout( function () {
                    self.count --;
                    if(self.count>0){
                        self.cutCount();
                    }
                },1000);
            }
        }
    }
    function validatePhoneTwo(rule, value) {
        const reg =/^[1][3-9][0-9]{9}$/;
        if (value == '' || value == undefined || value == null) {
            return true;
        } else {
            if ((!reg.test(value)) && value != '') {
                console.log('请输入正确的电话号码');
                return false;
            } else {
                return true;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/style/mixin.scss";
    .logo-box{
        text-align: center;
        padding: px2rem(60px) 0;
        /deep/ .van-image{
            border-radius: 50%!important;
        }
    }
    .btn-box{
        width: 90%;
        height: px2rem(80px);
        margin: px2rem(40px) auto 0 auto;
        button{
            width: 100%;
            height: px2rem(80px);
            line-height: px2rem(80px);
        }
    }
    .toLogin{
        width: 90%;
        margin: 0 auto;
        line-height: px2rem(66px);
        height: px2rem(66px);
        color: #999999;
        font-size: px2rem(24px);
        span{
            vertical-align: top;
            text-decoration: underline;
        }
    }

</style>
