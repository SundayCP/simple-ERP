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
* 获取用户列表（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchUserList(opts){
  return axios.post(CONFIG.API.GET_USER_LIST,qs.stringify({
    'username' : opts.username,
    'roleId': opts.roleId,
    'merchantName': opts.merchantName,
    'pName': opts.pName,
    'realname': opts.realname,
    'mobile': opts.mobile,
    'isLock': opts.isLock,
    'check': opts.check,
    'pageIndex':opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res=>{
    return res.data
  })
}
/*
* 获取商户账户列表（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchAccountList(opts){
  return axios.post(CONFIG.API.GET_ACCOUNT_LIST,qs.stringify({
    'username': opts.username,
    'withdrawAccount': opts.withdrawAccount,
    'name': opts.name,
    'isFrozen' : opts.isFrozen,
    'pageIndex':opts.currentPage,
    'pageSize': opts.pageSize,
  })).then(res=>{
    return res.data
  })
}

/*
* 冻结/解冻
* @param {any}  otps 参数对象
* */
export function frozen(opts) {
  return axios.post(CONFIG.API.FROZEN, qs.stringify({
    withdrawId: opts.id,
  })).then(res => {
    return res.data
  })
}
/*
* 获取角色类型（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchRoleType(opts) {
  return axios.get(CONFIG.API.GET_ROLE_TYPE,qs.stringify({

  })).then(res => res.data)
}
/*
* 获取可添加的角色（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchRoleAdd(opts) {
  return axios.get(CONFIG.API.GET_ROLE_ADD,qs.stringify({

  })).then(res => res.data)
}
/*
* 检测（用户管理）
* @param {any}  otps 参数对象
* */
export function checkStatus(opts){
  return axios.post(CONFIG.API.CHECK_STATUS,qs.stringify({
    'merchantId' : opts.merchantId
  })).then(res=>{
    return res.data
  })
}
/*
* 编辑用户（用户管理）
* @param {any}  otps 参数对象
* */
export function editUser(opts){
  return axios.post(CONFIG.API.EDIT_USER,qs.stringify({
   'merchantId' : opts.merchantId
  })).then(res=>{
    return res.data
  })
}
/*
* 获取省市（用户管理）
* @param {any}  otps 参数对象
* */
export function fetchArea(opts){
  return axios.post(CONFIG.API.GET_AREA,qs.stringify({
    // 'merchantId' : opts.merchantId
  })).then(res=>{
    return res.data
  })
}
/*
* 新增或提交用户（用户管理）
* @param {any}  otps 参数对象
* */
export function submitUser(opts){
  return axios.post(CONFIG.API.UPDATE_USER,qs.stringify({
    'id' : opts.id,
    'merchantId' : opts.merchantId,
    'username' : opts.username,
    'password' : opts.password,
    'aliveNumber' : opts.aliveNumber,
    'isLock' : opts.isLock,
    'roleId' : opts.roleId,
    'merchantName' : opts.merchantName,
    'mobile' : opts.mobile,
    'provinceId' : opts.provinceId,
    'cityId' : opts.cityId,
    'bankName' : opts.bankName,
    'bankBranch' : opts.bankBranch,
    'bankNum' : opts.bankNum,
    'realname': opts.realname,
    'alipay' : opts.alipay,
    'remark' : opts.remark,
    'businessLicense' : opts.businessLicense,
    'idCardFront' : opts.idCardFront,
    'idCardReverse' : opts.idCardReverse,
})).then(res=>{
    return res.data
  })
}
/*
* 删除用户（角色管理）
* @param {any}  otps 参数对象
* */
export function deleteRole(opts){
  return axios.post(CONFIG.API.DELETE_ROLE,qs.stringify({
    'roleId': opts.roleId,
  })).then(res=>{
    return res.data
  })
}
/*
* 获取添加角色列表（角色管理）
* @param {any}  otps 参数对象
* */
export function getRoleForm(opts){
  return axios.post(CONFIG.API.GET_ROLE_FORM,qs.stringify({
    'roleId': opts.roleId,
  })).then(res=>{
    return res.data
  })
}
/*
* 提交角色列表（角色管理）
* @param {any}  otps 参数对象
* */
export function submitRoleForm(opts){
  return axios.post(CONFIG.API.UPDATA_ROLE_FORM,qs.stringify({
    'roleId':opts.roleId,
    'permissions' : opts.permissions
})).then(res=>{
    return res.data
  })
}
/*
* 获取授权地区列表（授权地区）
* @param {any}  otps 参数对象
* */
export function fetchAreaList(opts){
  return axios.post(CONFIG.API.GET_AREA_LIST,qs.stringify({
    'username':opts.username,
    'roleId':opts.roleId,
    'merchantName':opts.merchantName,
    'pName':opts.pName,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize
  })).then(res=>{
    return res.data
  })
}
/*
* 修改授权地区（授权地区）
* @param {any}  otps 参数对象
* */
export function updataAddressItem(opts){
  return axios.post(CONFIG.API.UPDATA_ADDRESS_ITEM,qs.stringify({
    'merchantId' : opts.merchantId,
    'permisssionProvinceId' : opts.permisssionProvinceId,
    'permisssionCityId' : opts.permisssionCityId,
  })).then(res=>{
    return res.data
  })
}
/*
* 批量修改授权地区（授权地区）
* @param {any}  otps 参数对象
* */
export function updataAddressAll(opts){
  return axios.post(CONFIG.API.UPDATA_ADDRESS_ALL,qs.stringify({
    'merchantIdStr' : opts.merchantIdStr,
    'permisssionProvinceId' : opts.permisssionProvinceId,
    'permisssionCityId' : opts.permisssionCityId,
  })).then(res=>{
    return res.data
  })
}

/*
* 获取折扣设置列表（折扣设置）
* @param {any}  otps 参数对象
* */
export function fetchDiscountList(opts){
  return axios.post(CONFIG.API.GET_DISCOUNT_LIST,qs.stringify({
    'username' : opts.username,
    'roleId' : opts.roleId,
    'merchantName' : opts.merchantName,
    'pname' : opts.pname,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize
  })).then(res=>{
    return res.data
  })
}
/*
* 获取折扣设置商品列表（折扣设置）
* @param {any}  otps 参数对象
* */
export function fetchDiscountDetail(opts){
  return axios.post(CONFIG.API.GET_DISCOUNT_DETAIL,qs.stringify({
  })).then(res=>{
    return res.data
  })
}
/*
* 折扣数据详情（折扣设置）
* @param {any}  otps 参数对象
* */
export function fetchDiscountData(opts){
  return axios.post(CONFIG.API.GET_DISCOUNT_DATA,qs.stringify({
    'merchantId' : opts.merchantId
  })).then(res=>{
    return res.data
  })
}
/*
* 获取折扣设置详情（折扣设置 批量）
* @param {any}  otps 参数对象
* */
export function updataDicountAll(opts){
  return axios.post(CONFIG.API.UPDATA_DISCOUNT_ALL,{
    'merchantIdStr' :opts.merchantIdStr,
    'itemDiscounts':opts.itemDiscounts,
  }).then(res=>{
    return res.data
  })
}
/*
* 每个折扣设置详情（折扣设置）
* @param {any}  otps 参数对象
* */
export function updataDicountItem(opts){
  return axios.post(CONFIG.API.UPDATA_DISCOUNT_ITEM,{
    'merchantId' :opts.merchantId,
    'itemDiscounts':opts.itemDiscounts,
    // 'type' : opts.type
  }).then(res=>{
    return res.data
  })
}


/*
*授权地区 -- 获取工号
* @param {any}  otps 参数对象
* */
export function getJobNum(opts){
  return axios.post(CONFIG.API.GET_JOB_NUM,qs.stringify({
  })).then(res=>{
    return res.data
  })
}



/*
*授权地区 -- 提交授权信息
* @param {any}  otps 参数对象
* */
export function confirmInfo(opts){
  return axios.post(CONFIG.API.CONFIRM_INFO,{
    merchantIds: opts.merchantIds,
    authorizeRegions: opts.authorizeRegions,
  }).then(res=>{
    return res.data
  })
}




/*
* 授权地区列表（授权地区）
* @param {any}  otps 参数对象
* */
export function getAreaList(opts){
  return axios.post(CONFIG.API.GET_AREA_LIST_NEW,qs.stringify({
    'username':opts.username,
    'roleId':opts.roleId,
    'pageIndex': opts.currentPage,
    'pageSize': opts.pageSize
  })).then(res=>{
    return res.data
  })
}

/*
* 授权地区列表（删除）
* @param {any}  otps 参数对象
* */
export function deleteCon(opts){
  return axios.get(CONFIG.API.DELETE_CON, {
    params: {
      'merchantId': opts.merchantId
    }
  }).then(res => res.data)
}



/*
* 获取部分地区的数据
* @param {any}  otps 参数对象
* */
export function getFetchSectionArea(opts){
  return axios.post(CONFIG.API.GET_FETCH_SECTION_AREA,qs.stringify({
  })).then(res=>{
    return res.data
  })
}

