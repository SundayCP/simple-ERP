<template>
  <div class="set-discount">
    <h1 class="page-title">用户管理 / 折扣设置</h1>
    <div class="container">
      <!--<el-form>-->
        <el-form :inline="true">
          <el-form-item label="工号：" class="item">
            <el-input style="width: 105px" v-model="workNum" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="角色：" class="item">
            <el-select style="width: 105px" v-model="roleSelect" placeholder="请选择">
              <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
              <el-option v-for="(item,index) in selectRoleList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户名称：" class="item">
            <el-input style="width: 105px" v-model="manageName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="上级工号：" class="item">
            <el-input style="width: 105px" v-model="prevManager" placeholder=""></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button plain @click="selectBtn">查询</el-button>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>
        <template>
          <el-button type="primary" @click="setAll">批量设置折扣</el-button>
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="userList"
            v-loading.body="!loading"
            tooltip-effect="dark"
            style="width: 100%;margin-top: 16px;"
            @selection-change="handleSelectionChange">
            <el-table-column label="ID" type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="username" label="工号" width="120"></el-table-column>
            <el-table-column prop="merchantName" label="商户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pName" label="上级工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roleName" label="角色" show-overflow-tooltip></el-table-column>
            <el-table-column prop="action" label="折扣设置">
              <template slot-scope="scope">
                <el-button :disabled="false" size="mini" @click="setDiscount(scope.row)" type="text">
                  <el-tooltip popper-class="popper-btn__tip" content="设置" placement="top">
                    <i class="icon-shezhi"></i>
                  </el-tooltip>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      <!--</el-form>-->
      <el-dialog title="批量设置折扣" :visible.sync="dialogFormVisible" width="560px" class="dialog">
        <el-form :inline="true">
          <div class="production">
            <p class="head">产品折扣(%) &nbsp;&nbsp;<i style="color: rgba(0,0,0,0.4);font-size:12px">请输入产品对应的折扣，例如8折，输入80</i></p>
            <el-form-item v-for="(item,index) in productList" label-width="100px" :key="index" :label="item.name"
                          style="margin: 10px;">
              <el-input type="number" style="width: 35%;margin-left: 10px;" v-model="itemDiscounts1[index].rate" placeholder=""></el-input>
              <p style="display:inline-block;font-size:14px;" v-show="item.settlementType==='RATE'">%</p>
            </el-form-item>
          </div>
          <div class="activity" style="margin-top: 20px;">
            <p class="head">活动推广价(￥)&nbsp;&nbsp; <i style="color: rgba(0,0,0,0.4);font-size:12px">请输入产品对应的推广金额</i></p>
            <el-form-item v-for="(item,index) in activeList" label-width="100px" :key="index" :label="item.name"
                          style="margin: 10px">
              <el-input type="number" style="width: 35%;margin-left: 10px;" v-model="itemDiscounts2[index].fixedNum" placeholder=""></el-input>
              <p style="display:inline-block;font-size:14px;" v-show="item.settlementType==='FIXED_NUM'">
                ￥</p>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <div v-show="pageTotal>0" class="pagination-box">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          @size-change="handleSizeChange"
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
    name: 'set-discount',
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
        checkAll: false,
        isIndeterminate: true,
        // loading: true,

        merchantId: [],
        loginRoleName:'',


        userList: [],
        selectRoleList: [],
        productList: [],
        activeList: [],
        merchantIdStr: [],
        itemDiscounts1: [],
        itemDiscounts2: [],

        multipleSelection: [],
        dialogFormVisible: false,

        isEmpty:true,

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
      }
    },
    created() {
      this.selectRole()
      this.getDiscountList()
    },
    methods: {
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.getDiscountList()
      },
      getDiscountList() {
        this.loading = true
        core.fetchDiscountList({
          'username': this.workNum ? this.workNum : '',
          'roleId': this.roleSelect ? this.roleSelect : 0,
          'merchantName': this.manageName ? this.manageName : '',
          'pname': this.prevManager ? this.prevManager : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.pageTotal = data.result.amount
            this.userList = data.result.data
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      // 获取角色
      selectRole() {
        core.fetchRoleType({}).then(data => {
          if (data.code == "00" && data.result) {
            this.selectRoleList = data.result;
          }
        })
      },
      setDiscount(e) {
        this.$router.push({path: '/edit-discount', query: {merchantId: e.id,roleName:e.roleName}})
      },
      selectBtn() {
        this.currentPage = 1
        this.getDiscountList()
      },
      submit() {
        console.log(this.itemDiscounts1)
        for(let i=0;i<this.itemDiscounts1.length;i++){
          let item=this.itemDiscounts1[i]
          if(item.rate){
            this.isEmpty=false;
            break;
          }
        }
        console.log(this.isEmpty,111111111111)
        if(this.isEmpty){
          for(let i=0;i<this.itemDiscounts2.length;i++){
            let item=this.itemDiscounts2[i]
            if(item.fixedNum){
              this.isEmpty=false;
              break;
            }
          }
        }
        console.log(this.isEmpty,2222222222222222)
        if(this.isEmpty){
          this.$message.error('请输入折扣')
        }
        else{
          core.updataDicountAll({
            'merchantIdStr': this.merchantIdStr.join(),
            'itemDiscounts': this.itemDiscounts1.concat(this.itemDiscounts2),
          }).then(data => {
            if (data.code && data.code == '00') {
              this.dialogFormVisible = false
              this.$message({
                message: '批量设置成功！',
                type: 'success'
              });
            } else {
              this.$message.error(data.message)

            }
          })
        }
      },
      // 批量设置
      setAll() {
        if (this.multipleSelection.length <= 0) {
          this.$message.error('请选择')
        }
        else {
          this.dialogFormVisible = true
          core.fetchDiscountDetail({}).then(data => {
            if (data.code && data.code == '00') {
              this.productList = data.result.filter(item => item.settlementType == 'RATE')
              this.itemDiscounts1 = this.productList.map(item => ({
                itemId: item.id,
                itemName: item.name,
                rate: null,
                fixedNum: null,
                settlementType: item.settlementType
              }))
              this.activeList = data.result.filter(item => item.settlementType == 'FIXED_NUM')
              this.itemDiscounts2 = this.activeList.map(item => ({
                itemId: item.id,
                itemName: item.name,
                rate: null,
                fixedNum: null,
                settlementType: item.settlementType
              }))
            }
          })
        }
      },
      exportData() {
        window.location.href = '/admin/discount/data/export?' + 'username=' + this.workNum + '&roleId=' + this.roleSelect + '&merchantName=' + this.manageName + '&pName=' + this.prevManager
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getDiscountList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.merchantIdStr = this.multipleSelection.map(item => item.id)
      },
    }
  }
</script>
<style>
  .production, .activity {
    /*width: 391px;*/
    /*width: 80%;*/
    /*height: 206px;*/
    background-color: #fefefe;
    border-radius: 4px;
    border: solid 1px #c8c8c8;
  }

  .set-discount .el-dialog__body {
    padding: 0 20px;
  }

  .head {
    height: 32px;
    line-height: 32px !important;
    background-color: #e6f7ff;
    border-radius: 4px 4px 0px 0px;
    padding-left: 15px;
  }
</style>
<style>
  .set-discount .el-form--inline .el-form-item__label{
    float: left!important;
  }
  .set-discount .el-form--inline .el-form-item__content{
    display: block!important;
  }
</style>
<style scoped>
  .dialog .el-form-item__label{
    float: left!important;
  }
  .dialog .el-form-item__content{
    display: block!important;
  }
  .icon-shezhi {
    font-size: 20px;
  }
  .item{
    width: 180px;
  }
</style>
