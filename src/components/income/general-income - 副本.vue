<template>
  <div class="general-income">
    <h1 class="page-title">账户收入/账户总收入</h1>
    <div class="container">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="">
          <el-date-picker
            style="width: 300px;"
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工号 ：">
          <el-input style="width: 100px" v-model="form.workNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="商户名称 ：">
          <el-input style="width: 100px" v-model="form.merchantName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="top">
        <div class="top-con">
          <p>账户收入：{{this.accountIncome}}元</p>
          <div style="display:flex;align-items: center">
            <p>收入组成：</p>
            <div>
              <p v-for="(item,index) in sumList" :key="index">{{item.orderType}} : {{toThousands(item.money)}}</p>
            </div>
          </div>
          <p>已提现金额：{{this.haveWithdrawal}}元</p>
          <p>剩余金额：{{this.remainMoney}}元</p>
        </div>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            min-width="110"
            prop="beginTime"
            label="日期">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="username"
            label="工号">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="merchantName"
            label="商户名称">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="sumIncome"
            label="总收入">
          </el-table-column>
          <el-table-column
            min-width="200"
            label="收入组成">
            <template slot-scope="scope">
              <div>
                <!--<p v-for="(item, index) in scope.row.list" :key="index">{{item.orderType}} : {{toThousands(item.money)}}</p>-->
                <p v-for="(item,index) in scope.row.keysList" :key="index">{{item}} : {{scope.row.incomeGroup[item]}}</p>
              </div>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="haveWithdrawal"-->
          <!--min-width="110"-->
          <!--label="已提现金额">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="balance"-->
          <!--label="剩余余额">-->
          <!--</el-table-column>-->
        </el-table>
      </template>
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
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/incomeApi'
  import CONFIG from '../../core/config';
  import {mixin} from '../../static/js/mixin';


  export default {
    mixins: [mixin],
    name: 'general-income',
    data() {
      return {
        loading: true,
        form: {
          time: null,
          workNum: '',
          merchantName: '',
        },
        tableData: [{
          generalIincome: '--',
          list: [],
          haveWithdrawal: '--',
          balance: '--'
        }],
        accountIncome: '',//账户收入
        sumList: [],//收入组成
        haveWithdrawal: '',//已提现
        remainMoney: '',//剩余金额

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
      }
    },
    created() {
      this.loading = false
      this.getGeneralIncome()
      this.getGeneralIncomeSum()
    },
    methods: {
      toThousands(val) {
        return toThousands(val)
      },
      selectBtn() {
        this.currentPage = 1
        this.getGeneralIncome()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getGeneralIncome()
      },
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.getGeneralIncome()
      },
      exportData() {
        window.location.href = '/admin/account/incomeList/export?' + '&beginTime=' + (this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '') + '&endTime=' + (this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '') + '&username=' + this.form.workNum + '&merchantName=' + this.form.merchantName
      },
      getGeneralIncome() {
        core.generalIncome({
          beginTime: this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '',
          endTime: this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '',
          username: this.form.workNum,
          merchantName: this.form.merchantName,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.pageTotal = data.result.amount
            this.tableData = data.result.data.map(item =>{
              return Object.assign(item,{
                keysList:Object.keys(item.incomeGroup)
              })
            })
            // console.log(data.result.data,'aaaaaaaaaaaaaa')
            // for (let i = 0; i < this.tableData.length; i++) {
            //   this.tableData.list = data.result.data[i].incomeGroup
            // }

            console.log(this.tableData.list, 11111111111)
            this.loading = false
          } else {
            this.loading = false
            this.message.error(data.message)
          }
        })
      },
      getGeneralIncomeSum() {
        core.generalIncomeSum({}).then(data => {
          if (data.code && '00' === data.code) {
            this.accountIncome = toThousands(data.result.sumIncomeMoney)
            this.sumList = data.result.orderTypeMoneyList
            this.haveWithdrawal = toThousands(data.result.withDrawMoney)
            this.remainMoney = toThousands(data.result.remainMoney)
            this.loading = false
            console.log(this.sumList, 22222222222222)
          } else {
            this.loading = false
            this.message.error(data.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .top {
    width: 100%;
    /*height: 88px;*/
    background-color: #e6f7ff;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .top-con {
    /*height: 88px;*/
    width: 85%;
    display: flex;
    /*margin-right:80px;*/
    align-items: center;
    justify-content: space-between;
    padding: 12px;

    color: #000;
    opacity: 0.85;
    font-size: 14px;
    line-height: 22px;
  }
</style>
