<template>
  <div class="home">
    <el-container>
      <el-aside width="225px">
        <div class="logo" @click="toBreak">聚乐管理后台</div>
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          background-color="#001529"
          text-color="#c2c4c6"
          active-text-color="#fff"
          :unique-opened=true
          router>
          <div v-for="(item, index) in menu" :key="index">
            <el-submenu v-if="item.childMenus&&item.childMenus.length!==0" :index="item.name">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(son,i) in item.childMenus" :key="i" :index="son.linkUrl">
                {{son.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.linkUrl">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- <span class="out-login" @click="outLogin">退出登录</span> -->
          <el-dropdown  class="out-login" trigger="click">
           <span class="el-dropdown-link">
             <i class="iconfont icon-yonghu" style="color: #fa8c16;"></i>
             {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
           <el-dropdown-menu slot="dropdown">
             <el-dropdown-item  @click.native="accountInfo">账号信息</el-dropdown-item>
             <el-dropdown-item  @click.native="changePsw">修改密码</el-dropdown-item>
             <el-dropdown-item  @click.native="outLogin">退出登录</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>

         <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div></div>
            <div></div>
          </el-collapse-item>
        </el-collapse> -->
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import * as core from '../../core/commonApi'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        menu: [],
        userName: '',
      }
    },
    created(){
      this.getMenu();
      this.getUserInfo();
      // this.menu= [{
      //   name: '用户管理',
      //   icon: 'icon-yhgl',
      //   childMenus: [
      //     {linkUrl: 'user-management', name: '用户管理'},
      //     {linkUrl: 'role-management', name: '角色管理'},
      //     {linkUrl: 'authorized-area', name: '授权地区'},
      //     {linkUrl: 'set-discount', name: '折扣设置'}]
      // }, {
      //   name: '账户收入',
      //   icon: 'icon-shouru',
      //   childMenus: [
      //     {linkUrl: 'general-income', name: '账户总收入'},
      //     {linkUrl: 'financial-details', name: '财务明细'}]
      // }, {
      //   name: '订单管理',
      //   icon: 'icon-ddzx',
      //   childMenus: [
      //     {linkUrl: 'order-form', name: '订单列表'},
      //     {linkUrl: 'complain', name: '投诉管理'},
      //     {linkUrl: 'order-statistics', name: '订单统计'}]
      // }, {
      //   name: '结算管理',
      //   icon: 'icon-jiesuan',
      //   childMenus: [
      //     {linkUrl: 'withdrawal-list', name: '提现列表'},
      //     {linkUrl: 'money-record', name: '支付宝打款记录'}]
      // },{
      //   icon: 'icon-jifen',
      //   linkUrl: 'quota',
      //   name: '移动积分核销限额'
      // }, {
      //   name: '聚乐页面配置',
      //   icon: 'icon-ympz',
      //   childMenus: [
      //     {linkUrl: 'classify-category', name: '首页配置'},
      //     // {path: 'home-category', name: '首页配置'},
      //     {linkUrl: 'activity', name: '活动赚钱页'}]
      // }, {
      //   name: '其他业务',
      //   icon: 'icon-yewu',
      //   childMenus: [
      //     {linkUrl: 'ant', name: '蚂蚁花呗'}]
      // }
      // ]
    },
    computed: {
      onRoutes() {
        let replaceKey = this.$route.path.replace('/', '')
        return replaceKey
      }
    },
    methods: {
      outLogin(){
        core.outLogin().then(data=>{
          if (data.code&&'00'===data.code){
            this.$router.push({path:'/login'})
          } else {
            this.$message.error(data.message)
          }
        })
      },

      getUserInfo() {
        core.getUserInfo({}).then(data => {
          if (data.code && '00' === data.code) {
            this.userName = data.result.username;
          } else {
            this.$message.error(data.message)
          }
        })
      },
      accountInfo(){
        this.$router.push({path: '/accountInfo'})
      },
      changePsw(){
        this.$router.push({path: '/changePsw'})
      },
      getMenu(){
        core.menu().then(data=>{
          if (data.code&&'00'===data.code){
            this.menu=data.result
          }else if (data.code && 'unlogin'===data.code){
            this.$router.push({path:'/login'})
          } else {
            this.$message.error(data.message)
          }
        })
      },
      toBreak() {
        this.$router.push({path: '/user-management'})
      }
    }
  }
</script>
<style>
  @import "//at.alicdn.com/t/font_880620_ihdd1gm7hre.css"
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .iconfont {
      font-family: "iconfont" !important;
  }

  .out-login{
    float: right;
    line-height: 64px;
    margin-right: 52px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    position: relative;
  }
  .out-login:before{
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
  }
  .el-menu-item.is-active.el-menu-item.is-active {
    background-color: #1890ff !important;
  }

  .el-menu {
    border: 0;
  }

  .home, .el-container {
    width: 100%;
    height: 100%;
  }

  .logo {
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #fffefe;
    font-size: 30px;
    cursor: pointer;
  }

  .el-aside {
    background-color: #001529;
    box-shadow: 1px 1px 6px 0px rgba(0, 21, 41, 0.35);
    z-index: 2;
  }

  .el-menu-item {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin: 4px 0;
  }

  .el-main {
    width: 100%;
    height: 100%;
    padding: 0px 32px 24px 32px;
    background-color: #f0f2f5;
    overflow: hidden;
  }

  .el-header {
    height: 64px !important;
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.08);
    z-index: 1;
  }
  .el-submenu [class^=el-icon-]{
    width: inherit;
    margin-right: 0;
  }
</style>
<style>
  .home .el-submenu__title {
    font-size: 16px;
  }
</style>
