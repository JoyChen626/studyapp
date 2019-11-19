import {post, get} from './hppts.js'

export const apiLogin = params => post('/api/study/userLogin', params);
export const apiGetCode = params => get('/api/study/verificationCode', params);
export const apiAddUser = params => post('/api/study/addUser', params);
export const apigetMyInfo = params => get('/api/study/getUser', params);
export const apigetHomeData = params => get('/api/study/homeData', params);
export const apigetOrderInfo = params => get('/api/study/getOrder', params);
export const apideleteOrder = params => get('/api/study/deleteOrder', params);
export const apiscore = params => get('/api/study/score', params);
export const apigetSubject = params => get('/api/study/getSubject', params);
export const apigetVideoUrl = params => get('classroom/getvideourl', params);
export const apigetVideoInfo = params => get('classroom/getvideoinfo', params);
export const apigetComment = params => get('classroom/getcomment', params);
