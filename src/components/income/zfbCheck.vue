<template>
  <div class="zfb-check">
    <h1 class="page-title">账户收入 / 支付宝拉新记账核对</h1>
    <div class="container">
      <!--<div class="top" v-if="this.loginRoleName ==='超级管理员'">-->
      <div class="top">
        <div class="top-con">
          <p>应收合计：{{incomeMoney}}元</p>
          <p>应付合计：{{outMoney}}元</p>
          <p>待结算金额：{{waitSettleMoney}}元</p>
          <p>应赚合计：{{earnMoney}}元</p>
        </div>
      </div>
      <el-form :inline="true" style="display: flex;justify-content: space-between">
        <el-form-item label="时间：">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquire">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button style="color:#409EFF;border-color:#409EFF;margin-bottom: 20px;" @click="openDialog">添加数据</el-button>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="dayTime"
            :formatter="dateFormate"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="incomeMoney"
            :formatter="toThousands1"
            label="应收款"
            width="180">
          </el-table-column>
          <el-table-column
            prop="outMoney"
            :formatter="toThousands2"
            label="应付款"
            width="180">
          </el-table-column>
          <el-table-column
            prop="waitSettleMoney"
            :formatter="toThousands3"
            label="待结算"
            width="180">
          </el-table-column>
          <el-table-column
            prop="earnMoney"
            :formatter="toThousands4"
            label="应赚"
            width="180">
          </el-table-column>
          <el-table-column prop="action" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="false" size="mini" @click="editDialog(scope.row)" type="text">
                <el-tooltip popper-class="popper-btn__tip" content="编辑" placement="top">
                  <i class="icon-bianji"></i>
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="添加/编辑数据" width="400px" :visible.sync="dialogFormVisible">
        <el-form style="padding-right: 10px;">
          <el-form-item label="时间：" label-width="80px">
            <div class="block">
              <el-date-picker
                v-model="value10"
                style="width: 100%"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="应收款：" label-width="80px">
            <el-input v-model="receivable" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="应付款：" label-width="80px">
            <el-input v-model="payable" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="待结算：" label-width="80px">
            <el-input v-model="notSet" style="width:100%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addZfbCheck">确 定</el-button>
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
  import * as core from '../../core/incomeApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins: [mixin],
    name: "zfbDetail",
    data() {
      return {
        loading: false,
        tableData: [],
        time: null,
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
        dialogFormVisible: false,

        value10: null,
        receivable: '',
        payable: '',
        notSet: '',
        editId: '',

        incomeMoney: '--',
        outMoney: '--',
        waitSettleMoney: '--',
        earnMoney: '--',

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
      this.getZfbDate()   //获取全部数据
      this.getSumDate()   //获取合计数据
    },
    methods: {
      inquire() {
        this.currentPage = 1
        this.getZfbDate()
      },
      openDialog() {
        this.value10 = ''
        this.editId = ''
        this.time = ''
        this.receivable = ''
        this.payable = ''
        this.notSet = ''
        this.dialogFormVisible = true
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getZfbDate()
      },
      pageSizeChange(value) {
        this.currentPage = 1
        this.pageSize = value
        this.getZfbDate()
      },
      //获取数据
      getZfbDate() {
        this.loading = true
        core.zfbCheck({
          'beginTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.loading = false
            this.pageTotal = data.result.amount
            if (data.result.data) {
              this.tableData = data.result.data
              this.pageTotal = data.result.amount
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
      //获取合计数据
      getSumDate() {
        core.addZfbSum({}).then(data => {
          if (data.code && data.code == '00') {
            this.incomeMoney = toThousands(data.result.incomeMoney),
              this.outMoney = toThousands(data.result.outMoney),
              this.waitSettleMoney = toThousands(data.result.waitSettleMoney),
              this.earnMoney = toThousands(data.result.earnMoney)
          }
        })
      },
      //编辑数据弹窗
      editDialog(e) {
        this.value10 = dateFormate(e.dayTime)
        this.receivable = toThousands(e.incomeMoney)
        this.payable = toThousands(e.outMoney)
        this.notSet = toThousands(e.waitSettleMoney)
        this.editId = e.id
        setTimeout(() => {
          this.dialogFormVisible = true
        }, 100)
        console.log(this.value10, 112121212121)
      },
      addZfbCheck() {
        console.log(this.value10)
        //（新建/编辑）数据
        core.editZfbData({
          dayTime: new Date(this.value10),
          id: this.editId ? this.editId : 0,
          incomeMoney: this.receivable,
          outMoney: this.payable,
          waitSettleMoney: this.notSet
        }).then(data => {
          if (data.code && data.code == '00') {
            this.getZfbDate()   //获取全部数据
            this.dialogFormVisible = false
          } else {
            this.$message.error(data.message)
          }
        })
      },
      dateFormate(row) {
        return dateFormate(row.dayTime).split(' ')[0]
      },
      toThousands1(row) {
        return toThousands(row.incomeMoney)
      },
      toThousands2(row) {
        return toThousands(row.outMoney)
      },
      toThousands3(row) {
        return toThousands(row.waitSettleMoney)
      },
      toThousands4(row) {
        return toThousands(row.earnMoney)
      },
    },
  }
</script>

<style scoped>
  .icon-bianji {
    font-size: 25px;
  }

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
