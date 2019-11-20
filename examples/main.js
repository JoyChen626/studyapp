import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios';
import "babel-polyfill";
import VueCookies from 'vue-cookies'
import './../public/javascript/common.js'
import './components/global.js'

import { Button, Image, cell, CellGroup, Field, Swipe, SwipeItem, Lazyload, Row, Col, Icon, Panel,Tabbar, TabbarItem, Notify, ImagePreview, NavBar, Card, Loading, Overlay,List,Tab, Tabs,Tag,Circle,RadioGroup, Radio,Grid, GridItem,Checkbox, CheckboxGroup, Uploader } from 'vant';
Vue.use(Button).use(Image).use(cell).use(CellGroup).use(Field).use(Swipe).use(SwipeItem).use(Lazyload).use(Row).use(Col).use(Icon).use(Panel).use(Tabbar).use(TabbarItem).use(Notify).use(ImagePreview).use(NavBar).use(Card).use(Loading).use(Overlay).use(List).use(Tab).use(Tabs).use(Tag).use(Circle).use(RadioGroup).use(Radio).use(Grid).use(GridItem).use(Checkbox).use(CheckboxGroup).use(Uploader);
Vue.use(VueCookies)

/*window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
