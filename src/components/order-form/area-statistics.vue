<template>
  <div class="area-statistics">
    <h1 class="page-title">订单管理 / 地区统计</h1>
    <div class="container">
      <el-form ref="form" :model="form" :inline="true" label-width="88px">
        <el-form-item label="商户名称 ：">
          <el-input style="width: 120px" v-model="form.merchantName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所在省：">
          <el-select style="width: 152px" v-model="form.province" placeholder="请选择省" @change="selectProvince">
            <el-option v-for="(item,index) in form.provinceList" :key="index" :label="item.regionName"
                       :value="item.id" style="width: 152px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市：">
          <el-select style="width: 152px;margin-left:4px" v-model="form.city" placeholder="请选择市">
            <el-option v-for="(item,index) in form.cityList" :key="index" :label="item.regionName"
                       :value="item.id" style="width: 152px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型：">
          <el-select style="width: 152px" v-model="form.orderType " placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item" style="width: 168px" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="产品名称：">-->
          <!--<el-select style="width: 152px" v-model="form.itemName " placeholder="请选择">-->
            <!--<el-option :label="selectAll.label" :value="selectAll.value"></el-option>-->
            <!--<el-option v-for="(item,index) in orderTypeList" :key="index" :label="item" style="width: 168px" :value="item"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="产品名称 ：">
          <el-input style="width: 120px" v-model="form.itemName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="下单时间 ：">
          <el-date-picker
            style="margin-right: 40px"
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
      <template>
        <el-table :data="tableData"
                  style="width: 100%"
                  v-loading="loading">
          <el-table-column prop="merchantName" label="商户名"></el-table-column>
          <el-table-column prop="province" label="商户所在省"></el-table-column>
          <el-table-column prop="city" label="商户所在市"></el-table-column>
          <el-table-column prop="orderType" label="订单类型"></el-table-column>
          <el-table-column prop="itemName" label="产品名称"></el-table-column>
          <el-table-column prop="orderCount" label="订单数量"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" :formatter="toThousands"></el-table-column>
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
  import {toThousands, dateFormate} from '../../../static/js/util';
  import * as core from '../../core/orderManageApi';
  import CONFIG from '../../core/config';
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins: [mixin],
    name: "area-statistics",
    data() {
      return {
        loading: false,
        selectAll: {
          label: '全部',
          value: ''
        },
        form: {
          merchantName: '',
          province: '',
          provinceList: '',
          itemName:'',
          city: '',
          cityList: '',
          orderType:'',
          time: null,
        },
        orderTypeList:[],
        areaList:[],
        tableData: [],
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
      this.fetchAreaList() //获取表格数据
      this.getArea()  //获取省市区
      this.fetchOrderType()  //获取订单类型
    },
    methods: {
      fetchAreaList(){
        this.loading = true
        core.fetchAreaStatic({
          'merchantName': this.form.merchantName ? this.form.merchantName : '',
          'province': this.form.province ? this.form.province : '',
          'city': this.form.city ? this.form.city : '',
          'orderType': this.form.orderType ? this.form.orderType : '',
          'itemName': this.form.itemName ? this.form.itemName : '',
          'beginTime': this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '',
          'endTime': this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '',
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
      selectBtn() {
        this.currentPage = 1
        this.fetchAreaList()
      },
      exportData() {
        window.location.href = '/admin/exportAreaOrder?' + 'merchantName=' + this.form.merchantName + '&province=' + this.form.province + '&city=' + this.form.city + '&orderType=' + this.form.orderType+ '&itemName=' + this.form.itemName + '&beginTime=' + (this.form.time ? dateFormate(this.form.time[0]).split(' ')[0] : '') + '&endTime=' + (this.form.time ? dateFormate(this.form.time[1]).split(' ')[0] : '')
      },
      getArea() {
        core.fetchArea({}).then(data => {
          if (data.code && data.code == '00') {
            this.areaList = data.result
            this.form.provinceList = data.result
            this.areaList.map((item, index, arr) => {
              if (item.id === this.form.province) {
                this.form.cityList = item.childRegions
              }
            })
          }
        })
      },
      selectProvince() {
        this.form.city = ''
        this.areaList.map((item, index, arr) => {
          if (item.id === this.form.province) {
            this.form.cityList = item.childRegions
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
      toThousands(row) {
        return toThousands(row.orderAmount)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchAreaList()
      },
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.fetchAreaList()
      },
    }



  }
</script>

<style scoped>

</style>
