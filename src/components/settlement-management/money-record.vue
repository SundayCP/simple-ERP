<template>
  <div class="money-record">
    <h1 class="page-title">结算管理/支付宝打款记录</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item label="商户ID：">
          <el-input style="width: 105px" v-model="merchantId"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input style="width: 105px" v-model="merchantName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="margin-right: 40px"
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <!--<el-date-picker-->
            <!--style="margin-right: 40px"-->
            <!--v-model="time"-->
            <!--type="daterange"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期">-->
          <!--</el-date-picker>-->
        </el-form-item>
        <el-form-item>
          <el-button style="color:#409EFF;border-color:#409EFF;"
                     @click="inquire">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="moneyTime"
            :formatter="dateFormate"
            label="打款时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="billNo"
            label="流水号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="merchantName"
            label="商户名称">
          </el-table-column>
          <el-table-column
            prop="realname"
            label="真实姓名">
          </el-table-column>

          <el-table-column
            prop="alipayAccount"
            label="打款账号">
          </el-table-column>
          <el-table-column
            prop="amount"
            :formatter="toThousands"
            label="金额">
          </el-table-column>
          <el-table-column
            label="交易状态">
            <template slot-scope="scope">
              <span v-show="!scope.row.moneyStatus">—</span>
              <span v-show="scope.row.moneyStatus==='SUCCESS'">已打款</span>
              <span v-show="scope.row.moneyStatus==='WAIT'">待打款</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="errMsg"
            label="失败原因">
          </el-table-column>
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
          layout="sizes ,prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/settlementManagementApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'money-record',
    data() {
      return {
        merchantId: '',
        merchantName: '',
        time: null,
        loading: false,
        tableData: [],
        currentPage: 1,
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,

        choiceDate: '',
        pickerOptions: {
          onPick:({maxDate,minDate})=>{
            this.choiceDate = minDate.getTime();
            if (maxDate) {
              this.choiceDate = ''
            }
          },
          disabledDate:(time)=>{
            if ((this.choiceDate)) {
              const one = 30 * 24 * 3600 * 1000;
              const minTime = this.choiceDate;
              const maxTime = this.choiceDate + one;
              return time.getTime() < minTime || time.getTime() > maxTime
            }
          }
        },

      }
    },
    created() {
      this.selectObj = {
        merchantId: '',
        merchantName: '',
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: this.pageSize
      }
      this.getMoneyRecord(this.selectObj)
    },
    methods: {
      pageSizeChange(value) {
        this.selectObj.currentPage=1
        this.selectObj.pageSize=value
        this.getMoneyRecord(this.selectObj)
      },
      exportData() {
        window.location.href = '/admin/alipay/export?' + '&merchantId=' + this.selectObj.merchantId + '&merchantName=' + this.selectObj.merchantName + '&beginMoneyTime=' + this.selectObj.startTime + '&endMoneyTime=' + this.selectObj.endTime
      },
      inquire() {
        this.currentPage = 1
        this.selectObj = {
          merchantId: this.merchantId,
          merchantName: this.merchantName,
          startTime: this.time ? dateFormate(this.time[0]) : '',
          endTime: this.time ? dateFormate(this.time[1]) : '',
          currentPage: 1,
          pageSize: this.pageSize
        }
        this.getMoneyRecord(this.selectObj)
      },
      getMoneyRecord(opts) {
        this.loading = true
        core.moneyRecord(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData=data.result.data
            this.pageTotal=data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectObj.currentPage = val
        this.getMoneyRecord(this.selectObj)
      },
      dateFormate(row) {
        if (!row.moneyTime){
          return ''
        }
        return dateFormate(row.moneyTime)
      },
      toThousands(row) {
        return toThousands(row.amount)
      }
    }
  }
</script>

<style scoped>

</style>
