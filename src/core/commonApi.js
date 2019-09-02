import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'


/*
* 登陆
* @param {any}  otps 参数对象
* */
export function userLogin(opts){
  return axios.post(CONFIG.API.USER_LOGIN_REP,qs.stringify({
    'username': opts.mobile,
    'password': opts.password
  })).then(res=>{
    console.log('userLogin',res)
    return res.data
  })
}


/*
* 退出登录
* @param {any}  otps 参数对象
* */
export function outLogin(){
  return axios.post(CONFIG.API.OUT_LOGIN).then(res=>{
    return res.data
  })
}


/*
* 登陆状态
* @param {any}  otps 参数对象
* */
export function loggedIn(opts){
  return axios.post(CONFIG.API.LOGGED_IN).then(res=>{
    return res.data
  })
}

/*
* 登陆状态
* @param {any}  otps 参数对象
* */
export function menu(){
  return axios.post(CONFIG.API.MENU).then(res=>{
    return res.data
  })
}

/*
* 获取用户的名字
* @param {any}  otps 参数对象
* */
export function getUserInfo(opts) {
  return axios.post(CONFIG.API.GET_USER_INFO, qs.stringify({})).then(res => {
    return res.data
  })
}
