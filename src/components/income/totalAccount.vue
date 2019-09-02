<template>
  <div class="total-account">
    <h1 class="page-title">账户收入 / 账户总收入</h1>
    <div class="container">
      <el-form :inline="true" style="display: flex;justify-content: space-between">
        <el-form-item label="时间：">
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquire">查询
          </el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="incomeMoney"
            :formatter="toThousands1"
            label="应收款"
            width="">
          </el-table-column>
          <el-table-column
            prop="outMoney"
            :formatter="toThousands2"
            label="应付款"
            width="">
          </el-table-column>
          <el-table-column
            prop="waitSettleMoney"
            :formatter="toThousands3"
            label="待结算"
            width="">
          </el-table-column>
          <el-table-column
            prop="earnMoney"
            :formatter="toThousands4"
            label="应赚合计"
            width="">
          </el-table-column>
        </el-table>
      </template>
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
    name: "totalAccount",
    data() {
      return {
        loading: false,
        tableData: [],
        time: null,
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
      this.getTotalDate()   //获取全部数据
    },
    methods: {
      inquire() {
        this.tableData = []
        this.currentPage = 1
        this.getTotalDate()
      },
      getTotalDate() {
        this.loading = true
        core.totalaccount({
          'beginTime': this.time ? dateFormate(this.time[0]).split(' ')[0] : '',
          'endTime': this.time ? dateFormate(this.time[1]).split(' ')[0] : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && data.code == '00') {
            this.loading = false
            // for(let i in data.result){
            //   this.tableData.push(data.result[i])
            // }
            this.tableData.push(data.result)
            console.log(this.tableData, 232323232323232)
          }
          else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
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
    // pickerOptions: {
    //   onPick:function({maxDate,minDate}){
    //     this.choiceDate = minDate.getTime();
    //     if (maxDate) {
    //       this.choiceDate = ''
    //     }
    //   },
    //   disabledDate:function(time){
    //     if (!isNull(this.choiceDate)) {
    //       const one = 30 * 24 * 3600 * 1000;
    //       const minTime = this.choiceDate - one;
    //       const maxTime = this.choiceDate + one;
    //       return time.getTime() < minTime || time.getTime() > maxTime
    //     }
    //   }
    // },
  }
</script>

<style scoped>

</style>
