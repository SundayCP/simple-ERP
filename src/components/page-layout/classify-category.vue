<template>
  <div class="classify-category">
    <h1 class="page-title">聚乐页面配置/分类配置</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/admin/pushExcel"
            :multiple="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-file-list="false"
            :limit="1"
            :disabled="uploadFlag"
            name="excelFile"
            :before-upload="beforeUpload">
            <el-button type="primary" @click="clear" :loading="uploadFlag">支付宝拉新数据导入<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="open('add')" icon="el-icon-plus">
            添加分类
          </el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          height="456">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名称">
          </el-table-column>
          <el-table-column
          min-width="110"
            label="排序">
            <template slot-scope="scope">
              <span v-show="scope.$index!==tableData.length-1"
                    class="operation-btn" style="color: #1890ff"
                    @click="moveDown(scope)">下移</span><span
              v-show="scope.$index!==0&&scope.$index!==tableData.length-1">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span
              v-show="scope.$index!==0" style="color:#1890ff;" @click="moveUp(scope)"
              class="operation-btn">上移</span>
            </template>
          </el-table-column>
          <el-table-column
            label="详情">
            <template slot-scope="scope">
              <span style="color: #1890ff" @click="deatils(scope.row)"
                    class="operation-btn">详情</span>
            </template>
          </el-table-column>
          <el-table-column
          fixed="right"
            label="操作"
            align="center"
            >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">

              <span style="font-size: 20px" @click="open(scope.row)"
                    class="operation-btn"><i
                class="icon-bianji"></i></span></el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">

              <span style="font-size: 20px;color:#1890ff;margin-left: 15px" @click="deleteHome(scope.row)"
                    class="operation-btn"><i
                class="icon-shanchu"></i></span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog :title="dialogTitle" width="422px"
               :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item>
          <el-input style="width: 390px" v-model="formValue" auto-complete="off"
                    placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消
        </el-button>
        <el-button type="primary" size="mini"
                   @click="submitClassify">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {zIndexDown,zIndexUp} from '../../../static/js/util'
  import * as core from '../../core/pageLayoutApi'
  import CONFIG from '../../core/config'

  export default {
    name: 'classify-category',
    data() {
      return {
        input: '',
        input1: '',
        loading: false,
        tableData: [],
        dialogTitle: '添加分类',
        dialogFormVisible: false,
        formValue: '',
        uploadFlag:false
      }
    },
    created() {
      this.getClassifyList()
    },
    methods: {
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
        } else {
          this.$message.error(response.message)
        }
      },
      handleError(err,file,fileList){
        this.uploadFlag=false
        this.$message.error('导入失败！')
      },
      deatils(val){
        this.$router.push({path:'/home-category',query:{classifyId:val.id}})
      },
      getClassifyMoveUp(opts,index){
        core.classifyMoveUp(opts).then(data=>{
          if (data.code&&'00'===data.code){
            zIndexUp(this.tableData,index,this.tableData.length)
            this.$message.success('上移成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getClassifyMoveDown(opts,index){
        core.classifyMoveDown(opts).then(data=>{
          if (data.code&&'00'===data.code){
            zIndexDown(this.tableData,index,this.tableData.length)
            this.$message.success('下移成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      moveUp(val){
        this.getClassifyMoveUp({classifyId:val.row.id},val.$index)
      },
      moveDown(val){
        this.getClassifyMoveDown({classifyId:val.row.id},val.$index)
      },
      getEditClassify(opts){
        core.editClassify(opts).then(data=>{
          if (data.code&& '00'===data.code){
            this.dialogFormVisible= false
            this.$message.success("编辑分类成功")
            this.getClassifyList()
          }else {
            this.$message.error(data.message)
          }
        })
      },
      getAddClassify(opts){
      core.addClassify(opts).then(data=>{
        if (data.code&&'00'===data.code){
          this.dialogFormVisible=false
          this.$message.success('添加分类成功')
          this.getClassifyList()
        }else {
          this.$message.error(data.message)
        }
      })
    },
      deleteHome(val){
        this.$confirm('确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          core.deleteHome({id:val.id}).then(data=>{
            if (data.code&&'00'===data.code){
              this.getClassifyList()
              this.$message.success('删除成功！')
            }else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getClassifyList() {
        this.loading = true
        core.classifyList().then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData=data.result.data
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      submitClassify(){
        if (this.flag==='add'){
          this.getAddClassify({
            value: this.formValue
          })
        }else {
          this.getEditClassify({
            classifyId:this.flag.id,
            value: this.formValue
          })
        }
      },
      open(val) {
        this.flag=val
        if (val === 'add') {
          this.dialogTitle = '添加分类'
          this.formValue = ''
        } else {
          this.dialogTitle = '编辑分类'
          this.formValue = val.name
        }
        this.dialogFormVisible = true
      }
    }
  }
</script>
<style scoped>
</style>
<style>
  .classify-category .el-dialog__body {
    padding: 0px 16px;
  }
</style>
