<template>
    <div class="HomeWork">
        <base-title></base-title>
        <div class="top-box clear">
            <h2 class="left">当前进度</h2>
            <van-circle class="right" v-model="currentRate" :text="currentRate+ '%'" :rate="rate" :speed="100" size="40" layer-color="#eeeeee"/>
        </div>
        <div class="subject-box">
            <p class="title">{{list.num + '.' + list.problem}}</p>
            <ul class="anser-ul">
                <li>
                    <van-radio-group v-model="list.my_answer">
                        <van-cell-group v-for="item in list.list" :key="item.id">
                            <van-cell :border="borderFlag" title-class="li-title" :title="item.id+'.'+item.text" clickable @click="list.my_answer = item.id">
                                <van-radio slot="right-icon" :name="item.id" disabled v-if="showAnswer"/>
                                <van-radio slot="right-icon" :name="item.id" v-else/>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </li>
            </ul>
            <div class="btn-box">
                <div class="btn-next" v-if="list.num<subject.length"><van-button v-if="list.num!=1" type="info" @click="nextSubject('prev',list.num)">上一题</van-button> <van-button type="primary" @click="nextSubject('next',list.num)">下一题</van-button></div>
                <div class="btn-submit" v-else><van-button type="info" v-if="list.num!=1" @click="nextSubject('prev',list.num)">上一题</van-button> <van-button v-if="!showAnswer" type="primary" @click="submitAnswer()">提交</van-button></div>
            </div>
            <div class="answer-box" v-if="showAnswer">
                <p :class="list.my_answer == list.true_answer?'true':'error'">我的答案：{{list.my_answer}}</p>
                <div class="true-answer-box">
                    <p>正确答案：{{list.true_answer}}</p>
                    <p>{{list.reason}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {apigetSubject,apipostAnswer} from '../../api/api'
    export default {
        name: "HomeWork",
        data () {
            return {
                borderFlag: false,
                currentRate: 0,
                rate: 0,
                subject: [],
                list: {},
                radio: '',
                showAnswer: false
            }
        },
        mounted() {
            apigetSubject({type:1}).then( res => {
                if(res.code == 0){
                    var data = res.list;
                    this.subject = data;
                    this.list = this.subject[0];
                    this.getRate();
                }
            });
        },
        methods: {
            getRate () {
                let number =0;
                for (let i = 0; i < this.subject.length; i++) {
                    const item = this.subject[i];
                    if (item.my_answer != null && item.my_answer != '') {
                        number += 1;
                    } else{
                        number = 0;
                    }
                }
                this.currentRate = (number/this.subject.length)*100;
            },
            nextSubject (type,num) {
                console.log(type)
                if(type == 'next'){
                    if(this.subject[num-1].answer == ''){
                        this.$notify({type: "warning", message:'请对第'+num+'小题作答！'});
                        return false;
                    }
                    this.list = this.subject[num];
                } else {
                    this.list = this.subject[num-2];
                }
            },
            submitAnswer () {
                var answerList = [];
                for (let i = 0; i < this.subject.length; i++) {
                    const item = this.subject[i];
                    if(item.my_answer !=''){
                        answerList.push(item.my_answer);
                    }
                }
                if(answerList.length == this.subject.length){
                    apipostAnswer({answerList:answerList,id: 1}).then( res => {
                        if(res.code == 0){
                            this.showAnswer = true;
                        }
                    })

                } else {
                    this.$notify({type: "warning", message:'请对第'+this.subject.length+'小题作答！'});
                }
            }
        },
        computed: {
            newRate () {
                var numBer =0;
                for (let i = 0; i < this.subject.length; i++) {
                    const item = this.subject[i];
                    if (item.my_answer !='' && item.my_answer !=null) {
                        if(this.numBer != item.num){
                            numBer = item.num;
                        }
                    }
                }
                return (numBer/this.subject.length)*100;
            }
        },
        watch: {
            newRate(val) {
                this.rate += (val-this.rate);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../public/style/mixin.scss";
    .HomeWork{
        background: #eeeeee;
        min-height: 100%;
        .top-box{
            background: #ffffff;
            padding: px2rem(10px) px2rem(20px);
            h2{
                line-height: 40px;
                height: 40px;
                font-size: px2rem(40px);
                font-weight: bolder;
            }
        }
        .subject-box{
            .title{
                padding: px2rem(40px);
                @include font(px2rem(28px), px2rem(70px))
            }
            .li-title{
                max-width: px2rem(646px);
            }
            .btn-box{
                margin-top: px2rem(40px);
                text-align: center;
                button{
                    @include wh(px2rem(300px),px2rem(80px));
                    margin: px2rem(40px) px2rem(10px);
                    line-height: px2rem(80px);
                }
            }
            .answer-box{
                padding: px2rem(40px);
                background: #ffffff;
                p{
                    @include font(px2rem(28px),px2rem(45px));
                    padding: px2rem(10px) 0;
                }
                .error{
                    color: #ff0547;
                }
                .true{
                    color: #2f9a1c;
                }
            }
        }
    }
</style>
