<template>
  <div class="user-management">
    <h1 class="page-title">用户管理 / 用户管理</h1>
    <div class="container">
      <div class="input-container">
        <el-form :inline="true" label-width="85px" label-position="center">
          <el-form-item label="工号：">
            <el-input style="width: 105px" v-model="workNum" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select style="width: 105px" v-model="roleSelect" placeholder="请选择">
              <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
              <el-option v-for="item in selectRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户名称：">
            <el-input style="width: 105px" v-model="manageName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="上级工号：">
            <el-input style="width: 105px" v-model="prevManager" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input style="width: 105px" v-model="realName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input style="width: 105px" v-model="mobile" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="锁定状态：">
            <el-select style="width: 105px" v-model="lockStatus" placeholder="请选择">
              <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
              <el-option label="锁定" value="Y"></el-option>
              <el-option label="未锁定" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select style="width: 105px" v-model="checkStatus" placeholder="请选择">
              <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核中" value="0"></el-option>
              <el-option label="未通过" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <div style="display:flex;justify-content: space-between">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="selectBtn">查询
              </el-button>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID">
            <template slot-scope="scope">
              <p v-if="scope.row.roleName ==='操作员'" type="text" size="small">{{scope.row.merchantId}}</p>
              <p v-else type="text" size="small">{{scope.row.id}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="工号"></el-table-column>
          <el-table-column prop="merchantName" label="商户名称"></el-table-column>
          <el-table-column prop="roleName" label="角色"></el-table-column>
          <el-table-column prop="ratio" label="已/可建用户数" width="120"></el-table-column>
          <el-table-column prop="pName" label="上级工号"></el-table-column>
          <!--<template v-if="!showFlag">-->
          <el-table-column prop="province" label="所在省"></el-table-column>
          <el-table-column prop="city" label="所在市"></el-table-column>
          <el-table-column prop="bankName" label="银行名称" width="110"></el-table-column>
          <el-table-column prop="realname" label="真实姓名"></el-table-column>
          <el-table-column prop="alipay" label="支付宝账号" width="110"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="110"></el-table-column>
          <el-table-column prop="bankRealnameCheck" label="姓名与卡号匹配" width="120">
            <template slot-scope="scope">
              <!--<p type="text" size="small" @click="toCheck(scope.row)">检测</p>-->
              <p v-if="scope.row.bankRealnameCheck ===0" style="color: #1890ff;" type="text" size="small"
                 @click="toCheck(scope.row)">检测</p>
              <p v-if="scope.row.bankRealnameCheck ===1" type="text" size="small" @click="toCheck(scope.row)"
                 style="color:#09bb07">匹配成功</p>
              <p v-if="scope.row.bankRealnameCheck ===-1" type="text" size="small" @click="toCheck(scope.row)"
                 style="color:#d50a0a">匹配失败</p>
            </template>
          </el-table-column>
          <!--</template>-->
          <el-table-column prop="check" label="审核状态">
            <template slot-scope="scope">
              <p v-if="scope.row.check ===1" type="text" size="small">审核通过</p>
              <p v-if="scope.row.check ===0" type="text" size="small">审核中</p>
              <p v-if="scope.row.check ===-1" type="text" size="small">审核未通过</p>
            </template>
          </el-table-column>
          <el-table-column prop="isLock" label="锁定状态">
            <template slot-scope="scope">
              <p v-show="scope.row.isLock ==='N'" type="text" size="small">未锁定</p>
              <p v-show="scope.row.isLock ==='Y'" type="text" size="small">锁定</p>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="action" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="false" size="mini" @click="userEdit(scope.row)" type="text">
                <el-tooltip popper-class="popper-btn__tip" content="编辑" placement="top">
                  <i class="icon-bianji"></i>
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div v-show="pageTotal>0" class="pagination-box">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          layout="sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {toThousands} from '../../../static/js/util'
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'user-management',
    data() {
      return {
        loading: false,
        selectAll: {
          label: '全部',
          value: ''
        },

        workNum: '',
        roleSelect: '',
        manageName: '',
        prevManager: '',
        realName: '',
        mobile: '',
        lockStatus: '',
        checkStatus: '',
        individualStatus:'',

        match: '',

        tableData: [],  //数据列表
        selectRoleList: [],  //角色列表
        lockStatusList: [],
        checkStatusList: [],

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
      }
    },
    created() {
      this.selectRole()
      this.getTableList()
      // this.getUser()
    },
    methods: {
      pageSizeChange(value) {
      this.currentPage=1
      this.pageSize=value
      this.getTableList()
    },
    //获取数据列表
      getTableList() {
        this.loading = true
        core.fetchUserList({
          'username': this.workNum ? this.workNum : '',
          'roleId': this.roleSelect ? this.roleSelect : 0,
          'merchantName': this.manageName ? this.manageName : '',
          'pName': this.prevManager ? this.prevManager : '',
          'realname': this.realName ? this.realName : '',
          'mobile': this.mobile ? this.mobile : '',
          'isLock': this.lockStatus ? this.lockStatus : '',
          'check': this.checkStatus ? this.checkStatus : null,
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.loading = false
            this.pageTotal = data.result.amount
            if (data.result.data) {
              this.tableData = data.result.data.map(item => {
                return {
                  id: item.id,
                  username: item.username,
                  merchantName: item.merchantName,
                  roleName: item.roleName,
                  pName: item.pName,
                  province: item.province,
                  city: item.city,
                  bankName: item.bankName,
                  realname: item.realname,
                  ratio: `${item.subMerchantNumber}/${item.aliveNumber}`,
                  alipay: item.alipay,
                  mobile: item.mobile,
                  bankRealnameCheck: item.bankRealnameCheck,
                  check: item.check,
                  isLock: item.isLock,
                  remark: item.remark,
                  merchantId: item.merchantId
                }
              })
              this.total = data.result.amount
            } else {
              this.tableData = []
            }
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      exportData() {
        window.location.href = '/admin/user/data/export?' + '&username=' + this.workNum + '&roleId=' + this.roleSelect + '&merchantName=' + this.manageName + '&pName=' + this.prevManager + '&realname=' + this.realName + '&mobile=' + this.mobile + '&isLock=' + this.lockStatus + '&check=' + this.checkStatus
      },
      // 获取角色列表
      selectRole() {
        core.fetchRoleType({}).then(data => {
          if (data.code == "00" && data.result) {
            this.selectRoleList = data.result;
          }
        })
      },
      // getUser() {
      //   core.fetchUser({}).then(data => {
      //     if (data.code && data.code == '00') {
      //       this.form.role = data.result.roleName
      //       if (this.form.role == '商户') {
      //         this.showFlag = false
      //       }
      //     }
      //   })
      // },
      // 检测
      toCheck(e) {
        core.checkStatus({
          'merchantId': e.merchantId
        }).then(data => {
          if (data.code && data.code == '00') {
            if (data.result == 'SUCCESS') {
              e.bankRealnameCheck = 1
            } else {
              e.bankRealnameCheck = -1
            }
          } else {
            this.$message(data.message)
          }
        })
      },
      //查询
      selectBtn() {
        this.currentPage = 1
        this.getTableList()
      },

      addUser() {
        this.$router.push({path: '/add-user'})
      },
      userEdit(e) {
        let roleId=0
        for (var i=0;i<this.selectRoleList.length;i++){
          if (this.selectRoleList[i].name===e.roleName){
            roleId=this.selectRoleList[i].id
          }
        }
        console.log(roleId)
        this.$router.push({
          path: '/add-user',
          query: {merchantId: e.merchantId, id: e.id, roleName: e.roleName, roleId: roleId}
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableList()
      },
    },
  }
</script>
<style>

</style>
<style scoped>
  .icon-bianji {
    font-size: 25px;
  }
</style>
