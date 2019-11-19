import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router/index'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

let default_name;
try{
  if(sessionStorage.username){
    default_name = sessionStorage.username;
  } else {
    default_name = '';
  }
}catch (e) {
  default_name = '';
}
let default_token;
try{
  if(VueCookies.get('studyCode')){
    default_token = VueCookies.get('studyCode');
  } else {
    default_token = '';
  }
}catch (e) {
  default_token = '';
}
let default_class_active;
try{
  if(sessionStorage.classActive){
    default_class_active = sessionStorage.classActive;
  } else {
    default_class_active = '';
  }
}catch (e) {
  default_class_active = '';
}
export default new Vuex.Store({
  state: {
    token: default_token,
    username: default_name,
    myOrderList: [],
    showBigPicture: false,
    loading: false,
    newComment: '',
    classActive: default_class_active,
  },
  getters: {

  },
  mutations: {
    SET_TOKEN (state,token) {
      state.token = token;
      VueCookies.set('studyCode', state.token, '3d');
    },
    SAVE_USERNAME (state, name) {
      sessionStorage.username = name;
      state.username = name;
    },
    CHANGE_MYORDER (state, list) {
      state.myOrderList = list;
    },
    CHANGE_PICTURE (state, status) {
      state.showBigPicture = status;
    },
    CHANGE_LOADING (state, status) {
      state.loading = status;
    },
    SAVE_COMMENT (state,data) {
      state.newComment = data;
      Router.push({path:'/classroom'})
    },
    SAVE_CLASS_ACTIVE (state,status) {
      state.classActive = status;
      sessionStorage.classActive = state.classActive;
    }
  },
  actions: {

  }
})
