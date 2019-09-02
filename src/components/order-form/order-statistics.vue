<template>
  <div class="order-statistics">
    <h1 class="page-title">订单管理 / 订单统计</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item label="商户名称：">
          <el-input v-model="merchantName" style="width: 168px" placeholder="请输入商户名称"></el-input>
        </el-form-item>
        <el-form-item label="订单类型：">
          <el-select style="width: 168px" v-model="orderType " placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item" style="width: 168px" :value="item"></el-option>
            <!--<el-option label="移动积分" style="width: 168px" value="移动积分"></el-option>-->
            <!--<el-option label="移动电子券" style="width: 168px" value="移动电子券"></el-option>-->
            <!--<el-option label="电信积分" style="width: 168px" value="电信积分"></el-option>-->
            <!--<el-option label="电信阅点" style="width: 168px" value="电信阅点"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="margin-right: 40px"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="orderList" style="width: 100%" v-loading="loading">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="day" label="日期" width="150"></el-table-column>
          <el-table-column prop="merchantName" label="商户名称" width="150"></el-table-column>
          <el-table-column prop="roleName" label="角色" width="150"></el-table-column>
          <el-table-column prop="pidMerchantName" label="上级工号 " width="150"></el-table-column>
          <el-table-column prop="orderType" label="订单类型" width="150"></el-table-column>
          <el-table-column prop="orderCount" label="订单数" width="150"></el-table-column>
          <el-table-column prop="orderAmount" label="总金额" :formatter="toThousands"></el-table-column>
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
  import {toThousands,dateFormate} from '../../../static/js/util'
  import * as core from '../../core/orderManageApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'merchant-form',
    data() {
      return {
        loading:false,
        selectAll: {
          label: '全部',
          value: ''
        },
        id:'',
        orderNum:'',
        merchantName:'',
        role:'',
        preManager:'',
        orderType:'',
        orderAmount:'',
        totleMoney:'',
        time: null,

        orderList: [],
        orderTypeList:[],

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,

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
    created(){
      this.fetchOrderList()
      this.fetchOrderType()
    },
    methods:{
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.fetchOrderList()
      },
      fetchOrderList(){
        this.loading = true
        core.fetchCountList({
          'orderType' : this.orderType ? this.orderType : '',
          'merchantUsername' : this.merchantName ?  this.merchantName :'',
          'beginTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data=>{
          if(data.code && data.code=='00'){
            this.loading = false
            this.pageTotal = data.result.amount
            this.orderList = data.result.data
          }else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      //获取订单类型
      fetchOrderType() {
        core.fetchOrderType({}).then(data => {
          if (data.code && data.code == '00') {
            this.orderTypeList = data.result
          }
        })
      },
      exportData(){
        window.location.href = '/admin/order/tongji/export?' + 'merchantUsername=' + this.merchantName + '&orderType=' + this.orderType + '&beginTime=' + (this.time ? dateFormate(this.time[0]).split(' ')[0] : '') + '&endTime=' + (this.time ? dateFormate(this.time[1]).split(' ')[0] : '')
      },
      selectBtn() {
        this.currentPage = 1
        this.fetchOrderList()
      },
      toThousands(row) {
        return toThousands(row.orderAmount)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchOrderList()
      },
    }
  }
</script>

<style scoped>

</style>
