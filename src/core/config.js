const isdevelop = process.env.NODE_ENV !== 'production'
const domain = isdevelop ? '' : ''
// const debug = isdevelop ? '?isDebug=true&appkey=MDNmYTlhYjRjNzBiNDBmNjhkMjZmYjk4MzBjMTFhYTk=&partnerId=MTE=' : ''
const debug = ''

const CONFIG = {
  API: {
    'USER_LOGIN_REP': domain + '/admin/login' + debug, //首页登录
    'LOGGED_IN': domain + '/merchant/loginStatus' + debug, //判断登陆状态
    'MENU': domain + '/admin/user/menu' + debug, //判断登陆状态
    'OUT_LOGIN': domain + '/admin/cookies/delete' + debug, //判断登陆状态

    'GENERAL_INCOME_SUM': domain + '/admin/account/sumIncome' + debug, //积分账户收入（总计）
    'GENERAL_INCOME': domain + '/admin/account/incomeList' + debug, //积分账户总收入（总计）
    // 'GENERAL_INCOME': domain + '/admin/account/sumIncome' + debug, //积分账户收入(数据列表)
    'FINANCIAL_DETAILS': domain + '/admin/account/detail' + debug, //财务明细

    'WITHDRAWAL_LIST': domain + '/admin/withdraw/getPage' + debug, //提现列表
    'TICKET_LIST': domain + '/admin/withdraw/invoiceList' + debug, //发票单列表
    'UP_DATA_REMARK': domain + '/admin/withdraw/updateRetMessage' + debug, //更改后台备注
    'REPULSE': domain + '/admin/withdraw/check' + debug, //提现审核通过
    'ALLOW': domain + '/admin/withdraw/check' + debug, //提现审核拒绝
    // 'FROZEN': domain + '' + debug, //提现冻结
    // 'DEFROZEN': domain + '' + debug, //提现解冻
    'MONEY_RECORD': domain + '/admin/alipay/getPage' + debug, //支付宝打款记录

    'QUATA_LIST': domain + '/admin/order/provinceLimit/getData' + debug, //积分限额列表
    'ADD_QUOTA': domain + '/admin/order/provinceLimit/addOrUpdate' + debug, //新增移动积分限额
    'EDIT_QUOTA': domain + '/admin/order/provinceLimit/addOrUpdate' + debug, //编辑移动积分限额
    'BATCH_EDIT_QUOTA': domain + '/admin/order/provinceLimit/batchUpdate' + debug, //批量编辑移动积分限额
    'PROVINCE_LIST': domain + '/admin/order/provinceLimit/getProvince' + debug, //省份信息

    'CLASSIFY_LIST': domain + '/admin/business/list/getData' + debug, //聚乐分类配置    1
    'ADD_CLASSIFY': domain + '/admin/business/list/addOrUpdate' + debug, //聚乐添加分类   1
    'EDIT_CLASSIFY': domain + '/admin/business/list/addOrUpdate' + debug, //聚乐编辑分类    1
    'CLASSIFY_MOVE_UP': domain + '/admin/business/list/upDown' + debug, //分类上移
    'CLASSIFY_MOVE_DOWN': domain + '/admin/business/list/upDown' + debug, //分类下移
    'HOME_CATEGORY_LIST': domain + '/admin/business/list/getData' + debug, //首页配置    1
    'DIFFER_SERV': domain + '/admin/business/list/getData' + debug, //首页配置业务分类 1
    'HOME_EDIT_INFORMATION': domain + '/admin/business/list/addOrUpdate' + debug, //首页配置编辑信息
    'DETAILS_EDIT_INFORMATION': domain + '/admin/business/list/addOrUpdate' + debug, //详情配置编辑信息
    'DETAILS_CATEGORY_LIST': domain + '/admin/business/list/getData' + debug, //详情配置列表
    'HOME_MOVE_UP': domain + '/admin/business/list/upDown' + debug, //首页配置上移
    'HOME_MOVE_DOWN': domain + '/admin/business/list/upDown' + debug, //首页配置下移
    'DETAILS_MOVE_DOWN': domain + '/admin/business/list/upDown' + debug, //详情配置下移
    'DETAILS_MOVE_UP': domain + '/admin/business/list/upDown' + debug, //详情配置上移
    'DETAILS_DIFFER_SERV': domain + '/merchant/loginStatus' + debug, //详情业务选项
    'ACTIVITY_CATEGORY_LIST': domain + '/admin/businessAct/list/getData' + debug, //活动配置列表
    'ACTIVITY_MOVE_DOWN': domain + '/admin/businessAct/list/upDown' + debug, //活动配置下移
    'ACTIVITY_MOVE_UP': domain + '/admin/businessAct/list/upDown' + debug, //活动配置上移
    'ACTIVITY_EDIT_INFORMATION': domain + '/admin/businessAct/list/addOrUpdate' + debug, //活动配置编辑
    'DELETE_HOME': domain + '/admin/business/list/delete' + debug, //首页删除
    'DELETE_ACTIVITY': domain + '/admin/businessAct/list/delete' + debug, //首页删除
    'GET_ITEM_CATEGORY_LIST': domain + '/admin/business/getItemCategoryList' + debug,
    'CHANGE_PAY_STATUS': domain + '/admin/withdraw/updateGroupMoneyStatus' + debug, // 修改打款状态
    'CHANGE_ACCEPT': domain + '/admin/withdraw/updateGroupStatus' + debug, // 批量修改通过
    'SUBMIT_PSW': domain + '/admin/updatePassword' + debug, // 修改密码
    'GET_USER_INFO': domain + '/admin/merchantInfo' + debug, // 获取用户的信息

    // 授权地区
    'GET_JOB_NUM': domain + '/admin/user/subMerchantList' + debug, // 获取商户工号
    'CONFIRM_INFO': domain + '/admin/authorize/updateMerchantAuthorizeArea' + debug, // 提交授权信息
    'GET_AREA_LIST_NEW': domain + '/admin/authorize/getAuthorizeAreaList' + debug, // 获取授权地区列表
    'DELETE_CON': domain + '/admin/authorize/deleteAuthorizeInfo' + debug, // 删除
    'GET_FETCH_SECTION_AREA': domain + '/admin/authorize/getAuthorizeRegionList' + debug, // 获取部分地区的数据

    // hjy
    // 商户管理
    'GET_USER': domain + '/front/user/getInfo' + debug, //获取当前登录信息
    'GET_AREA': domain + '/admin/authorize/regionList' + debug, //获取省市
    'GET_ROLE_LIST': domain + '/admin/role/list' + debug, //角色列表

    'GET_USER_LIST': domain + '/admin/user/data' + debug, //商户列表（用户管理）
    'GET_ACCOUNT_LIST': domain + '/admin/user/withdrawAccountList' + debug, //商户账户列表（用户管理）
    'FROZEN': domain + '/admin/user/frozenWithdrawAccount' + debug, //提现冻结/解冻
    'GET_ROLE_TYPE': domain + '/admin/role/list' + debug, //角色列表（用户管理）
    'EDIT_USER': domain + '/admin/user/detailInfo' + debug, //编辑（用户管理）
    'CHECK_STATUS': domain + '/admin/user/bank/pipei/check' + debug, //编辑（用户管理）
    'UPDATE_USER': domain + '/admin/user/update' + debug, //新增或提交（用户管理）
    'GET_ROLE_ADD': domain + '/admin/role/able/create' + debug, //新增用户可选择的角色（用户管理）
    'GET_ROLE_FORM': domain + '/admin/role/permission/list' + debug, //获取添加角色列表（用户管理）
    'UPDATA_ROLE_FORM': domain + '/admin/role/permission/update' + debug, //tijiao角色列表（用户管理）
    'GET_AREA_LIST': domain + '/admin/authorize/dataList' + debug, //授权地区列表（授权地区）
    'UPDATA_ADDRESS_ITEM': domain + '/admin/authorize/updatePermissonRegion' + debug, //单独修改授权地区（授权地区）
    'UPDATA_ADDRESS_ALL': domain + '/admin/authorize/updateGroupPermisssionRegion' + debug, //批量修改授权地区（授权地区）
    'GET_DISCOUNT_LIST': domain + '/admin/discount/dataList' + debug, //折扣设置列表（折扣设置）
    'GET_DISCOUNT_DATA': domain + '/admin/discount/dataDetail' + debug, //折扣数据详情（折扣设置）
    'GET_DISCOUNT_DETAIL': domain + '/admin/discount/itemData' + debug, //折扣商品列表（折扣设置）
    'UPDATA_DISCOUNT_ITEM': domain + '/admin/discount/data/update' + debug, //单独折扣设置（折扣设置）
    'UPDATA_DISCOUNT_ALL': domain + '/admin/discount/group/data/update' + debug, //批量折扣设置详情（折扣设置）

    'SUBMIT_PICTURE': domain + '/admin/huabei/file/upload' + debug, //批量折扣设置详情（折扣设置）

    // 订单管理
    'GET_ORDER_LIST': domain + '/admin/order/getData' + debug, //订单列表（订单管理）
    'GET_ORDER_TYPE': domain + '/front/orderType' + debug, //订单列表（订单管理）
    'ADD_ORDER_COMPLAIN': domain + '/admin/order/complain/addComplain' + debug, //登记投诉（订单管理）
    'GET_COMPLAIN_LIST': domain + '/admin/order/complain/getPage' + debug, //投诉管理列表（投诉管理）
    'GET_COMPLAIN_ACTIVE': domain + '/admin/order/complain/execute' + debug, //投诉管理列表（投诉管理）
    'GET_PAY_BACK': domain + '/admin/order/complain/complainDeductMoney' + debug, //扣款操作（投诉管理）
    'GET_COUNT_LIST': domain + '/admin/order/tongji/getData' + debug, //订单统计列表（订单统计）
    'GET_AREA_STATIC': domain + '/admin/areaList' + debug, //地区统计列表（地区统计）

    // 其他业务(蚂蚁花呗)
    'GET_MERCHANT_LIST': domain + '/admin/huabei/huabeiMerchantData' + debug, //商户列表（商户管理）
    'GET_STORE_LIST': domain + '/admin/huabei/huabeiStoreData' + debug, //门店列表（门店管理）
    'GET_ANT_ORDER_LIST': domain + '/admin/huabei/orderData' + debug, //订单列表（订单管理）
    'ADD_ANT_MERCHANT': domain + '/admin/huabei/huabeiMerchantUpdate' + debug, //添加花呗商户
    'EDIT_ANT_MERCHANT': domain + '/admin/huabei/huabeiMerchantUpdate' + debug, //编辑花呗商户
    'DELETE_ANT_MERCHANT': domain + '/admin/huabei/merchant/delete' + debug, //编辑花呗商户
    'GET_ANT_MERCHANT': domain + '/admin/huabei/getMerchantList' + debug, //获取花呗商户信息
    'ADD_ANT_STORE': domain + '/admin/huabei/huabeiStoreUpdate' + debug, //添加花呗门店
    'EDIT_ANT_STORE': domain + '/admin/huabei/huabeiStoreUpdate' + debug, //编辑花呗门店
    'DELETE_ANT_STORE': domain + '/admin/huabei/store/delete' + debug, //删除花呗门店
    'STORE_LIST': domain + '/admin/huabei/getHuabeiMerchantList' + debug, //门店列表
    'MERCHANT_DETAIL': domain + '/admin/huabei/merchant/find' + debug, //门店列表
    'PROVINCE': domain + '/admin/huabei/region/data' + debug, //门店列表
    'UPLOAD': domain + '/admin/huabei/file/upload' + debug, //门店列表

    'INCOME_SUM': domain + '/admin/account/getAccountStatisticByTime' + debug, //结算核对
    'GET_ACCOUNT_GROUP': domain + '/admin/account/getOrderTypeCategoryIncomeStatisticByTime' + debug, //结算核对组合
    'GET_CHECK_INCOME': domain + '/admin/account/getJlAccountDetailByPage' + debug, //结算核对列表

    'GET_ZFB_CHECK': domain + '/admin/account/alipayNewList' + debug, //支付宝拉新记账核对（数据列表）
    'EDIT_ZFB_DATA': domain + '/admin/account/updateAlipayNew' + debug, //支付宝拉新记账核对（编辑/新建）
    'EDIT_ZFB_SUM': domain + '/admin/account/statisticAlipayNew' + debug, //支付宝拉新记账核对（合计）
    'GET_TOTAL_ACCOUNT': domain + '/admin/account/statisticSystemIncome' + debug, //账户总收入列表

    //电信数据
    'GET_TELECOM_DATA': domain + '/admin/tyyd/tyydOrderList' + debug,            //获取列表
  },

  // 花呗商户新建或修改： http://prev-quan.51jujibao.com?id= &jlMerchantId= &merchantName= &email= &contact= &mobile= &zfbType= &provinceCityDistrictCode= &zfbAccount= &zfbCertificateName= &org= &license= &licenseUrl= &identityCard1= &identityCard1Url= & identityCard2= &identityCard2Url= &shopPhoto1= &shopPhoto1Url= &shopPhoto2= &shopPhoto2Url=
  PAGE_SIZE: 6,
  PAGE_MAX_SIZE: 12
}

export default CONFIG
