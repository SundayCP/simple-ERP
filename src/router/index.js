import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/home'
import UserManagement from '@/components/user-management/user-management'
import AccountManage from '@/components/user-management/account-manage'
import AddUser from '@/components/user-management/add-user'
import RoleManagement from '@/components/user-management/role-management'
import addRole from '@/components/user-management/add-role'
import SetDiscount from '@/components/user-management/set-discount'
import editDiscount from '@/components/user-management/edit-discount'
import WithdrawalList from '@/components/settlement-management/withdrawal-list'
import TicketList from '@/components/settlement-management/ticket-list'
import MoneyRecord from '@/components/settlement-management/money-record'
import FinancialDetails from '@/components/income/financial-details'
import ZfbCheck from '@/components/income/zfbCheck'
import TotalAccount from '@/components/income/totalAccount'
import GeneralIncome from '@/components/income/general-income'
import CheckSettlement from '@/components/income/checkSettlement'
// import AuthorizedArea from '@/components/user-management/authorized-area'
import AuthorizedArea from '@/components/user-management/authorized-areaNew'

// import Ceshi from '@/components/income/table-ceshi'



import Quota from '@/components/quota/quota'
import Activity from '@/components/page-layout/activity'
import DetailsCategory from '@/components/page-layout/details-category'
import HomeCategory from '@/components/page-layout/home-category'
import ClassifyCategory from '@/components/page-layout/classify-category'
import Complain from '@/components/order-form/complain'
import OrderStatistics from '@/components/order-form/order-statistics'
import AreaStatistics from '@/components/order-form/area-statistics'
import OrderForm from '@/components/order-form/order-form'
import Ant from '@/components/other-business/ant'
import addAnt from '@/components/other-business/add-ant'
import TelecomData from '@/components/order-form/telecom-data'
import Login from '@/components/login/login'
import NotFind from '@/components/not-find/not-find'


import AccountInfo from '@/components/common/accountInfo'   //新增账户信息
import ChangePsw from '@/components/common/changePsw'   //新增修改密码

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: "/user-management",
      children: [{
        path: '/user-management',
        name: 'UserManagement',
        component: UserManagement,
      },{
        path: '/account-manage',
        name: 'AccountManage',
        component: AccountManage,
      }, {
        path: '/add-user',
        name: 'AddUser',
        component: AddUser,
      }, {
        path: '/role-management',
        name: 'RoleManagement',
        component: RoleManagement,
      }, {
        path: '/add-role',
        name: 'addRole',
        component: addRole,
      }, {
        path: '/set-discount',
        name: 'SetDiscount',
        component: SetDiscount,
      }, {
        path: '/edit-discount',
        name: 'editDiscount',
        component: editDiscount,
      }, {
        path: '/withdrawal-list',
        name: 'WithdrawalList',
        component: WithdrawalList,
      },{
        path: '/ticket-list',
        name: 'TicketList',
        component: TicketList,
      }, {
        path: '/money-record',
        name: 'MoneyRecord',
        component: MoneyRecord,
      }, {
        path: '/financial-details',
        name: 'FinancialDetails',
        component: FinancialDetails,
      }, {
        path: '/authorized-area',
        name: 'AuthorizedArea',
        component: AuthorizedArea,
      }, {
        path: '/quota',
        name: 'Quota',
        component: Quota,
      }, {
        path: '/activity',
        name: 'Activity',
        component: Activity,
      }, {
        path: '/home-category',
        name: 'HomeCategory',
        component: HomeCategory,
      }, {
        path: '/general-income',
        name: 'GeneralIncome',
        component: GeneralIncome,
      }, {
        path: '/check-settlement',
        name: 'CheckSettlement',
        component: CheckSettlement,
      },{
        path: '/zfb-check',
        name: 'ZfbCheck',
        component: ZfbCheck,
      },{
        path: '/total-account',
        name: 'TotalAccount',
        component: TotalAccount,
      }, {
        path: '/complain',
        name: 'Complain',
        component: Complain,
      }, {
        path: '/order-statistics',
        name: 'OrderStatistics',
        component: OrderStatistics,
      }, {
        path: '/area-statistics',
        name: 'AreaStatistics',
        component: AreaStatistics,
      }, {
        path: '/order-form',
        name: 'OrderForm',
        component: OrderForm,
      }, {
        path: '/ant',
        name: 'Ant',
        component: Ant,
      },
        {
          path: '/add-ant',
          name: 'addAnt',
          component: addAnt,
        }, {
          path: '/classify-category',
          name: 'ClassifyCategory',
          component: ClassifyCategory,
        }, {
          path: '/details-category',
          name: 'DetailsCategory',
          component: DetailsCategory,
        }, {
          path: '/telecom-data',
          name: 'TelecomData',
          component: TelecomData,
        }, {
          path: '/accountInfo',
          name: '账户信息',
          component: AccountInfo,
        }, {
          path: '/changePsw',
          name: '修改密码',
          component: ChangePsw,
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '*',
      // name: 'NotFind',
      // component: NotFind,
      redirect: "/user-management"
    },
    // {
    //   path: '/Ceshi',
    //   name: '测试',
    //   component: Ceshi,
    // },
  ]
})
