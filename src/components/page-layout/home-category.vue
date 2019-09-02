<template>
  <div class="home-category">
    <h1 class="page-title">聚乐页面配置/页面配置</h1>
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
            prop="pname"
            label="业务分类">
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务名称">
          </el-table-column>
          <el-table-column
            label="ICON">
            <template slot-scope="scope">
              <img width="57px"
                   :src="scope.row.icon"
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
                @click="getHomeMoveDown(scope.row)">下移</span>
              <span
              v-show="((scope.$index!==tableData.length-1)||(currentPage!==Math.ceil(pageTotal/pageSize)))&&((scope.$index!==0)||(currentPage!==1))">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span
              v-show="(scope.$index!==0)||(currentPage!==1)"
              style="color:#1890ff;"
              @click="getHomeMoveUp(scope.row)"
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
            align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <span style="font-size: 20px" @click="open(scope.row)"
                    class="operation-btn"><i
                class="icon-bianji"></i></span></el-tooltip>
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
          @size-change="handleSizeChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          layout="sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="422px"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!--<el-form-item style="display: none" label="业务分类：">-->
          <!--<el-select disabled style="width: 317px" v-model="form.type" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="业务名称：">
          <el-input style="width: 317px" v-model="form.name" auto-complete="off"
                    placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="业务ICON：">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/admin/business/list/addOrUpdate"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
            multiple
            :data="uploadData"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed">
            <span class="operation-btn" style="color: #1890ff">上传图片</span>
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
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'home-category',
    data() {
      return {
        input: '',
        input1: '',
        loading: false,
        tableData: [],
        dialogTitle: '新增信息',
        dialogFormVisible: false,
        form: {
          id: '',
          type: '',
          name: '',
        },
        options: [],
        currentPage: 1,
        fileList: [],
        uploadData: {id: '', pid: '', name: ''},
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0
      }
    },
    created() {
      this.form.type=this.$route.query.classifyId
      let _this = this
      // this.getDifferServ()
      this.selectObj = {
        classifyId: _this.$route.query.classifyId,
        currentPage: 1,
        pageSize: this.pageSize,
      }
      this.getHomeCategoryList(this.selectObj)
    },
    methods: {
      pageSizeChange(value) {
        this.selectObj.currentPage=1
        this.selectObj.pageSize=value
        this.getHomeCategoryList(this.selectObj)
      },
      getHomeMoveUp(val) {
        core.homeMoveUp({id: val.id}).then(data => {
          if (data.code && '00' === data.code) {
            this.$message.success('上移成功')
            this.getHomeCategoryList(this.selectObj)
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getHomeMoveDown(val) {
        core.homeMoveDown({id: val.id}).then(data => {
          if (data.code && '00' === data.code) {
            this.getHomeCategoryList(this.selectObj)
            this.$message.success('下移成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      // getDifferServ() {
      //   core.differServ().then(data => {
      //     if (data.code && '00' === data.code) {
      //       for (var i = 0; i < data.result.data.length; i++) {
      //         this.options.push({
      //           label: data.result.data[i].name,
      //           value: data.result.data[i].id
      //         })
      //       }
      //     } else {
      //       this.$message.error(data.message)
      //     }
      //   })
      // },
      getHomeCategoryList(opts) {
        this.loading = true
        core.homeCategoryList(opts).then(data => {
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
      deleteHome(val){
        this.$confirm('确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          core.deleteHome({id:val.id}).then(data=>{
            if (data.code&&'00'===data.code){
              this.getHomeCategoryList(this.selectObj)
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
      submitUpload() {
        console.log(this.fileList)
        this.uploadData.pid = this.form.type
        this.uploadData.name = this.form.name
        this.uploadData.id = this.form.id
        if (this.dialogTitle === '编辑信息') {
          if (this.fileList.length === 0) {
            core.homeEditInformation({
              type: this.form.type,
              name: this.form.name,
              id: this.form.id
            }).then(data => {
              if (data.code && '00' === data.code) {
                this.dialogFormVisible = false
                this.$message.success('编辑成功')
                this.getHomeCategoryList(this.selectObj)
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
            if (this.form.type === '') {
              this.$message.info('请选择业务分类')
              return
            }
            if (this.form.name === '') {
              this.$message.info('请输入业务名称')
              return
            }
            if (this.fileList.length === 0) {
              this.$message.info('请上传业务ICON')
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
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectObj.currentPage = val
        this.getHomeCategoryList(this.selectObj)
      },
      deatils(val) {
        this.$router.push({
          path: '/details-category',
          query: {businessId: val.id}
        })
      },
      open(val) {
        if (val === 'add') {
          this.dialogTitle = '新增信息'
          // this.form.type = ''
          this.form.name = ''
          this.form.id = ''
        } else {
          this.dialogTitle = '编辑信息'
          // this.form.type = val.pid
          this.form.name = val.name
          this.form.id = val.id
        }
        this.dialogFormVisible = true
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // },
      uploadSuccess(response, file, fileList) {
        this.$refs.upload.clearFiles()
        this.getHomeCategoryList(this.selectObj)
        this.dialogFormVisible = false
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
  .home-category .el-dialog__body {
    padding: 0px 16px;
  }
</style>

