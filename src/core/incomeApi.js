import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 获取当前登录信息（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchUser(opts){
  return axios.post(CONFIG.API.GET_USER,qs.stringify({

  })).then(res=>{
    return res.data
  })
}
/*
* 积分账户收入(总数)
* @param {any}  otps 参数对象
* */
export function generalIncomeSum(){
  return axios.post(CONFIG.API.GENERAL_INCOME_SUM).then(res=>{
    return res.data
  })
}
/*
* 积分账户收入（数据列表）
* @param {any}  otps 参数对象
* */
export function generalIncome(opts){
  return axios.post(CONFIG.API.GENERAL_INCOME,qs.stringify({
    'beginTime' : opts.beginTime,
    'endTime' : opts.endTime,
    'username' : opts.username,
    'merchantName' : opts.merchantName,
    'pageIndex' : opts.currentPage,
    'pageSize' : opts.pageSize,
  })).then(res=>{
    return res.data
  })
}

/*
* 财务明细
* @param {any}  otps 参数对象
* */
export function financialDetails(opts){
  return axios.post(CONFIG.API.FINANCIAL_DETAILS,qs.stringify({
    'startTime': opts.startTime,
    'endTime': opts.endTime,
    'merchantName':opts.merchant,
    'pname':opts.superiorMerchant,
    'pageIndex':opts.currentPage,
    'pageSize':opts.pageSize
  })).then(res=>{
    return res.data
  })
}


/*
* 结算核对
* @param {any}  otps 参数对象
* */
export function incomeSum(opts){
  return axios.post(CONFIG.API.INCOME_SUM,qs.stringify({
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
  })).then(res=>{
    return res.data
  })
}

/*
* 结算核对组合
* @param {any}  otps 参数对象
* */
export function getAccountGroup(opts){
  return axios.post(CONFIG.API.GET_ACCOUNT_GROUP,qs.stringify({
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
  })).then(res=>{
    return res.data
  })
}

/*
* 结算核对表格
* @param {any}  otps 参数对象
* */
export function getCheckIncome(opts){
  return axios.post(CONFIG.API.GET_CHECK_INCOME,qs.stringify({
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
    'pageIndex':opts.currentPage,
    'pageSize':opts.pageSize
  })).then(res=>{
    return res.data
  })
}

/*
* 支付宝拉新记账核对（数据列表）
* @param {any}  otps 参数对象
* */
export function zfbCheck(opts){
  return axios.post(CONFIG.API.GET_ZFB_CHECK,qs.stringify({
    'beginTime' : opts.beginTime,
    'endTime' : opts.endTime,
    'pageIndex':opts.currentPage,
    'pageSize':opts.pageSize
  })).then(res=>{
    return res.data
  })
}
/*
* 支付宝拉新记账核对（新建/编辑数据）
* @param {any}  otps 参数对象
* */
export function editZfbData(opts){
  return axios.post(CONFIG.API.EDIT_ZFB_DATA,{
    'dayTime' : opts.dayTime,
    'id' : opts.id,
    'incomeMoney' : opts.incomeMoney,
    'outMoney' : opts.outMoney,
    'waitSettleMoney' : opts.waitSettleMoney,
  }).then(res=>{
    return res.data
  })
}
/*
* 支付宝拉新记账核对（合计）
* @param {any}  otps 参数对象
* */
export function addZfbSum(opts){
  return axios.post(CONFIG.API.EDIT_ZFB_SUM,qs.stringify({

  })).then(res=>{
    return res.data
  })
}
/*
* 账户总收入（数据列表）
* @param {any}  otps 参数对象
* */
export function totalaccount(opts){
  return axios.post(CONFIG.API.GET_TOTAL_ACCOUNT,qs.stringify({
    'beginTime' : opts.beginTime,
    'endTime' : opts.endTime,
    'pageIndex':opts.currentPage,
    'pageSize':opts.pageSize
  })).then(res=>{
    return res.data
  })
}





