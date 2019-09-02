<template>
  <div class="complain">
    <h1 class="page-title">订单管理 / 投诉管理</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item label="订单类型：">
          <el-select style="width: 168px" v-model="orderType" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item" style="width: 168px" :value="item"></el-option>
            <!--<el-option label="移动积分" style="width: 168px" value="移动积分"></el-option>-->
            <!--<el-option label="移动电子券" style="width: 168px" value="移动电子券"></el-option>-->
            <!--<el-option label="电信积分" style="width: 168px" value="电信积分"></el-option>-->
            <!--<el-option label="电信阅点" style="width: 168px" value="电信阅点"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="投诉状态：">
          <el-select style="width: 120px" v-model="complainStatus" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option label="待处理" style="width: 105px" value="WAIT"></el-option>
            <el-option label="已处理" style="width: 105px" value="SUCCESS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input style="width: 120px" v-model="orderNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="商户号：">
          <el-input style="width: 120px" v-model="userNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="投诉时间 ：">
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
          <el-button plain  @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column type="index" label="序号" width="65"></el-table-column>
          <el-table-column prop="id" label="编号" width="65"></el-table-column>
          <el-table-column prop="createTime" label="投诉登记时间" width="150" :formatter="dateFormate"></el-table-column>
          <el-table-column prop="orderId" label="投诉对应订单号" width="85"></el-table-column>
          <el-table-column prop="merchantId" label="订单所属商户" width="85"></el-table-column>
          <el-table-column prop="complainTime" label="投诉产生时间" width="150":formatter="dateFormate"></el-table-column>
          <el-table-column prop="starRemark" label="星级客户" width="80"></el-table-column>
          <el-table-column prop="status" label="投诉状态 " width="80">
            <template slot-scope="scope">
              <p v-if="scope.row.status ==='WAIT'" style="color: #1890ff;" @click="actStatus(scope.row)" type="text" size="small">待处理</p>
              <p v-if="scope.row.status ==='SUCCESS'" type="text" size="small">已处理</p>
            </template>
          </el-table-column>
          <el-table-column prop="complainExecuteTime" label="投诉处理时间" width="150":formatter="dateFormate"></el-table-column>
          <el-table-column prop="result" label="处理结果" width="95"></el-table-column>
          <el-table-column prop="needDeduct" label="是否需要扣费" width="120">
            <template slot-scope="scope">
              <p v-if="scope.row.needDeduct ==='Y'" type="text" size="small">需要</p>
              <p v-if="scope.row.needDeduct ==='N'" type="text" size="small">不需要</p>
            </template>
          </el-table-column>
          <el-table-column prop="isDeductFinish" label="财务扣款操作" width="120">
            <template slot-scope="scope">
              <p v-if="scope.row.needDeduct ==='N'" type="text" size="small">--</p>
              <p v-if="scope.row.needDeduct ==='Y' && scope.row.isDeductFinish == 'N'" style="color:#1890ff" @click="payBack(scope.row)" type="text" size="small">未完成</p>
              <p v-if="scope.row.needDeduct ==='Y' && scope.row.isDeductFinish == 'Y'" type="text" size="small">已完成</p>
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="投诉原因" width="140"></el-table-column>
        </el-table>
      </template>
      <el-dialog title="投诉处理" width="500px" :visible.sync="dialogFormVisible">
        <el-form style="padding-right: 15px;">
          <el-form-item label="处理方式：" label-width="120px">
            <el-select style="width: 100%" v-model="action" placeholder="请选择">
            <el-option label="退款" style="width: 100%" value="退款"></el-option>
            <el-option label="其他" style="width: 100%" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" label-width="120px">
            <el-input v-model="reason" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="是否需要扣款：" label-width="120px">
            <el-select style="width: 100%" v-model="needPay" placeholder="请选择">
            <el-option label="需要" style="width: 100%" value="Y"></el-option>
            <el-option label="不需要" style="width: 100%" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需要扣款金额：" label-width="120px">
            <el-input v-model="backMoney"style="width: 100%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeStatus">确 定</el-button>
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
  import {dateFormate} from '../../../static/js/util'
  import * as core from '../../core/orderManageApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'complain',
    data() {
      return {
        loading:false,
        selectAll: {
          label: '全部',
          value: ''
        },
        complainStatus: '',
        orderType: '',
        orderNum: '',
        createTime: '',
        userNum: '',
        prevManager: '',
        time:null,

        tableData: [],
        orderTypeList:[],
        region: '',
        textarea2: '',

        reason:'',
        backMoney:'',
        action:'',
        needPay:'',
        dialogFormVisible:false,
        executeComplainId : '',

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
    created() {
      this.fetechComplainList()
      this.fetchOrderType()
    },
    methods: {
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.fetechComplainList()
      },
      fetechComplainList() {
        this.loading = true
        core.fetchComplainList({
          'orderType': this.orderType,
          'complaintStatus': this.complainStatus,
          'orderId': this.orderNum,
          'merchantId': this.userNum,
          'beginTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.loading = false
            this.pageTotal = data.result.amount
            this.tableData = data.result.data
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
      payBack() {
        this.$confirm('请确认已完成扣款操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          core.payBack({
            'executeComplainId' : 1
          }).then(data=>{
            if(data.code && data.code=='00'){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      exportData(){
        window.location.href = '/admin/order/complain/export?' + 'orderId=' + this.orderNum + '&orderType=' + this.orderType + '&complaintStatus=' + this.complainStatus + '&merchantId=' + this.userNum + '&beginTime=' + (this.time ? dateFormate(this.time[0]).split(' ')[0] : '') + '&endTime=' + (this.time ? dateFormate(this.time[1]).split(' ')[0] : '')
      },
      actStatus(e){
        this.dialogFormVisible = true
        this.executeComplainId = e.id
      },
      changeStatus(){
        this.dialogFormVisible = true
        core.changeStatus({
          'executeComplainId': this.executeComplainId,
          'executeComplainType': this.action,
          'executeComplainRemark': this.reason,
          'executeComplainNeedDeduct': this.needPay,
          'deductMoney' : this.backMoney
        }).then(data=>{
          if(data.code && data.code == '00'){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.dialogFormVisible = false
          } else {
            this.$message.error(data.message)
          }
        })
      },
      selectBtn() {
        this.currentPage = 1
        this.fetechComplainList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetechComplainList()
      },
      dateFormate(row) {
        return dateFormate(row.createTime,row.complainTime,row.complainExecuteTime)
      },
    }
  }
</script>

<style scoped>

</style>
