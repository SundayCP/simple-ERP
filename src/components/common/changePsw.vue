<template>
<div class="changePsw">
  <h1 class="page-title">修改密码</h1>
  <div class="container">
    <div class="" style="border-bottom: dashed 1px #d9d9d9;padding-bottom: 10px;font-size: 16px;">
      修改密码
    </div>
    <div class="">
      <div style="margin-bottom: 32px;margin-top: 20px;">
        <span class="list">我的账号：</span>
        <span>{{userName}}</span>
      </div>
      <div style="margin-bottom: 16px;">
        <span class="list">旧密码：</span>
        <span style="display:inline-block">
          <el-input placeholder="请输入旧密码" v-model.trim="oldPsw" clearable @input="change('1')">
          </el-input>
        </span>
        <div class="errorShow" v-show="errorShow">
          旧密码不能为空!
        </div>
      </div>
      <div style="margin-bottom: 16px;">
        <span class="list">新密码：</span>
        <span style="display:inline-block">
          <el-input placeholder="请输入新密码" v-model.trim="newPsw" clearable @input="change('2')">
          </el-input>
        </span>
        <div class="errorShow" v-show="errorShow2">
          新密码不能为空!
        </div>
      </div>
      <div style="margin-bottom: 16px;">
        <span class="list">再次确认新密码：</span>
        <span style="display:inline-block">
          <el-input placeholder="请再次输入新密码" v-model.trim="newAgain" clearable @input="change('3')">
          </el-input>
        </span>
        <div class="errorShow" v-show="errorShow3">
          确认密码不能为空!
        </div>
      </div>
    </div>
    <div style="margin-left:365px;">
        <el-button type="primary" :disabled="disabled" @click.native="submitPsw">提交</el-button>
    </div>
  </div>
</div>
</template>

<script>
import * as core from '../../core/settlementManagementApi'
import CONFIG from '../../core/config'

export default {
  name: 'changePsw',
  data() {
    return {
      userName: "",
      oldPsw: "",
      newPsw: "",
      newAgain: "",
      errorShow: true,
      errorShow2: true,
      errorShow3: true,
      disabled: true,
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    change(value) {
      if(value == '1'){
        if(!this.oldPsw){
          this.errorShow = true;
          this.disabled = true;
        }else if(this.newPsw && this.newAgain){
          this.disabled = false;
          this.errorShow = false;
        }else{
          this.errorShow = false;
        }
      }else if(value == '2'){
        if(!this.newPsw){
          this.errorShow2 = true;
          this.disabled = true;
        }else if(this.oldPsw && this.newAgain){
          this.disabled = false;
            this.errorShow2 = false;
        }else{
          this.errorShow2 = false;
        }
      }else if(value == '3'){
        if(!this.newAgain){
          this.errorShow3 = true;
          this.disabled = true;
        }else if(this.newPsw && this.oldPsw){
          this.disabled = false;
            this.errorShow3 = false;
        }else{
          this.errorShow3 = false;
        }
      }
    },

    getUserInfo() {
      this.loading = true
      core.getUserInfo({}).then(data => {
        if (data.code && '00' === data.code) {
          this.loading = false
          this.userName = data.result.username;
        } else {
          this.loading = false
          this.$message.error(data.message)
        }
      })
    },

    submitPsw(){
      this.loading = true
      core.submitPsw({
          'oldPsw': this.oldPsw,
          'newPsw': this.newPsw,
          'newAgain': this.newAgain,
      }).then(data => {
        if (data.code && '00' === data.code) {
          this.loading = false
          var that = this;
          this.$message({
            message: '提交成功',
            type: 'success',
            onClose: function(){
                that.$router.push({path:'/login'})
            }
          });
        } else {
          this.loading = false
          this.$message.error(data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.container{
  padding: 97px 40px 1000px;
}
.el-button--primary{
  padding: 12px 30px;
}
.list {
  display: inline-block;
  width: 140px;
  text-align: right;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}

.errorShow {
  margin-left: 160px;
  margin-top: 10px;
  color: #d50a0a;
  font-size: 14px;
}
</style>
<style>
.changePsw .el-input--suffix .el-input__inner {
  width: 312px;
}
</style>
