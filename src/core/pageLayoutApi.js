import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 分类配置列表
* @param {any}  otps 参数对象
* */
export function classifyList(opts) {
  return axios.post(CONFIG.API.CLASSIFY_LIST,qs.stringify({
    pid:0,
    pageIndex:1,
    pageSize:100
  })).then(res => {
    return res.data
  })
}

/*
* 批量编辑限额
* @param {any}  otps 参数对象
* */
export function addClassify(opts) {
  return axios.post(CONFIG.API.ADD_CLASSIFY, qs.stringify({
    pid:0,
    name: opts.value
  })).then(res => {
    return res.data
  })
}

/*
* 编辑分类名称
* @param {any}  otps 参数对象
* */
export function editClassify(opts) {
  return axios.post(CONFIG.API.EDIT_CLASSIFY, qs.stringify({
    pid: 0,
    id:opts.classifyId,
    name: opts.value
  })).then(res => {
    return res.data
  })
}

/*
* 分类上移
* @param {any}  otps 参数对象
* */
export function classifyMoveUp(opts) {
  return axios.post(CONFIG.API.CLASSIFY_MOVE_UP, qs.stringify({
    dir:"up",
    id: opts.classifyId
  })).then(res => {
    return res.data
  })
}

/*
* 分类下移
* @param {any}  otps 参数对象
* */
export function classifyMoveDown(opts) {
  return axios.post(CONFIG.API.CLASSIFY_MOVE_DOWN, qs.stringify({
    dir:"down",
    id: opts.classifyId
  })).then(res => {
    return res.data
  })
}

/*
* 首页配置列表
* @param {any}  otps 参数对象
* */
export function homeCategoryList(opts) {
  return axios.post(CONFIG.API.HOME_CATEGORY_LIST, qs.stringify({
    pid:opts.classifyId,
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize,
  })).then(res => {
    return res.data
  })
}


/*
* 首页配置
* @param {any}  otps 参数对象
* */
export function differServ(opts) {
  return axios.post(CONFIG.API.DIFFER_SERV,qs.stringify({
    pid:0,
    pageIndex:1,
    pageSize:100
  })).then(res => {
    return res.data
  })
}

/*
* 首页配置编辑
* @param {any}  otps 参数对象
* */
export function homeEditInformation(opts) {
  return axios.post(CONFIG.API.HOME_EDIT_INFORMATION, qs.stringify({
    pid: opts.type,
    name: opts.name,
    id: opts.id,
  })).then(res => {
    return res.data
  })
}


/*
* 详情配置编辑
* @param {any}  otps 参数对象
* */
export function detailsEditInformation(opts) {
  return axios.post(CONFIG.API.DETAILS_EDIT_INFORMATION, qs.stringify({
    name: opts.name,
    linkUrl: opts.linkUrl,
    itemCategoryId:opts.value,
    id: opts.id,
    pid:opts.pid
  })).then(res => {
    return res.data
  })
}


/*
* 首页配置编辑
* @param {any}  otps 参数对象
* */
export function homeMoveUp(opts) {
  return axios.post(CONFIG.API.HOME_MOVE_UP, qs.stringify({
    dir:"up",
    id: opts.id
  })).then(res => {
    return res.data
  })
}


/*
* 首页配置编辑
* @param {any}  otps 参数对象
* */
export function homeMoveDown(opts) {
  return axios.post(CONFIG.API.HOME_MOVE_DOWN, qs.stringify({
    dir:"down",
    id: opts.id
  })).then(res => {
    return res.data
  })
}

/*
* 首页配置列表
* @param {any}  otps 参数对象
* */
export function detailsCategoryList(opts) {
  return axios.post(CONFIG.API.DETAILS_CATEGORY_LIST, qs.stringify({
    pid:opts.businessId,
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize,
  })).then(res => {
    return res.data
  })
}

/*
* 首页配置编辑
* @param {any}  otps 参数对象
* */
export function detailsMoveUp(opts) {
  return axios.post(CONFIG.API.DETAILS_MOVE_UP, qs.stringify({
    dir:"up",
    id: opts.id
  })).then(res => {
    return res.data
  })
}


/*
* 首页配置编辑
* @param {any}  otps 参数对象
* */
export function detailsMoveDown(opts) {
  return axios.post(CONFIG.API.DETAILS_MOVE_DOWN, qs.stringify({
    dir:"down",
    id: opts.id
  })).then(res => {
    return res.data
  })
}


/*
* 详情业务
* @param {any}  otps 参数对象
* */
export function detailsDifferServ(opts) {
  return axios.post(CONFIG.API.DETAILS_DIFFER_SERV).then(res => {
    return res.data
  })
}

/*
* 活动配置列表
* @param {any}  otps 参数对象
* */
export function activityCategoryList(opts) {
  return axios.post(CONFIG.API.ACTIVITY_CATEGORY_LIST, qs.stringify({
    pageIndex: opts.currentPage,
    pageSize: opts.pageSize,
  })).then(res => {
    return res.data
  })
}

/*
* 活动下移
* @param {any}  otps 参数对象
* */
export function activityMoveDown(opts) {
  return axios.post(CONFIG.API.ACTIVITY_MOVE_DOWN, qs.stringify({
    dir:"down",
    id: opts.id
  })).then(res => {
    return res.data
  })
}

/*
* 活动上移
* @param {any}  otps 参数对象
* */
export function activityMoveUp(opts) {
  return axios.post(CONFIG.API.ACTIVITY_MOVE_UP, qs.stringify({
    dir:"up",
    id: opts.id
  })).then(res => {
    return res.data
  })
}

/*
* 活动配置编辑
* @param {any}  otps 参数对象
* */
export function activityEditInformation(opts) {
  return axios.post(CONFIG.API.ACTIVITY_EDIT_INFORMATION, qs.stringify({
    title: opts.title,
    linkUrl: opts.linkUrl,
    id: opts.id,
    itemCategoryId: opts.itemCategoryId
  })).then(res => {
    return res.data
  })
}

/*
* 活动配置编辑
* @param {any}  otps 参数对象
* */
export function deleteHome(opts) {
  return axios.post(CONFIG.API.DELETE_HOME, qs.stringify({
    id: opts.id
  })).then(res => {
    return res.data
  })
}

/*
* 活动配置编辑
* @param {any}  otps 参数对象
* */
export function deleteActivity(opts) {
  return axios.post(CONFIG.API.DELETE_ACTIVITY, qs.stringify({
    id: opts.id
  })).then(res => {
    return res.data
  })
}

/*
*
* @param {any}  otps 参数对象
* */
export function getItemCategoryList() {
  return axios.post(CONFIG.API.GET_ITEM_CATEGORY_LIST).then(res => {
    return res.data
  })
}
