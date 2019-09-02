<template>
  <div class="login">
    <div class="login-module">
      <div class="inner-box">
        <div class="login-title"></div>
        <div class="input-box">
        <el-input placeholder="用户名" id="user" @focus="mobileFocus"
                  v-model="emailValue"
                  class="login-input login-email-input">
          <template slot="prepend"><i class="login-icon login-email-icon"></i>
          </template>
        </el-input>
        <p class="login-email-tips">{{emailTips}}</p>
        <el-input placeholder="密码" id="mima" @focus="psdFocus"
                  v-model="psdValue" @keyup.enter.native="makeSureStyle"
                  type='password' class="login-input login-psd-input">
          <template slot="prepend"><i class="login-icon login-psd-icon"></i>
          </template>
        </el-input>
        <p class="login-email-tips">{{psdTips}}</p>
        <el-button type="primary" class="login-btn" @click="makeSureStyle">登&nbsp;&nbsp;录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as core from '../../core/commonApi'

  export default {
    name: 'Login',
    data() {
      return {
        emailTips: '',
        psdTips: '',
        emailValue: '',
        psdValue: '',
      }
    },
    methods: {
      clickLogin() {
        core.userLogin({
          'mobile': this.emailValue,
          'password': this.psdValue
        }).then(data => {
          if (data.code && data.code == '00') {
            // window.location.href = '/'
            this.$router.push({path:'/user-management'})
          } else {
            this.$message.error(data.message);
          }
        })
      },
      makeSureStyle() {
        if (this.emailValue == '') {
          document.getElementById('user').classList.add('flag')
          this.emailTips = '请输入用户名';
          return false
        } else {
          document.getElementById('user').classList.remove('flag')
        }
        if (!this.psdValue) {
          document.getElementById('mima').classList.add('flag')
          this.psdTips = '请输入密码';
          return false
        } else {
          document.getElementById('mima').classList.remove('flag')
        }
        this.clickLogin()
      },
      mobileFocus() {
        document.getElementById('user').classList.remove('flag')
        this.emailTips = '';
        this.psdTips = ''
      },
      psdFocus() {
        document.getElementById('mima').classList.remove('flag')
        this.psdTips = ''
      },
      isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        return reg.test(str)
      }

    }
  }
</script>

<style scoped>
  .login-btn {
    margin-top: 32px;
  }

  .login {
    height: 100%;
    background: #78b4f2 url('https://c1.51jujibao.com/static/mod/juleERP/static/images/bg.jpg') no-repeat fixed top;
    background-size: 100% 100%;
    position: relative
  }
  .login-module {
    width: 520px;
    height: 440px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #b5bcd2;
    border-radius: 8px;
  }
  .inner-box{
    box-sizing: border-box;
    margin: 10px auto 0;
    width: 500px;
    height: 420px;
    padding-top: 49px;
    background-color: rgba(225,225,225,0.3);
    border-radius: 8px;
  }

  .login-module .login-title {
    width: 100%;
    height: 42px;
    background: url("../../../static/images/julehui.png") no-repeat center/contain;
  }
  .input-box{
    padding-top:49px ;
    padding-left: 24px;
  }

  .login-module p {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: red;
  }

  .el-button {
    width: 452px;
    height: 48px;
    font-size: 24px;
  }
</style>
<style>
  .login .el-input-group--prepend .el-input__inner, .el-input-group__append {
    border-radius: 5px;
  }

  .login .login-module .el-input input {
    display: inline-block;
    width: 452px;
    height: 48px !important;
    padding-left: 58px;
    font-size: 24px;
    border: 2px solid #e0e0e0;
  }

  .login .login-module .el-input input:focus {
    border: 2px solid #1890ff;
  }

  .login .login-module .el-input .flag {
    border: 2px solid #f4222c !important;
  }

  .login .el-input-group__prepend {
    position: absolute;
    top: 17px;
    left: 18px;
    border: 0;
    padding: 0px;
    background-color: #fff;
  }

  .login-icon {
    display: inline-block;
    width: 20px;
    height: 22px;
  }

  .login-email-icon {
    background: url('../../../static/images/user_icon.png') no-repeat center;
    background-size: 100% 100%;
  }

  .login-psd-icon {
    background: url('../../../static/images/password_icon.png') no-repeat center;
    background-size: 100% 100%;
  }
</style>
