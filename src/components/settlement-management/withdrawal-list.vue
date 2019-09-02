<template>
  <div class="withdrawal-list">
    <h1 class="page-title">结算管理/提现列表</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item label="商户ID：">
          <el-input style="width: 105px" v-model="merchantId"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="商户工号：">
          <el-input style="width: 128px" v-model="merchantName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="大商户：">
          <el-input style="width: 128px" v-model="superiorMerchant"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="打款状态：">
          <el-select clearable style="width: 105px" v-model="settlementStatus"
                     placeholder="请选择">
            <el-option label="待打款" value="WAIT"></el-option>
            <el-option label="已打款" value="SUCCESS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现状态：">
          <el-select clearable style="width: 105px" v-model="withdrawalState"
                     placeholder="请选择">
            <el-option label="已通过" value="SUCCESS"></el-option>
            <el-option label="已拒绝" value="FAIL"></el-option>
            <el-option label="待审核" value="WAIT"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="打款方式：">
          <el-select clearable style="width: 105px" v-model="paythods"
                     placeholder="请选择">
            <el-option label="支付宝" value="alipay"></el-option>
            <!-- <el-option label="微信" value="wetPay"></el-option> -->
            <el-option label="银行卡" value="bank"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
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
        <el-form-item label="打款类别：">
          <el-select clearable style="width: 105px;margin-right: 40px;" v-model="payType"
                     placeholder="请选择">
            <el-option label="个体工商" value="个体工商"></el-option>
            <el-option label="个体" value="个体"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="color:#409EFF;border-color:#409EFF;"
                     @click="inquire">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="open3" style="background-color: #fa8c16;">修改打款状态</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="open4" style="background-color: #fa8c16;">批量通过</el-button>
        </el-form-item>
      </el-form>
      <div class="panel">
        <span>&nbsp;&nbsp;账户余额：--元</span><span
        style="margin-left: 48px;margin-right: 74px">可提现金额：--元</span>
        <el-button size="mini" type="primary">立即提现</el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="createTime"
            min-width="180"
            :formatter="dateFormate"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="merchantId"
            label="商户ID">
          </el-table-column>
          <el-table-column
            prop="username"
            label="商户工号">
          </el-table-column>
          <el-table-column
            prop="bigMerchantName"
            label="大商户">
          </el-table-column>

          <el-table-column
            prop="realname"
            label="真实姓名">
          </el-table-column>


          <el-table-column
            prop="bankBranch"
            label="开户行">
          </el-table-column>

          <el-table-column
            prop="bankName"
            label="银行名称">
          </el-table-column>

          <el-table-column
            prop="bankNum"
            label="银行卡号">
          </el-table-column>

          <el-table-column
            prop="amount"
            :formatter="toThousands"
            label="提现金额"
            align="right">
          </el-table-column>
          <el-table-column
            prop="alipayAccount"
            label="提现账号">
          </el-table-column>

          <el-table-column
            label="打款方式">
            <template slot-scope="scope">
              <span v-show="!scope.row.withdrawType">—</span>
              <span v-show="scope.row.withdrawType==='alipay'">支付宝</span>
              <span v-show="scope.row.withdrawType==='bank'">银行卡</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountType"
            label="打款类别">
          </el-table-column>
          <el-table-column
            label="打款状态">
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
          <el-table-column
            label="后台备注"
            width="158px">
            <template slot-scope="scope">
              <el-input
                @change="upDataRemark(scope.row)"
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="scope.row.retMessage">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            header-align="center"
            align="center"
            width="150x">
            <template slot-scope="scope">
              <div v-show="scope.row.status==='WAIT'"><span class="operation-btn"
                                                            style="color: #1890ff"
                                                            @click="open1(scope.row,scope.$index)">通过</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span
                style="color:#dd3b3b;" @click="open2(scope.row,scope.$index)"
                class="operation-btn">拒绝</span></div>
              <div v-show="scope.row.status==='FAIL'">
                <span>已拒绝</span>
              </div>
              <div v-show="scope.row.status==='SUCCESS'">
                <span>已通过</span>
              </div>
            </template>
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
    mixins: [mixin],
    name: 'withdrawal-list',
    data() {
      return {
        loading: false,
        merchantId: '',
        merchantName: '',
        superiorMerchant: '',
        payType: '',
        settlementStatus: '',
        withdrawalState: '',
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        textarea2: '',
        tableData: [],
        currentPage: 1,
        time: null,
        paythods: '',
        multipleSelection: [],

        showFroze: true,

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
        startTime: '',
        endTime: '',
        merchantName: '',
        superiorMerchant: '',
        settlementStatus: '',
        withdrawalState: '',
        paythods: '',   // 新增打款方式
        payType: '', // 打款类别
        currentPage: 1,
        pageSize: this.pageSize
      }
      this.getWithdrawalList(this.selectObj)
    },
    methods: {
      pageSizeChange(value) {
        this.selectObj.currentPage = 1
        this.selectObj.pageSize = value
        this.getWithdrawalList(this.selectObj)
      },
      inquire() {
        this.currentPage = 1
        this.selectObj = {
          startTime: this.time ? dateFormate(this.time[0]) : '',
          endTime: this.time ? dateFormate(this.time[1]) : '',
          merchantId: this.merchantId,
          merchantName: this.merchantName,
          superiorMerchant: this.superiorMerchant,
          settlementStatus: this.settlementStatus,
          withdrawalState: this.withdrawalState,
          paythods: this.paythods,   // 新增打款方式
          accountType:this.payType, //打款类别
          currentPage: 1,
          pageSize: this.pageSize
        }
        this.getWithdrawalList(this.selectObj)
      },
      exportData() {
        window.location.href = '/admin/withdraw/export?' + 'merchantId=' + this.selectObj.merchantId + '&username=' + this.selectObj.merchantName + '&bigMerchantName=' + this.selectObj.superiorMerchant + '&moneyStatus=' + this.selectObj.settlementStatus + '&status=' + this.selectObj.withdrawalState + '&withdrawType=' + this.selectObj.paythods + '&accountType=' + this.selectObj.accountType + '&beginTime=' + this.selectObj.startTime + '&endTime=' + this.selectObj.endTime
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectObj.currentPage = val
        this.getWithdrawalList(this.selectObj)
      },
      getWithdrawalList(opts) {
        this.loading = true
        core.withdrawalList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData = data.result.data
            // this.tableData = data.result.data
            console.log(this.tableData, 32323232323)
            this.pageTotal = data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      upDataRemark(val) {
        this.getUpDataRemark({
          id: val.id,
          value: val.retMessage
        })
      },
      getUpDataRemark(opts) {
        core.upDataRemark(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.$message.success('更改后台备注成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getRepulse(opts, index) {
        core.repulse(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.tableData[index].status = 'FAIL'
            this.$message({
              type: 'success',
              message: '拒绝成功'
            });
          } else {
            this.$message({
              type: 'error',
              message: data.message
            });
          }
        })
      },
      getAllow(opts, index) {
        core.allow(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.tableData[index].status = 'SUCCESS'
            this.tableData[index].moneyStatus = 'WAIT'
            this.$message({
              type: 'success',
              message: '通过成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
        })
      },
      open1(val, index) {
        this.$confirm('提现通过后金额立即到账, 确认要通过吗？', '提现审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getAllow({id: val.id}, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });
        });
      },
      open2(val, index) {
        this.$confirm('提现拒绝后, 状态无法更改，请问您确定要拒绝吗？', '提现拒绝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRepulse({id: val.id}, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拒绝'
          });
        });
      },
      open3() {
        this.$confirm('打款后状态无法更改, 请问确定打款吗？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 选中的支付id
          var dataId = []
          var data = {}
          for (var y in this.multipleSelection) {
            dataId.push(this.multipleSelection[y].id);
          }
          data.id = dataId.join(',');
          console.log(data);
          this.changePayStatus(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });
        });
      },

      open4() {
        this.$confirm('是否批量通过', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 选中的支付id
          var dataId = []
          var data = {}
          for (var y in this.multipleSelection) {
            dataId.push(this.multipleSelection[y].id);
          }
          data.id = dataId.join(',');
          console.log(data);
          this.changeAccept(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });
        });
      },

      // 筛选的方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },
      // 批量修改通过状态
      changeAccept(data) {
        this.loading = true
        core.changeAccept(data).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.getWithdrawalList(this.selectObj)
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },

      // 修改打款状态
      changePayStatus(data) {
        this.loading = true
        core.changePayStatus(data).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.getWithdrawalList(this.selectObj)
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
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
  .panel {
    display: none;
    width: 100%;
    min-width: 600px;
    height: 72px;
    font-size: 14px;
    line-height: 72px;
    background-color: #e6f7ff;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
