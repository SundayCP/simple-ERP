<template>
  <div class="check-settlement">
    <h1 class="page-title">账户收入/结算核对</h1>
    <div class="container">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="">
          <el-date-picker
            style="width: 300px;"
            v-model="form.time"
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
      <div class="top">
        <div class="top-con">
          <p>账户收入：{{Account.incomeMoney ? toThousands(Account.incomeMoney) : '--'}}元 <span
            style="color:royalblue;text-decoration: underline;margin-left: 10px;cursor: pointer"
            @click="centerDialogVisible = true;getAccountGroup()">查看应收组成</span></p>
          <p>应付合计：{{Account.outMoney ? toThousands(Account.outMoney) : '--'}}元</p>
          <p>待结算金额：{{Account.waitSettleMoney ? toThousands(Account.waitSettleMoney) : '--'}}元</p>
          <p>应赚合计：{{Account.earnMoney ? toThousands(Account.earnMoney) : '--'}}元</p>
        </div>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          empty-text
          style="width: 100%">
          <el-table-column
            min-width="110"
            prop="beginTime"
            label="日期">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="sumIncome"
            label="应收款">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="outMoney"
            label="应付款">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="waitSettleMoney"
            label="待结算">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="earnMoney"
            label="应赚">
          </el-table-column>
          <el-table-column
            min-width="110"
            prop="earnPercent"
            label="应赚百分比">
          </el-table-column>
          <el-table-column
            min-width="200"
            prop=""
            label="">
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
          layout="sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>

      <el-dialog
        title="应收组成"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <!--<div v-for="item in AccountGroup" style="margin-bottom: 10px">-->
        <!--<div style="display: flex;align-items: center">-->
        <!--<div style="width: 32%;text-align: right;">{{item.orderType}} :</div>-->
        <!--<div style="margin-left: 30px">-->
        <!--<div v-if="item.categoryStatistic.length > 0"><div v-for="items in item.categoryStatistic"  style="line-height: 20px;height: 20px;">{{items.categoryName}}: {{items.incomeMoney ? toThousands(items.incomeMoney) : "&#45;&#45;"}}</div></div>-->
        <!--<div v-else style="line-height: 20px;height: 20px;">-&#45;&#45;</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <template>
          <el-table
            v-loading="loading"
            :data="listData"
            empty-text
            :span-method="objectSpanMethod"
            style="width: 100%">
            <el-table-column
              min-width="150"
              prop="orderType"
              label="">
            </el-table-column>

            <el-table-column
              min-width="110"
              prop="categoryName"
              label="类型">
            </el-table-column>
            <el-table-column
              min-width="110"
              prop="incomeMoney"
              label="应收款">
            </el-table-column>
            <el-table-column
              min-width="110"
              prop="outMoney"
              label="应付款">
            </el-table-column>
            <el-table-column
              min-width="110"
              prop="waitSettleMoney"
              label="待结算">
            </el-table-column>
            <el-table-column
              min-width="110"
              prop="earnMoney"
              label="应赚">
            </el-table-column>
            <el-table-column
              min-width="110"
              prop="earnPercent"
              label="应赚百分比">
            </el-table-column>
          </el-table>
        </template>


      </el-dialog>

    </div>
  </div>
</template>

