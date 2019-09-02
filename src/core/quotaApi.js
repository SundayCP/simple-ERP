import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 一定积分核销限额列表
* @param {any}  otps 参数对象
* */
export function quataList() {
  return axios.post(CONFIG.API.QUATA_LIST,qs.stringify({
    pageIndex:1,
    pageSize:100
  })).then(res => {
    return res.data
  })
}

/*
* 新增限额
* @param {any}  otps 参数对象
* */
export function addQuata(opts) {
  return axios.post(CONFIG.API.ADD_QUOTA,qs.stringify({
    provinceId: opts.province,
    amount: opts.value
  })).then(res => {
    return res.data
  })
}


/*
* 编辑限额
* @param {any}  otps 参数对象
* */
export function editQuata(opts) {
  return axios.post(CONFIG.API.EDIT_QUOTA,qs.stringify({
    id:opts.id,
    provinceId: opts.province,
    amount: opts.value
  })).then(res => {
    return res.data
  })
}

/*
* 批量编辑限额
* @param {any}  otps 参数对象
* */
export function batchEditQuata(opts) {
  return axios.post(CONFIG.API.BATCH_EDIT_QUOTA,qs.stringify({
    ids: opts.provinceList,
    amount: opts.value
  })).then(res => {
    return res.data
  })
}
/*
* 批量编辑限额
* @param {any}  otps 参数对象
* */
export function provinceList(opts) {
  return axios.post(CONFIG.API.PROVINCE_LIST).then(res => {
    return res.data
  })
}
