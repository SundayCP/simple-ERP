<template>
  <div class="quota">
    <h1 class="page-title">移动积分核销限额</h1>
    <div class="container">
      <!--<el-form :inline="true">-->
      <!--<el-form-item label="角色">-->
      <!--<el-select style="width: 105px" v-model="region" placeholder="请选择">-->
      <!--<el-option label="区域一" value="shanghai"></el-option>-->
      <!--<el-option label="区域二" value="beijing"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item style="margin-right: 40px" label="商户名称：">-->
      <!--<el-input style="width: 105px" v-model="user"-->
      <!--placeholder=""></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item style="float: right">-->
      <!--<el-button type="primary" @click="">导出</el-button>-->
      <!--</el-form-item>-->
      <!--<el-form-item style="float: right">-->
      <!--<el-button style="color:#409EFF;border-color:#409EFF;" @click="">查询-->
      <!--</el-button>-->
      <!--</el-form-item>-->

      <!--</el-form>-->
      <template>
        <div class="operation">
          <el-button type="primary" @click="open('batch')">批量设置</el-button>
          <el-button type="primary" @click="open('add')" icon="el-icon-plus">
            新增限额
          </el-button>
        </div>
        <el-table
          @selection-change="handleSelectionChange"
          max-height="500"
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="110">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="移动积分核销限制额度"
            align="right"
            :formatter="toThousands"
            width="180px">
          </el-table-column>
          <el-table-column
          fixed="right"
            label="编辑"
            align="center">
            <template slot-scope="scope">
              <span style="font-size: 20px" @click="open(scope.row)"
                    class="operation-btn"><i
                class="icon-bianji"></i></span>
            </template>
          </el-table-column>
          <el-table-column
            label="">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog :title="dialogTitle" width="422px"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-select v-show="dialogTitle!=='批量设置核销限额'" style="width: 390px"
                     v-model="form.province"
                     placeholder="请选择省份">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.regionName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 390px" v-model="form.value" auto-complete="off"
                    placeholder="请输入移动积分核销最高额度"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消
        </el-button>
        <el-button type="primary" size="mini"
                   @click="submitQuota">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {toThousands} from '../../../static/js/util'
  import * as core from '../../core/quotaApi'
  import CONFIG from '../../core/config'

  export default {
    name: 'quota',
    data() {
      return {
        value6: '',
        input: '',
        input1: '',
        user: '',
        loading: false,
        tableData: [],
        region: '',
        dialogFormVisible: false,
        form: {
          province: '',
          value: '',
          id:''
        },
        dialogTitle: '新增核销限额',
        options:[],
      }
    },
    created() {
      this.getProvinceList()
      this.provinceList = []
      this.getQuataList()
    },
    methods: {
    getProvinceList(){
      core.provinceList().then(data=>{
        if (data.code&&'00'===data.code){
        this.options=data.result
        } else {
          this.$message.error(data.message)
        }
      })
    },
      getQuataList() {
        this.loading = true
        core.quataList().then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData=data.result.data
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      getAddQuota(opts) {
        core.addQuata(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.dialogFormVisible = false
            this.getQuataList()
            this.$message.success('新增限额成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getEditQuata(opts) {
        core.editQuata(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.dialogFormVisible = false
            this.getQuataList()
            this.$message.success('编辑限额成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getBatchEditQuata(opts) {
        core.batchEditQuata(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.dialogFormVisible = false
            this.getQuataList()
            this.$message.success('批量设置限额成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      submitQuota() {
        if (this.flag === 'add') {
          this.getAddQuota({
            province: this.form.province,
            value: this.form.value
          })
        } else if (this.flag === 'batch') {
          this.getBatchEditQuata({
            provinceList: this.provinceList,
            value: this.form.value
          })
        } else {
          this.getEditQuata({
            id:this.form.id,
            province: this.form.province,
            value: this.form.value
          })
        }
      },
      handleSelectionChange(val) {
        let transcript = []
        val.map((value, index, array) => {
          transcript.push(value.id)
        })
        this.provinceList = transcript.join(',')
      },
      open(val) {
        this.flag = val
        if (val === 'add') {
          this.form.province = ''
          this.form.value = ''
          this.dialogTitle = '新增核销限额'
          this.dialogFormVisible = true
        } else if (val === 'batch') {
          if (this.provinceList.length > 0) {
            this.form.province = ''
            this.form.value = ''
            this.dialogTitle = '批量设置核销限额'
            this.dialogFormVisible = true
          } else {
            this.$message.info('请选择需要设置的省份')
          }
        } else {
          this.form.province = val.provinceId
          this.form.value = val.amount
          this.form.id = val.id
          this.dialogTitle = '设置核销限额'
          this.dialogFormVisible = true
        }
      },
      toThousands(row) {
        return toThousands(row.amount)
      }
    }
  }
</script>

<style scoped>
  .operation {
    height: 56px;
  }
</style>
<style>
  .quota .el-dialog__body {
    padding: 0px 16px;
  }
</style>
