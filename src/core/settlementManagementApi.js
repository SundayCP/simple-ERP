import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 提现列表
* @param {any}  otps 参数对象
* */
export function withdrawalList(opts) {
  return axios.post(CONFIG.API.WITHDRAWAL_LIST, qs.stringify({
    beginTime: opts.startTime,
    endTime: opts.endTime,
    merchantId: opts.merchantId,
    username: opts.merchantName,
    bigMerchantName: opts.superiorMerchant,
    moneyStatus: opts.settlementStatus,
    status: opts.withdrawalState,
    withdrawType:  opts.paythods,   // 新增打款方式
    accountType: opts.accountType,
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize
  })).then(res => {
    return res.data
  })
}



/*
* 修改打款状态
* @param {any}  otps 参数对象
* */
export function changePayStatus(opts) {
  return axios.post(CONFIG.API.CHANGE_PAY_STATUS, qs.stringify({
    withDrawIds: opts.id,
  })).then(res => {
    return res.data
  })
}



/*
* 修改通过状态
* @param {any}  otps 参数对象
* */
export function changeAccept(opts) {
  return axios.post(CONFIG.API.CHANGE_ACCEPT, qs.stringify({
    withDrawIds: opts.id,
  })).then(res => {
    return res.data
  })
}

/*
* 后台备注
* @param {any}  otps 参数对象
* */
export function upDataRemark(opts) {
  return axios.post(CONFIG.API.UP_DATA_REMARK, qs.stringify({
    id: opts.id,
    retMessage: opts.value
  })).then(res => {
    return res.data
  })
}

/*
* 拒绝提现
* @param {any}  otps 参数对象
* */
export function repulse(opts) {
  return axios.post(CONFIG.API.REPULSE, qs.stringify({
    id: opts.id,
    status: '拒绝'
  })).then(res => {
    return res.data
  })
}

/*
* 允许提现
* @param {any}  otps 参数对象
* */
export function allow(opts) {
  return axios.post(CONFIG.API.ALLOW, qs.stringify({
    id: opts.id,
    status: '通过'
  })).then(res => {
    return res.data
  })
}

/*
* 支付宝打款记录
* @param {any}  otps 参数对象
* */
export function moneyRecord(opts) {
  return axios.post(CONFIG.API.MONEY_RECORD, qs.stringify({
    merchantId: opts.merchantId,
    merchantName: opts.merchantName,
    beginMoneyTime: opts.startTime,
    endMoneyTime: opts.endTime,
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize
  })).then(res => {
    return res.data
  })
}


/*
* 支付宝打款记录
* @param {any}  otps 参数对象
* */
export function submitPsw(opts) {
  return axios.post(CONFIG.API.SUBMIT_PSW, qs.stringify({
    'oldPassword': opts.oldPsw,
    'newPassword': opts.newPsw,
    'againNewPassword': opts.newAgain,
  })).then(res => {
    return res.data
  })
}




/*
* 获取用户的信息
* @param {any}  otps 参数对象
* */
export function getUserInfo(opts) {
  return axios.post(CONFIG.API.GET_USER_INFO, qs.stringify({})).then(res => {
    return res.data
  })
}

/*
* 发票列表
* @param {any}  otps 参数对象
* */
export function ticketlList(opts) {
  return axios.post(CONFIG.API.TICKET_LIST,qs.stringify({
    beginTime: opts.beginTime,
    endTime: opts.endTime,
    merchantName:opts.merchantName,
    withdrawAccount:opts.withdrawAccount,
    type:opts.type,
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize
  })).then(res => {
    return res.data
  })
}
