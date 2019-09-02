<template>
  <div class="account-manage">
    <h1 class="page-title">用户管理 / 商户账户列表</h1>
    <div class="container">
      <el-form :inline="true" label-width="80px" label-position="center">
        <el-form-item label="工号：">
          <el-input style="width: 105px" v-model="workNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="提现账号：">
          <el-input style="width: 105px" v-model="withdrawAccount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="提款人：">
          <el-input style="width: 105px" v-model="withdrawPeople" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="冻结状态：">
          <el-select style="width: 105px;margin-right: 20px;" v-model="frozenStatus" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option label="冻结" value="1"></el-option>
            <el-option label="未冻结" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="selectBtn">查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData" style="width: 100%" v-loading="loading" :span-method="objectSpanMethod">
        <el-table-column prop="username" label="工号"></el-table-column>
        <el-table-column prop="zfb" label="提款账号"></el-table-column>
        <el-table-column prop="type" label="提款类别"></el-table-column>
        <el-table-column prop="name" label="提款人"></el-table-column>
        <el-table-column
          label="操作"
          prop="frozen"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <!--<span v-if="!scope.row.frozen" class="operation-btn" style="color: #1890ff" @click="open1(scope.row,scope.$index)">冻结</span>-->
            <div class="operation-btn" v-if="scope.row.frozen == false">
              <span class="operation-btn" style="color: #1890ff" @click="open2(scope.row,scope.$index)">冻结</span>
            </div>
            <div v-if="scope.row.frozen == true">
              <span class="operation-btn" style="color: #dd3b3b"
                    @click="open3(scope.row,scope.$index)"><i style="color:#999">(已冻结)</i>解冻</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="pageTotal>0" class="pagination-box">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          layout="sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {toThousands} from '../../../static/js/util'
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins: [mixin],
    name: "account-manage",
    data() {
      return {
        selectAll: {
          label: '全部',
          value: ''
        },
        workNum:'',
        withdrawAccount: '',
        withdrawPeople: '',
        frozenStatus: '',

        spanArr: [],
        position: 0,
        listData: [],

        loading: true,
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      getFrozen(opts, index) {
        core.frozen(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.listData[index].frozen = true
            this.$message({
              type: 'success',
              message: '冻结成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
        })
      },
      deFrozen(opts, index) {
        core.frozen(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.listData[index].frozen = false
            this.$message({
              type: 'success',
              message: '解冻成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
        })
      },
      //冻结
      open2(val, index) {
        console.log(val,666666666666666666)
        this.$confirm('冻结账号后将无法继续使用该账号进行体现，请问您确定要冻结吗？', '冻结', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getFrozen({id: val.id}, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结'
          });
        });
      },
      //解冻
      open3(val, index) {
        this.$confirm('请问您确定要解冻此账号吗吗？', '解冻', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deFrozen({id: val.id}, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解冻'
          });
        });

      },
      selectBtn() {
        this.currentPage = 1
        this.getTableList()
      },
      pageSizeChange(value) {
        this.currentPage = 1
        this.pageSize = value
        this.getTableList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableList()
      },
      getTableList() {
        this.listData = [];
        this.loading = true
        core.fetchAccountList({
          'username': this.workNum ? this.workNum : '',
          'withdrawAccount': this.withdrawAccount ? this.withdrawAccount : '', //提现账号
          'name': this.withdrawPeople ? this.withdrawPeople : '', //提款人
          'isFrozen': this.frozenStatus ? this.frozenStatus : '',
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }).then(data => {
          if (data.code && '00' === data.code) {
              this.loading = false
              this.pageTotal = data.result.amount
            // if(data.result.data){
              var list = data.result.data;
              var len = list.length;
              var arr = [];
              for (var i = 0; i < len; i++) {
                // if(list[i].withdrawAccountList){

                  var lists = list[i].withdrawAccountList;
                  var lens = lists.length;
                  if (!lens) {
                    arr.push({
                      username: list[i].username ? list[i].username : '',
                    })
                  } else {
                    for (var y = 0; y < lens; y++) {
                      var item = {};
                      Object.assign(item, {
                        username: list[i].username ? list[i].username : '',
                        id : lists[y].id ? lists[y].id : '',
                        name: lists[y].name ? lists[y].name : '',
                        zfb: lists[y].zfb ? lists[y].zfb : '',
                        type: lists[y].type ? lists[y].type : '',
                        frozen: lists[y].frozen ? lists[y].frozen : '',
                      })
                      arr.push(item)
                    }
                  }
                // }
              }
              this.listData = arr;
              this.rowspan();
            // }
          } else {
            this.loading = false
            // this.message.error(data.message)
          }
        })
      },
      rowspan() {
        this.spanArr = [];
        this.listData.forEach((item, index,arr) => {
          if (index === 0) {
            this.spanArr.push(1);
            this.position = 0;
            // console.log(this.spanArr + '-----')
          } else {
            // console.log(this.listData[index-1],99999999999999)
            if (item.username === arr[index - 1].username) {
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
        console.log(this.spanArr,99898989898)
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
  }


</script>

<style scoped>

</style>
