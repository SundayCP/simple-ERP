import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'


/*
* 账户总收入(总数)
* @param {any}  otps 参数对象
* */
export function generalIncomeSum(){
  return axios.post(CONFIG.API.GENERAL_INCOME_SUM).then(res=>{
    return res.data
  })
}
/*
* 账户总收入（数据列表）
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
