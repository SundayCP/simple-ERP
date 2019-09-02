<template>
  <div class="order-form">
    <h1 class="page-title">订单列表 / 订单列表</h1>
    <div class="container">
      <el-form :inline="true" label-width="88px">
        <el-form-item label="订单状态 ：">
          <el-select style="width: 120px" v-model="orderStatus" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option label="交易成功" style="width: 105px" value="SUCCESS"></el-option>
            <el-option label="交易失败" style="width: 105px" value="FAIL"></el-option>
            <el-option label="待支付" style="width: 105px" value="WAIT"></el-option>
            <el-option label="已退款" style="width: 105px" value="REFUND"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型：">
          <el-select style="width: 168px" v-model="orderType " placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item" style="width: 168px" :value="item"></el-option>
            <!--<el-option label="移动电子券" style="width: 168px" value="移动电子券"></el-option>-->
            <!--<el-option label="电信积分" style="width: 168px" value="电信积分"></el-option>-->
            <!--<el-option label="电信阅点" style="width: 168px" value="电信阅点"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="手机号 ：">
          <el-input style="width: 120px" v-model="mobile " placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input style="width: 120px" v-model="orderNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="下单时间 ：">
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
        <el-form-item label="订单来源：">
          <el-input style="width: 168px" v-model="orderOrigin" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上级工号：">
          <el-input style="width: 168px" v-model="prevManager" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="核销账号：">
          <el-input style="width: 168px" v-model="hexiaoAccount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData"
                  :summary-method="getSummaries"
                  show-summary
                  style="width: 100%"
                  v-loading="loading">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="id" label="订单号" width="85"></el-table-column>
          <!--<el-table-column prop="orderNum2" label="订单号" width="300"></el-table-column>-->
          <el-table-column prop="outOrderId" label="订单唯一识别号" width="160"></el-table-column>
          <el-table-column prop="orderType" label="订单类型"></el-table-column>
          <!--<el-table-column prop="cyAccount" label="核销账号"></el-table-column>-->
          <el-table-column prop="categoryName" label="商品名称"width="100"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" :formatter="toThousands"></el-table-column>
          <el-table-column prop="merchantUsername" label="订单来源"></el-table-column>
          <!--<el-table-column prop="faceValue" label="应收"></el-table-column>-->
          <!--<el-table-column prop="yingfuAmount" label="应付"></el-table-column>-->
          <el-table-column prop="pidMerchantUsername" label="上级工号"></el-table-column>
          <!--<el-table-column prop="settleAmount" label="结算金额"></el-table-column>-->
          <el-table-column prop="createTime" label="订单时间" width="160" :formatter="dateFormate"></el-table-column>
          <el-table-column prop="area" label="地区 " width="90"></el-table-column>
          <el-table-column prop="mobile" label="卡密对应手机号" width="120"></el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template slot-scope="scope">
              <p v-show="scope.row.status ==='WAIT'" @click="actStatus(scope.row)" type="text" size="small">等待支付</p>
              <p v-show="scope.row.status ==='SUCCESS'" @click="actStatus(scope.row)" type="text" size="small">支付成功</p>
              <p v-show="scope.row.status ==='FAIL'" style="color: #d50a0a;" type="text" size="small">支付失败</p>
              <!--<p style="color: #d50a0a;" type="text" size="small">{{scope.row.status}}</p>-->
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作">
            <template slot-scope="scope">
              <!--<div style="color: #1890ff;display: block" @click="register(scope.row)">登记投诉</div>-->
              <div style="color: #1890ff;display: block" v-show="scope.row.status ==='SUCCESS'"
                   @click="register(scope.row)">登记投诉
              </div>
              <!--<div style="color: #1890ff;display: block" v-else ></div>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="登记投诉" width="25%" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" style="padding-right: 10px;">
          <el-form-item label="订单号：" label-width="120px">
            <el-input v-model="orderNumC" style="width:100%" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单所属商户：" label-width="120px">
            <el-input v-model="merchantManageC" style="width:100%" disabled></el-input>
          </el-form-item>
          <el-form-item label="投诉产生时间：" label-width="120px">
            <div class="block">
              <el-date-picker
                v-model="value10"
                style="width: 100%"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="星级客户：" label-width="120px">
            <el-input v-model="star" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="投诉原因：" label-width="120px">
            <el-input type="textarea" autosize v-model="orderReason" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addComplain">确 定</el-button>
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
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/orderManageApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'order-form',
    data() {
      return {
        loading: false,
        selectAll: {
          label: '全部',
          value: ''
        },
        labelPosition: 'right',
        orderStatus: '',
        orderType: '',
        mobile: '',
        orderNum: '',
        createTime: '',
        orderOrigin: '',
        prevManager: '',
        hexiaoAccount:'',
        time: null,
        value10: '',
        merchantUsername: '',
        orderSums:'',

        orderNumC: '',
        merchantManageC: '',
        star: '',
        orderReason: '',

        tableData: [],
        orderTypeList: [],

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
        dialogFormVisible: false,

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
      this.fetchOrderList()
      this.fetchOrderType()
    },
    methods: {
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.fetchOrderList()
      },
      fetchOrderList() {
        this.loading = true
        core.fetchOrderList({
          'orderId': this.orderNum ? this.orderNum : '',
          'status': this.orderStatus ? this.orderStatus : '',
          'orderType': this.orderType ? this.orderType : '',
          'mobile': this.mobile ? this.mobile : '',
          'startTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'merchantUsername': this.orderOrigin ? this.orderOrigin : '',
          'pidMerchantUsername': this.prevManager ? this.prevManager : '',
          'cyAccount': this.hexiaoAccount ? this.hexiaoAccount : '',
          'area': this.area ? this.area : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.orderSums = data.result[1].sumOrderAmount
            this.loading = false
            this.pageTotal = data.result[0].amount
            if (data.result[0].data) {
              this.tableData = data.result[0].data.map(item=>{
                return Object.assign(item,{
                  "orderAmount": item.orderAmount ? item.orderAmount : ''
                })
              })
              // this.tableData = data.result[0].data
              console.log(this.tableData)
              this.pageTotal = data.result[0].amount
            } else {
              this.tableData = []
            }
          }
          else {
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
      selectBtn() {
        this.currentPage = 1
        this.fetchOrderList()
      },
      register(e) {
        this.dialogFormVisible = true
        this.orderNumC = e.id
        this.merchantManageC = e.merchantId
      },
      addComplain() {
        core.addComplain({
          'complainOrderId': this.orderNumC,
          'starRemark': this.star,
          'complainAddTime': dateFormate(this.value10),
          'complainReason': this.orderReason,
        }).then(data => {
          if (data.code && data.code == '00') {
            this.$message({
              type: 'success',
              message: '登记投诉成功!'
            });
            this.dialogFormVisible = false
          } else {
            this.$message.error(data.message)
          }
        })
      },
      exportData() {
        window.location.href = '/admin/order/export?' + 'orderId=' + this.orderNum + '&status=' + this.orderStatus + '&orderType=' + this.orderType + '&mobile=' + this.mobile + '&beginTime=' + (this.time ? dateFormate(this.time[0]).split(' ')[0] : '') + '&endTime=' + (this.time ? dateFormate(this.time[1]).split(' ')[0] : '') + '&merchantUsername=' + this.orderOrigin + '&pidMerchantUsername=' + this.prevManager + '&cyAccount=' + this.hexiaoAccount
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchOrderList()
      },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
      toThousands(row) {
        return toThousands(row.orderAmount)
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }

          // const values = this.tableData.map(item => item.orderAmount);
          // if (index === 4) {
          //   if (!values.every(value => isNaN(value))) {
          //     sums[index] = values.reduce((prev, curr) => {
          //       const value = Number(curr);
          //       if (!isNaN(value)) {
          //         return prev + curr;
          //       } else {
          //         return prev;
          //       }
          //     }, 0);
          //   }
          // }
        });
        sums[5] = toThousands(this.orderSums)
        return sums;
      },
    }
  }
</script>
<style>
  .order-form .el-textarea__inner{
    min-height:40px!important;
    height: 40px!important;
  }
</style>
<style scoped>
  .icon-bianji {
    font-size: 25px;
  }
</style>
