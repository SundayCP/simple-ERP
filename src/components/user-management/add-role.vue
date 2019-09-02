<template>
  <div class="add-role">
    <h1 class="page-title">用户管理 / 角色管理</h1>
    <div class="container">
      <el-form ref="form" :model="form" label-width="85px">
        <div style="display:flex;justify-content: space-between">
          <el-form-item label="角色名称：">
            <el-input v-model="form.role" style="width: 105px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </div>
        <div style="margin-top: 20px;" v-for="item in form.formList">
          <p style="border-bottom: 1px dashed #d9d9d9;line-height: 24px;">{{item.permissionName}}</p>
          <el-checkbox-group v-model="checkedList" style="margin-top: 16px;" @change="test">
            <el-checkbox v-for="(item2,index) in item.subList" :label="item2.permissionId" :key="index">
              {{item2.permissionName}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {toThousands} from '../../../static/js/util'
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'

  export default {
    name: "add-role",
    data() {
      return {
        checkedList:[],
        form: {
          formList: [],
          role: '',
        },
        type: '',
        checked:[],
        isIndeterminate: true,
        checkedStr:[],
      }
    },
    created() {
      this.getFormList()
    },
    methods: {
      test(val){},
      getFormList() {
        core.getRoleForm({
          'roleId': this.$route.query.roleId,
        }).then(data => {
          if (data.code && data.code == '00') {
            this.form.role = this.$route.query.name
            this.form.formList = data.result
            this.checked=[]
            for(var i=0;i<this.form.formList.length;i++){
              this.checked = this.checked.concat(this.form.formList[i].subList.filter(item => item.roleHasPermission))
            }
            for(var j=0;j<this.checked.length;j++){
              this.checkedList.push(this.checked[j].permissionId)
            }
          }
        })
      },
      submit() {
        core.submitRoleForm({
          'roleId': this.$route.query.roleId,
          'permissions': this.checkedList.join(',')
        }).then(data => {
          if(data.code && data.code == '00'){
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push({path:'/role-management'})
            },500)
          } else {
            this.$message.error(data.message)
          }
        })
      },

    },
  }
</script>

<style scoped>

</style>