<script>
  import {toThousands, dateFormate, dateFormate02} from '../../../static/js/util'
  import * as core from '../../core/incomeApi'
  import CONFIG from '../../core/config';
  import {mixin} from '../../static/js/mixin';


  export default {
    mixins: [mixin],
    name: 'check-settlement',
    data() {
      return {
        loading: true,
        form: {
          time: null,
        },
        tableData: [],
        Account: {},
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,

        // 应收组成
        centerDialogVisible: false,
        spanArr: [],
        position: 0,
        listData: [],
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
      this.loading = true
      this.getCheckIncome()
      this.getIncomeSum()
    },
    methods: {
      toThousands(val) {
        return toThousands(val)
      },
      selectBtn() {
        this.currentPage = 1
        this.getCheckIncome()
        this.getIncomeSum()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getCheckIncome()
      },
      pageSizeChange(value) {
        this.currentPage = 1
        this.pageSize = value
        this.getCheckIncome()
      },
      exportData() {
        window.location.href = ' /admin/account/exportOrderTypeIncome?' + 'beginTime=' + (this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '') + '&endTime=' + (this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '')
      },
      getCheckIncome() {
        core.getCheckIncome({
          beginTime: this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '',
          endTime: this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.pageTotal = data.result.amount
            // console.log(data.result.data, 5555555555555)
            if(!data.result.data){
              this.tableData = [];
            }else{
              this.tableData = data.result.data.map(item => {
                return {
                  beginTime: item.dayTime ? dateFormate02(item.dayTime) : '--',
                  sumIncome: item.incomeMoney ? toThousands(item.incomeMoney) : '--',
                  outMoney: item.outMoney ? toThousands(item.outMoney) : '--',
                  waitSettleMoney: item.waitSettleMoney ? toThousands(item.waitSettleMoney) : '--',
                  earnMoney: item.earnMoney ? toThousands(item.earnMoney) : '--',
                  earnPercent: item.earnPercent ? item.earnPercent+'%' : '--'
                }
              })
            }
            // console.log(this.tableData.list, 11111111111)
            this.loading = false
          } else {
            this.loading = false
            this.message.error(data.message)
          }
        })
      },
      getIncomeSum() {
        core.incomeSum({
          "beginTime": this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '',
          "endTime": this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '',
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.Account = data.result;
          } else {
            this.loading = false
            // this.message.error(data.message)
          }
        })
      },
      getAccountGroup() {
        this.listData = [];
        core.getAccountGroup({
          "beginTime": this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '',
          "endTime": this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '',
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            var list = data.result;
            var len = list.length;
            var arr = [];
            for(var i=0;i<len;i++){
                var lists = list[i].categoryStatistic;
                var lens = lists.length;
                if(!lens){
                  arr.push({
                    orderType: list[i].orderType ? list[i].orderType : '--',
                  })
                }else {
                  for(var y=0;y<lens;y++){
                    var item = {};
                    Object.assign(item,{
                      orderType: list[i].orderType ? list[i].orderType : '--',
                      outMoney: lists[y].outMoney ? toThousands(lists[y].outMoney) : '--',
                      incomeMoney: lists[y].incomeMoney ? toThousands(lists[y].incomeMoney) : '--',
                      categoryName: lists[y].categoryName ? lists[y].categoryName : '',
                      waitSettleMoney: lists[y].waitSettleMoney ? toThousands(lists[y].waitSettleMoney) : '--',
                      earnMoney: lists[y].earnMoney ? toThousands(lists[y].earnMoney) : '--',
                      earnPercent: lists[y].earnPercent ? lists[y].earnPercent + '%' : '--',
                    })
                    arr.push(item)
                  }
                }
            }
            this.listData = arr;
            this.rowspan();
          } else {
            this.loading = false
            // this.message.error(data.message)
          }
        })
      },
      rowspan() {
        this.spanArr = [];
        this.listData.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
            console.log(this.spanArr + '-----')
          }else{
            console.log(this.listData[index-1],99999999999999)
            if(this.listData[index].orderType === this.listData[index-1].orderType ){
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            }else{
              this.spanArr.push(1);
              this.position = index;
            }
          }
          // console.log(this.spanArr)
        })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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
    width: 60%;
    display: flex;
    /*margin-right:80px;*/
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    color: #000;
    opacity: 0.85;
    font-size: 14px;
    line-height: 40px;
  }

  .el-table {
    text-align: center;
  }

</style>
<style>
  .check-settlement .el-table th > .cell {
    text-align: center;
  }

  .check-settlement .el-dialog__title {
    font-size: 20px;
    font-weight: 700;
  }

  .el-main {
    overflow-y: auto !important;
  }

</style>
