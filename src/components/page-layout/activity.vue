<template>
  <div class="page-activity">
    <h1 class="page-title">聚乐页面配置/活动赚钱页</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="open('add')" icon="el-icon-plus">
            新增页面
          </el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="title"
            label="活动名称">
          </el-table-column>
          <el-table-column
            width="250"
            label="Banner">
            <template slot-scope="scope">
              <img
                :src="scope.row.banner"
              >
            </template>
          </el-table-column>
          <el-table-column
            min-width="110"
            label="排序">
            <template slot-scope="scope">
              <span
                v-show="(scope.$index!==tableData.length-1)||(currentPage!==Math.ceil(pageTotal/pageSize))"
                class="operation-btn" style="color: #1890ff"
                @click="getActivityMoveDown(scope.row)">下移</span><span
              v-show="((scope.$index!==tableData.length-1)||(currentPage!==Math.ceil(pageTotal/pageSize)))&&((scope.$index!==0)||(currentPage!==1))">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span
              v-show="(scope.$index!==0)||(currentPage!==1)"
              style="color:#1890ff;"
              @click="getActivityMoveUp(scope.row)"
              class="operation-btn">上移</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            label="跳转链接">
            <template slot-scope="scope">
              <span>{{scope.row.linkUrl}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <span style="font-size: 20px" @click="open(scope.row)"
                    class="operation-btn">
                    <i class="icon-bianji"></i></span></el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <span style="font-size: 20px;color:#1890ff;margin-left: 15px" @click="deleteHome(scope.row)"
                    class="operation-btn"><i
                class="icon-shanchu"></i></span></el-tooltip>
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
          @size-change="handleSizeChange"
          :page-sizes="pageSizes"
          layout="sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="422px"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称：">
          <el-input style="width: 317px" v-model="form.title"
                    auto-complete="off"
                    placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-select v-model="form.value" clearable style="width: 317px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接：">
          <el-input type="textarea" style="width: 317px" v-model="form.linkUrl"
                    autoc-omplete="off"
                    placeholder="请输入页面链接"></el-input>
        </el-form-item>
        <el-form-item label="Banner:">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/admin/businessAct/list/addOrUpdate"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            multiple
            :data="uploadData"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <span class="operation-btn" style="color: #1890ff">点击上传图片</span>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消
        </el-button>
        <el-button type="primary" size="mini"
                   @click="submitUpload">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as core from '../../core/pageLayoutApi'
  import CONFIG from '../../core/config';
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'page-activity',
    data() {
      return {
        input: '',
        input1: '',
        loading: false,
        tableData: [],
        dialogTitle: '新增信息',
        dialogFormVisible: false,
        form: {
          title: '',
          linkUrl: '',
          id: '',
          value:''
        },
        options: [],
        currentPage: 1,
        uploadData: {title: '', linkUrl: '', id: '',itemCategoryId:''},
        fileList: [],
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0
      }
    },
    created() {
      this.selectObj = {
        currentPage: 1,
        pageSize: this.pageSize,
      }
      this.getActivityCategoryList(this.selectObj)
      this._getItemCategoryList()
    },
    methods: {
      pageSizeChange(value) {
        this.selectObj.currentPage=1
        this.selectObj.pageSize=value
        this.getActivityCategoryList(this.selectObj)
      },
      _getItemCategoryList(){
        core.getItemCategoryList().then(data=>{
          if (data.code && '00'===data.code){
            this.options=data.result
          } else {
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
          core.deleteActivity({id:val.id}).then(data=>{
            if (data.code&&'00'===data.code){
              this.getActivityCategoryList(this.selectObj)
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
      getActivityMoveUp(val) {
        core.activityMoveUp({id: val.id}).then(data => {
          if (data.code && '00' === data.code) {
            this.$message.success('上移成功')
            this.getActivityCategoryList(this.selectObj)
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getActivityMoveDown(val) {
        core.activityMoveDown({id: val.id}).then(data => {
          if (data.code && '00' === data.code) {
            this.getActivityCategoryList(this.selectObj)
            this.$message.success('下移成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getActivityCategoryList(opts) {
        this.loading = true
        core.activityCategoryList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.tableData = data.result.data
            this.pageTotal = data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectObj.currentPage = val
        this.getActivityCategoryList(this.selectObj)
      },
      open(val) {
        if (val === 'add') {
          this.dialogTitle = '新增信息'
          this.form.title = ''
          this.form.linkUrl = ''
          this.form.id = ''
          this.form.value = ''
        } else {
          this.dialogTitle = '编辑信息'
          this.form.title = val.title
          this.form.linkUrl = val.linkUrl
          this.form.id = val.id
          this.form.value = val.itemCategoryId
        }
        this.dialogFormVisible = true
      },
        submitUpload() {
        this.uploadData.title = this.form.title
        this.uploadData.linkUrl = this.form.linkUrl
        this.uploadData.id = this.form.id
        this.uploadData.itemCategoryId = this.form.value
        if (this.dialogTitle === '编辑信息') {
          if (this.fileList.length === 0) {
            core.activityEditInformation({
              title: this.form.title,
              linkUrl: this.form.linkUrl,
              id: this.form.id,
              itemCategoryId: this.form.value,
            }).then(data => {
              if (data.code && '00' === data.code) {
                this.dialogFormVisible = false
                this.$message.success('编辑成功')
                this.getActivityCategoryList(this.selectObj)
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            this.$refs.upload.submit();
          }
        } else {
          if (this.dialogTitle === '新增信息') {
            this.uploadData.id = ''
            if (this.form.title === '') {
              this.$message.info('请输入活动名称')
              return
            }
            if (this.form.linkUrl === '') {
              this.$message.info('请输页面链接')
              return
            }
            if (this.fileList.length === 0) {
              this.$message.info('请上传业务Banner')
              return
            }
            this.$refs.upload.submit();
          }
        }
      },
      uploadChange(file, fileList) {
        this.fileList = fileList
      },
      uploadRemove(file, fileList) {
        this.fileList = fileList
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      uploadSuccess(response, file, fileList) {
        this.$refs.upload.clearFiles()
        this.dialogFormVisible = false
        this.getActivityCategoryList(this.selectObj)
        this.$message.success('上传图片成功！')
      },
      uploadError() {
        this.$message.error('上传图片失败！')
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .page-activity .el-dialog__body {
    padding: 0px 16px;
  }
</style>


