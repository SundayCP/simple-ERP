<template>
  <div class="financial-details">
    <h1 class="page-title">账户收入/财务明细</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商户：">
          <el-input v-model="merchant" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 40px" label="上级工号：">
          <el-input v-model="superiorMerchant" placeholder=""></el-input>
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
            prop="createTime"
            :formatter="dateFormate"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="outOrderId"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="merchantName"
            label="商户名称">
          </el-table-column>
          <el-table-column
            prop="pName"
            label="上级工号">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="变动说明">
          </el-table-column>
          <el-table-column
            label="金额">
            <template slot-scope="scope">
              <span v-show="scope.row.transType==='IN'">+{{toThousands(scope.row)}}</span>
              <span v-show="scope.row.transType==='OUT'">-{{toThousands(scope.row)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div v-show="pageTotal > 0" class="pagination-box">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          @size-change="handleSizeChange"
          layout="sizes,prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/incomeApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'financial-details',
    data() {
      return {
        loading: true,
        time: null,
        merchant: '',
        superiorMerchant: '',
        user: '',
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
        tableData: [],

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
        'startTime': '',
        'endTime': '',
        'merchant': '',
        'superiorMerchant': '',
        'currentPage': 1,
        'pageSize': this.pageSize
      }
      this.getFinancialDetails(this.selectObj)
    },
    methods: {
      pageSizeChange(value) {
        this.selectObj.currentPage=1
        this.selectObj.pageSize=value
        this.getFinancialDetails(this.selectObj)
      },
      getFinancialDetails(opts) {
        this.loading = true
        core.financialDetails(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData = data.result.data ? data.result.data : []
            this.pageTotal = data.result.amount
          } else {
            this.loading = false
            this.tableData = []
            this.$message.error(data.message)
          }
        })
      },
      inquire() {
        this.currentPage = 1
        this.selectObj = {
          'startTime': this.time ? dateFormate(this.time[0]) : '',
          'endTime': this.time ? dateFormate(this.time[1]) : '',
          'merchant': this.merchant,
          'superiorMerchant': this.superiorMerchant,
          'currentPage': 1,
          'pageSize': this.pageSize
        }
        this.getFinancialDetails(this.selectObj)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectObj.currentPage = val
        this.getFinancialDetails(this.selectObj)
      },
      exportData() {
        window.location.href = '/admin/account/trans/export?' + '&startTime=' + this.selectObj.startTime + '&endTime=' + this.selectObj.endTime + '&merchantName=' + this.selectObj.merchant + '&pname=' + this.selectObj.superiorMerchant
      },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
      toThousands(row) {
        return toThousands(row.amount)
      }
    }
  }
</script>

<style scoped>
</style>
