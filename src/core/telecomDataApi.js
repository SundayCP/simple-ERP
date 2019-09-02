import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 获取列表（电信数据）
* @param {any}  otps 参数对象
* */
export function getTelecomList(opts){
  return axios.post(CONFIG.API.GET_TELECOM_DATA,qs.stringify({
    'itemName' : opts.itemName,
    'isUse' : opts.isUse,
    'orderId' : opts.orderId,
    'mobile' : opts.mobile,
    'beginTime': opts.beginTime,
    'endTime': opts.endTime,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res=>{
    return res.data
  })
}
