import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 获取订单列表（订单管理）
* @param {any}  otps 参数对象
* */
export function fetchOrderList(opts) {
  return axios.post(CONFIG.API.GET_ORDER_LIST, qs.stringify({
    'orderId': opts.orderId,
    'status': opts.status,
    'orderType': opts.orderType,
    'mobile': opts.mobile,
    'beginTime': opts.startTime,
    'endTime': opts.endTime,
    'merchantUsername': opts.merchantUsername,
    'pidMerchantUsername': opts.pidMerchantUsername,
    'cyAccount' : opts.cyAccount,
    'area': opts.area,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res => {
    return res.data
  })
}

/*
* 获取订单类型（订单管理）
* @param {any}  otps 参数对象
* */
export function fetchOrderType(opts) {
  return axios.post(CONFIG.API.GET_ORDER_TYPE, qs.stringify({})).then(res => {
    return res.data
  })
}

/*
* 登记投诉（订单管理）
* @param {any}  otps 参数对象
* */
export function addComplain(opts) {
  return axios.post(CONFIG.API.ADD_ORDER_COMPLAIN, qs.stringify({
    'complainOrderId': opts.complainOrderId,
    'starRemark': opts.starRemark,
    'complainAddTime': opts.complainAddTime,
    'complainReason': opts.complainReason,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res => {
    return res.data
  })
}

/*
* QUEREN （订单管理）
* @param {any}  otps 参数对象
* */
export function payBack(opts) {
  return axios.post(CONFIG.API.GET_PAY_BACK, qs.stringify({
    'executeComplainId': opts.executeComplainId
  })).then(res => {
    return res.data
  })
}

/*
* 改变状态 （订单管理）
* @param {any}  otps 参数对象
* */
export function changeStatus(opts) {
  return axios.post(CONFIG.API.GET_COMPLAIN_ACTIVE, qs.stringify({
    'executeComplainId': opts.executeComplainId,
    'executeComplainType': opts.executeComplainType,
    'executeComplainRemark': opts.executeComplainRemark,
    'executeComplainNeedDeduct': opts.executeComplainNeedDeduct,
    'deductMoney': opts.deductMoney
  })).then(res => {
    return res.data
  })
}

/*
* 获取投诉列表（投诉管理）
* @param {any}  otps 参数对象
* */
export function fetchComplainList(opts) {
  return axios.post(CONFIG.API.GET_COMPLAIN_LIST, qs.stringify({
    'orderType': opts.orderType,
    'complaintStatus': opts.complaintStatus,
    'orderId': opts.orderId,
    'merchantId': opts.merchantId,
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res => {
    return res.data
  })
}


/*
* 获取订单统计列表（订单统计）
* @param {any}  otps 参数对象
* */
export function fetchCountList(opts) {
  return axios.post(CONFIG.API.GET_COUNT_LIST, qs.stringify({
    'orderType': opts.orderType,
    'merchantUsername': opts.merchantUsername,
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res => {
    return res.data
  })
}

/*
* 获取省市（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchArea(opts) {
  return axios.post(CONFIG.API.GET_AREA, qs.stringify({})).then(res => {
    return res.data
  })
}

/*
* 获取地区统计数据（地区统计）
* @param {any}  otps 参数对象
* */
export function fetchAreaStatic(opts) {
  return axios.post(CONFIG.API.GET_AREA_STATIC, qs.stringify({
    'merchantName': opts.merchantName,
    'province': opts.province,
    'city': opts.city,
    'orderType': opts.orderType,
    'itemName': opts.itemName,
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res => {
    return res.data
  })
}
