import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'





/*
* 获取商户列表（其他业务--蚂蚁花呗）
* @param {any}  otps 参数对象
* */
export function fetchMerchantList(opts) {
  return axios.post(CONFIG.API.GET_MERCHANT_LIST, qs.stringify({
    'merchantCode': opts.merchantNum1,
    'merchantName': opts.merchantName1,
    'contact': opts.linkMan1,
    'mobile': opts.linkMobile1,
    'zfbType': opts.zfbType1,
    'zfbAccount': opts.zfbAccount1,
    'status': opts.status1,
    'zfbCertificateName': opts.officialName1,
    'pageIndex': opts.currentPage1,
    'pageSize': opts.pageSize1
  })).then(res => {
    return res.data
  })
}



/*
* 获取门店列表（其他业务--蚂蚁花呗）
* @param {any}  otps 参数对象
* */
export function fetchStoreList(opts) {
  return axios.post(CONFIG.API.GET_STORE_LIST, qs.stringify({
    storeCode: opts.storeNum2,
    merchantCode: opts.merchantNum2,
    name: opts.merchantName2,
    contact: opts.linkMan2,
    mobile: opts.linkMobile2,
    address: opts.linkAddress2,
    provinceCityDistrictCode: opts.postalCode2,
    pageIndex: opts.currentPage2,
    pageSize: opts.pageSize2
  })).then(res => {
    return res.data
  })
}

/*
* 获取订单列表（其他业务--蚂蚁花呗）
* @param {any}  otps 参数对象
* */
export function fetchAntOrderList(opts) {
  return axios.post(CONFIG.API.GET_ANT_ORDER_LIST, qs.stringify({
    merchantCode: opts.merchantNum3,
    storeCode: opts.storeNum3,
    orderID: opts.outOrderNum3,
    telNo: opts.clientMobile3,
    status: opts.orderStatus3,
    pageIndex: opts.currentPage3,
    pageSize: opts.pageSize3,
  })).then(res => {
    return res.data
  })
}


/*
* 添加花呗商户
* @param {any}  otps 参数对象
* */

export function addAntmerchant(opts) {
  return axios.post(CONFIG.API.ADD_ANT_MERCHANT, qs.stringify({
    id:'',
    jlMerchantId: opts.userNum,
    merchantName: opts.userName,
    email: opts.email,
    contact: opts.manager,
    mobile: opts.mobile,
    zfbType: opts.zfbType,
    provinceCityDistrictCode: opts.areaCode,
    zfbAccount: opts.zfbAccount,
    zfbCertificateName: opts.officialName,
    org: opts.creditCode,
    license: opts.license,
    licenseUrl: opts.businessLicense,
    identityCard1: opts.identityCard1,
    identityCard1Url: opts.IdCardFront,
    identityCard2: opts.identityCard2,
    identityCard2Url: opts.IdCardVerso,
    shopPhoto1: opts.shopPhoto1,
    shopPhoto1Url: opts.shopFront,
    shopPhoto2: opts.shopPhoto2,
    shopPhoto2Url: opts.shopVerso  })).then(res => {
    return res.data
  })
}


/*
* 编辑花呗商户
* @param {any}  otps 参数对象
* */
export function editAntmerchant(opts) {
  return axios.post(CONFIG.API.EDIT_ANT_MERCHANT, qs.stringify({
    id:opts.id,
    merchantName: opts.userName,
    email: opts.email,
    contact: opts.manager,
    mobile: opts.mobile,
    zfbType: opts.zfbType,
    provinceCityDistrictCode: opts.areaCode,
    zfbAccount: opts.zfbAccount,
    zfbCertificateName: opts.officialName,
    org: opts.creditCode,
    license: opts.license,
    licenseUrl: opts.businessLicense,
    identityCard1: opts.identityCard1,
    identityCard1Url: opts.IdCardFront,
    identityCard2: opts.identityCard2,
    identityCard2Url: opts.IdCardVerso,
    shopPhoto1: opts.shopPhoto1,
    shopPhoto1Url: opts.shopFront,
    shopPhoto2: opts.shopPhoto2,
    shopPhoto2Url: opts.shopVerso  })).then(res => {
    return res.data
  })
}

/*
* 删除花呗商户
* @param {any}  otps 参数对象
* */
export function deleteAntmerchant(opts) {
  return axios.post(CONFIG.API.DELETE_ANT_MERCHANT, qs.stringify({
    merchantId: opts.id,
  })).then(res => {
    return res.data
  })
}


/*
* 获取花呗商户信息
* @param {any}  otps 参数对象
* */
export function getAntmerchant(opts) {
  return axios.post(CONFIG.API.GET_ANT_MERCHANT,qs.stringify({
  pageIndex:1,
  pageSize:300
  })).then(res => {
    return res.data
  })
}

/*
* 门店列表
* @param {any}  otps 参数对象
* */
export function storeList(opts) {
  return axios.post(CONFIG.API.STORE_LIST, qs.stringify({
    pageIndex:1,
    pageSize:300
  })).then(res => {
    return res.data
  })
}



// id= &merchantCode= &name= &contact=  &mobile= &address=
/*
* 添加花呗门店
* @param {any}  otps 参数对象
* */
export function addAntStore(opts) {
  return axios.post(CONFIG.API.ADD_ANT_STORE, qs.stringify({
    id: '',
    // storeNum2: opts.storeNum2,
    merchantCode: opts.merchantName2,
    name:opts.name2,
    contact: opts.linkMan2,
    mobile: opts.linkMobile2,
    address: opts.linkAddress2,
    // postalCode2: opts.postalCode2
  })).then(res => {
    return res.data
  })
}

/*
* 编辑花呗门店
* @param {any}  otps 参数对象
* */
export function editAntStore(opts) {
  return axios.post(CONFIG.API.EDIT_ANT_STORE, qs.stringify({
    id: opts.id,
    // storeNum2: opts.storeNum2,
    // merchantName2: opts.merchantName2,
    name:opts.name2,
    contact: opts.linkMan2,
    mobile: opts.linkMobile2,
    address: opts.linkAddress2,
    // postalCode2: opts.postalCode2
    })).then(res => {
    return res.data
  })
}

/*
* 删除花呗门店
* @param {any}  otps 参数对象
* */
export function deleteAntStore(opts) {
  return axios.post(CONFIG.API.DELETE_ANT_STORE, qs.stringify({
    storeId: opts.id,
  })).then(res => {
    return res.data
  })
}

/*
* 删除花呗门店
* @param {any}  otps 参数对象
* */
export function merchantDetail(opts) {
  return axios.post(CONFIG.API.MERCHANT_DETAIL, qs.stringify({
    merchantId: opts.merchantId,
  })).then(res => {
    return res.data
  })
}

/*
* 删除花呗门店
* @param {any}  otps 参数对象
* */
export function province() {
  return axios.post(CONFIG.API.PROVINCE).then(res => {
    return res.data
  })
}

/*
* 上传图片
* @param {any}  otps 参数对象
* */
export function upload(opts) {
  return axios.post(CONFIG.API.UPLOAD,opts,{headers:{
      'Content-Type': 'multipart/form-data'
  }}).then(res => {
    return res.data
  })
}

