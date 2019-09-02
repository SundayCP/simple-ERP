<template>
  <div class="ticket-list">
    <h1 class="page-title">结算管理 / 上传发票单列表</h1>
    <div class="container">
      <el-form :inline="true" label-width="80px" label-position="center">
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
        <el-form-item label="商户名称：">
          <el-input style="width: 105px" v-model="merchantName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="提现账号：">
          <el-input style="width: 105px" v-model="withdrawAccount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发票单：">
          <el-select style="width: 105px;margin-right: 20px;" v-model="ticketsType" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option label="电子单" value="电子单"></el-option>
            <el-option label="邮寄单" value="邮寄单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="selectBtn">查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="createTime" label="上传时间" width="180" :formatter="dateFormate"></el-table-column>
        <el-table-column prop="merchantName" label="商户名称" width="250"></el-table-column>
        <el-table-column prop="withdrawAccount" label="提现账号" width="250"></el-table-column>
        <el-table-column prop="type" label="发票单">
          <template slot-scope="scope">
            <span style="color: #3a8ee6" v-if="scope.row.type==='电子单'" @click="showTicket(scope.row)">电子单</span>
            <span style="color: #3a8ee6" v-if="scope.row.type==='邮寄单'" @click="showTicket(scope.row)">邮寄单</span>
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <img style="width: 450px;" :src="ticketsPic">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { dateFormate} from '../../../static/js/util'
  import * as core from '../../core/settlementManagementApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';


  export default {
    mixins: [mixin],
    name: "ticket-list",
    data() {
      return {
        selectAll: {
          label: '全部',
          value: ''
        },
        tableData: [],  //数据列表
        time: null,
        merchantName: '',
        withdrawAccount: '',
        ticketsType: '',
        ticketsPic:'',

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,

        dialogVisible: false,
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
      this.getTableList()
    },
    methods: {
      //获取数据列表
      getTableList() {
        this.loading = true
        core.ticketlList({
          'beginTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'merchantName': this.merchantName ? this.merchantName : '',
          'withdrawAccount': this.withdrawAccount ? this.withdrawAccount : '',
          'type': this.ticketsType ? this.ticketsType : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.loading = false
            this.pageTotal = data.result.amount
            this.tableData = data.result.data
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      showTicket(e) {
        this.dialogVisible = true
        this.ticketsPic = e.imageUrl
      },
      handleClose(done) {
        done();
      },
      selectBtn() {
        this.currentPage = 1
        this.getTableList()
      },
      pageSizeChange(value) {
        this.currentPage = 1
        this.pageSize = value
        this.getTableList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableList()
      },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
    },
  }
</script>

<style scoped>

</style>
