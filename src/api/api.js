import {post, get} from './hppts.js'

export const apiLogin = params => post('login', params);
export const apigetMyInfo = params => get('myinfo', params);
export const apigetHomeData = params => get('homedata', params);
export const apigetOrderInfo = params => get('myinfo/orderinfo', params);
export const apiAboutOurs = params => get('myinfo/aboutours', params);
export const apigetVideoUrl = params => get('classroom/getvideourl', params);
export const apigetVideoInfo = params => get('classroom/getvideoinfo', params);
export const apigetComment = params => get('classroom/getcomment', params);
