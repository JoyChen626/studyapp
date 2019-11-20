<template>
    <div class="PicturePreview">
            <van-image-preview
                    v-model="show"
                    :images="images"
                    @close="closePic()"
            >
               <!-- <template v-slot:index>第{{ index }}页</template>-->
            </van-image-preview>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "PicturePreview",
        data () {
            return {
                show: false,
                index: 1,
                images: [
                    'https://img.yzcdn.cn/2.jpg',
                    'https://img.yzcdn.cn/2.jpg'
                ]
            }
        },
        methods: {
            ...mapMutations({'close_picture': 'CHANGE_PICTURE'}),
            closePic(){
                this.close_picture(false);
            }
        },
        computed: {
            picStatus () {
                return this.$store.state.showBigPicture;
            }
        },
        watch: {
            picStatus(status) {
                this.show = status;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../public/style/mixin.scss";

</style>
