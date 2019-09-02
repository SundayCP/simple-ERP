<template>
  <div class="accountInfo">
    <h1 class="page-title">账户信息</h1>
    <div class="container">
      <div class="" style="border-bottom: dashed 1px #d9d9d9;padding-bottom: 10px;font-size: 16px;">
        账户信息
      </div>
      <div class="">
        <div style="margin-bottom: 32px;margin-top: 20px;"><span class="list">我的账号：</span><span class="listTxt">{{userInfo.username ? userInfo.username : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">商户名称：</span><span class="listTxt">{{userInfo.merchantName ? userInfo.merchantName : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">角色：</span><span class="listTxt">{{userInfo.roleName ? userInfo.roleName : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">省市：</span><span class="listTxt">{{userInfo.province + userInfo.city ? userInfo.province + userInfo.city : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">银行名称：</span><span class="listTxt">{{userInfo.bankName ? userInfo.bankName : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">银行卡号：</span><span class="listTxt">{{userInfo.bankNum ? userInfo.bankNum : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">真实姓名：</span><span class="listTxt">{{userInfo.realname ? userInfo.realname : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">支付宝账户：</span><span class="listTxt">{{userInfo.alipay ? userInfo.alipay : '--'}}</span></div>
        <div style="margin-bottom: 32px;"><span class="list">手机号码：</span><span class="listTxt">{{userInfo.mobile ? userInfo.mobile : '--'}}</span></div>
        <div style="margin-bottom: 32px;">
          <span class="list" style="vertical-align: top;margin-top: 10px;">证件信息：</span>
          <span style="display: inline-block;">
            <span class="imgList icon" :style="'background-image: url('+userInfo.businessLicense+')'"></span>
            <span class="imgList icon" :style="'background-image: url('+userInfo.idCardFront+')'"></span>
            <span class="imgList icon" :style="'background-image: url('+userInfo.idCardReverse+')'"></span>
          </span>
        </div>
        <div style="margin-bottom: 32px;"><span class="list">备注信息：</span><span class="listTxt">{{userInfo.remark ? userInfo.remark : '--'}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as core from '../../core/settlementManagementApi'
  import CONFIG from '../../core/config'

  export default {
    name: 'accountInfo',
    data() {
      return {
        userInfo:{}
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        this.loading = true
        core.getUserInfo({}).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.userInfo = data.result;
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },

    }
  }
</script>

<style scoped>

  .list{
    display: inline-block;
    width: 100px;
    text-align: right;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
  .listTxt{
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
  }
  .imgList{
    display: inline-block;
    width: 96px;height: 96px;
    border-radius: 4px;
	  border: dashed 1px #d9d9d9;
    margin-right: 12px;
  }
  .icon{
    width: 96px;height: 96px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
