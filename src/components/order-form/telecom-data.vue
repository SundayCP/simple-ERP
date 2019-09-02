<template>
  <div class="telecom-data">
    <h1 class="page-title">电信数据 / 电信数据</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item label="时间 ：">
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
        <el-form-item label="产品名称：">
          <el-input style="width: 105px" v-model="productName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="是否使用：">
          <el-select style="width: 105px" v-model="use" placeholder="请选择">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input style="width: 230px" v-model="orderNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input style="width: 120px" v-model="mobile" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/admin/tyyd/importOtherExcel"
            :multiple="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-file-list="false"
            :limit="1"
            :disabled="uploadFlag"
            name="file"
            :before-upload="beforeUpload">
            <el-button type="primary" @click="clear" :loading="uploadFlag" style="margin-right: 15px;">批量导入订单<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="id" width="85"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160":formatter="dateFormate"></el-table-column>
          <el-table-column prop="duobaoitemName" label="产品名称"></el-table-column>
          <el-table-column prop="buyNumber" label="购买数量" width="100"></el-table-column>
          <el-table-column prop="totalUsedYjf" label="消耗积分数"></el-table-column>
          <el-table-column prop="tradeNo" label="订单号"></el-table-column>
          <el-table-column prop="isUse" label="是否使用"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
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
  import {dateFormate} from '../../../static/js/util'
  import * as core from '../../core/telecomDataApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';


  export default {
    mixins:[mixin],
    name: "telecom-data",
    data() {
      return {
        loading: false,
        time: null,
        productName: '',
        use: '',
        orderNum: '',
        mobile: '',

        uploadFlag: false,

        tableData: [],

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
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        core.getTelecomList({
          'itemName' : this.productName,
          'isUse' : this.use,
          'orderId' : this.orderNum,
          'mobile' : this.mobile,
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
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      //批量导入
      clear() {
        if (this.uploadFlag){
          return false
        }
        this.$refs.upload.clearFiles()
      },
      beforeUpload(file) {
        this.uploadFlag=true
        const isText = file.type === 'application/vnd.ms-excel'
        const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        if (!(isText || isTextComputer)) {
          this.uploadFlag=false
          this.$message.info('请上传Excel文件')
        }
        return (isText || isTextComputer)
      },
      handleSuccess(response,file,fileList) {
        this.uploadFlag=false
        if (response.code && '00'===response.code){
          this.$message.success('导入成功！')
          this.$router.go(0)
        } else {
          this.$message.error(response.message)
        }
      },
      handleError(err,file,fileList){
        this.uploadFlag=false
        this.$message.error('导入失败！')
      },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
      selectBtn() {
        this.currentPage = 1
        this.getData()
      },
      exportData() {
        window.location.href = '/admin/tyyd/export?' + 'itemName=' + this.productName + '&isUse=' + this.use + '&orderId=' + this.orderNum + '&mobile=' + this.mobile+'&beginTime=' + (this.time ? dateFormate(this.time[0]).split(' ')[0] : '') + '&endTime=' + (this.time ? dateFormate(this.time[1]).split(' ')[0] : '')
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData()
      },
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.getData()
      },
    }
  }
</script>

<style scoped>

</style>
