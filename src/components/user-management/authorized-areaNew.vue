<template>
  <div class="authorized-areaNew">
    <h1 class="page-title">用户管理 / 授权地区</h1>
    <div class="container">
      <el-form :inline="true" label-width="85px" label-position="center">
        <el-form-item label="工号：">
          <el-input style="width: 105px" v-model="workNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select style="width: 105px" v-model="roleSelect" placeholder="请选择">
            <el-option :label="selectAll.label" :value="selectAll.value"></el-option>
            <el-option v-for="item in selectRoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="showDialogAddArea">添加授权地区</el-button>
        </el-form-item>

      </el-form>
      <template>
        <el-table
          ref="multipleTable"
          :data="areaListShow"
          tooltip-effect="dark"
          style="width: 100%;margin-top: 16px;"
          v-loading="loading">
          <el-table-column prop="username" label="工号" width="150"></el-table-column>
          <el-table-column prop="roleName" label="角色" width="120"></el-table-column>
          <el-table-column prop="pname" label="上级工号" width="150"></el-table-column>
          <el-table-column prop="permissonProvince" label="授权地区">
            <template slot-scope="scope">
              <!--<div v-for="(item,index) in scope.row.authorizeAreaList">-->
              <div style="display: flex;align-items: center;overflow-x: auto;">
                <div v-for="(item,index) in scope.row.authorizeAreaList" style="margin-left: 20px">
                  <div style="display: flex;align-items: center">
                    <div style="width: 50px;">{{item.regionName}}:</div>
                    <div>
                      <div v-for="(items,index) in item.childRegions" style="width: 50px;display: -webkit-box;">{{items.regionName}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div style="color: rgb(24, 144, 255)">
                <span style="cursor: pointer" @click="edit(scope.row)">编辑</span> | <span style="cursor: pointer" @click='deleted(scope.row.merchantId)'>删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="添加授权地区" :visible.sync="dialogFormVisible" width="450px">
        <span style="font-size: 16px;font-weight: 700;display: inline-block;width: 80px;">商户工号：</span>
        <div v-for="(item,index) in dialogJobArr" style="margin: 10px 0;display: flex;">
          <el-select v-model='item.numStr' filterable clearable placeholder="请选择商户工号"
                     style="width: 74%;margin-left: 10px;">
            <el-option
              v-for="items in jobNumArr"
              :key="items.value"
              :label="items.label"
              :value="items.value">
            </el-option>
          </el-select>
          <el-button @click="addJobNum" type="primary" style="margin-left: 5px" icon="el-icon-plus"
                     v-if="item.isAdd == 'Y'">添加
          </el-button>
          <el-button @click="deleteJobNum(index)" type="danger" style="margin-left: 5px" icon="el-icon-error"
                     v-if="item.isAdd == 'N'">删除
          </el-button>
        </div>

        <div>
          <span style="font-size: 16px;font-weight: 700;display: inline-block;width: 80px;">授权地区：</span>
          <div v-for="(item,index) in dialogAreaArr" style="display: flex;margin: 10px 0;">
            <el-form class="area_li">
              <el-form-item>
                <el-select v-model="item.permissonProvinceId" placeholder="请选择省"
                           @change="selectProvince(item)">
                  <el-option v-for="(item,index) in provinceList" :key="index" :label="item.regionName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="item.permissonCityId" placeholder="请选择市">
                  <el-option v-for="(items,index) in item.cityList" :key="index" :label="items.regionName"
                             :value="items.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button @click="addArea" style="margin-left: 5px" type="primary" icon="el-icon-plus"
                       v-if="item.isAdd == 'Y'">添加
            </el-button>
            <el-button @click="deleteAddArea(index)" type="danger" style="margin-left: 5px" icon="el-icon-error"
                       v-if="item.isAdd == 'N'">删除
            </el-button>
          </div>
        </div>

        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmInfo">确 定</el-button>
        </div>
      </el-dialog>
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
  </div>
</template>

<script>
  import {toThousands} from '../../../static/js/util'
  import {mixin} from '../../static/js/mixin';
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'
  // import address from '../../static/js/address'

  export default {
    mixins: [mixin],
    name: 'authorized-areaNew',
    data() {
      return {
        loading: false,
        selectAll: {
          label: '全部',
          value: ''
        },
        workNum: '',
        roleSelect: '',
        provinceList: [], //省份列表
        areaListShow: [],
        selectRoleList: [],
        dialogFormVisible: false,
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
        // 商户工号
        jobNumArr: [],
        dialogJobArr: [{numStr: '', isAdd: 'Y'}],
        submitJobArr: [],
        // 授权地区
        dialogAreaArr: [{cityList: [], permissonProvinceId: '', permissonCityId: '', isAdd: 'Y'}],
        submitAreaArr: [],
      }
    },
    created() {
      this.selectRole()
      // this.getFetchArea()
      this.getJobNum();
      this.getFetchSectionArea();
    },
    methods: {
      // 页面长度改变
      pageSizeChange(value) {
        this.currentPage = 1
        this.pageSize = value
        this.getAreaList()
      },
      // 获取全部地区的数据
      // getFetchArea() {
      //   core.fetchArea().then(data => {
      //     if (data.code && '00' === data.code) {
      //       this.provinceList = data.result
      //       this.getAreaList()
      //     } else {
      //       this.$message.error(data.message)
      //     }
      //   })
      // },
      // 获取部分地区的数据
      getFetchSectionArea() {
        core.getFetchSectionArea().then(data => {
          if (data.code && '00' === data.code) {
            this.provinceList = data.result
            this.getAreaList()
          } else {
            this.$message.error(data.message)
          }
        })
      },
      // 获取商户工号
      getJobNum() {
        core.getJobNum().then(data => {
          if (data.code && '00' === data.code) {
            this.jobNumArr = data.result.map(item => {
              return {
                value: item.id,
                label: item.username
              }
            })
          } else {

          }
        })
      },
      // 获取列表数据
      getAreaList() {
        this.loading = true,
          core.getAreaList({
            'username': this.workNum,
            'roleId': this.roleSelect,
            'currentPage': this.currentPage,
            'pageSize': this.pageSize
          }).then(data => {
            if (data.code && data.code == '00') {
              this.pageTotal = data.result.amount
              this.loading = false
              if (data.result.data) {
                this.areaListShow = data.result.data
                console.log(this.areaListShow)
              } else {
                this.areaListShow = []
              }
            } else {
              this.loading = false
              this.$message.error(data.message)
            }
          })
      },
      // 获取角色
      selectRole() {
        core.fetchRoleType({}).then(data => {
          if (data.code == "00" && data.result) {
            this.selectRoleList = data.result;
          }
        })
      },
      //获取市
      selectProvince(e) {
        e.cityList = this._filterCity(e.permissonProvinceId)
        e.permissonCityId = ''
      },
      //打开授权
      showDialogAddArea() {
        this.dialogFormVisible = true
        this.dialogJobArr = [{numStr: '', isAdd: 'Y'}]
        this.dialogAreaArr=[{cityList: [], permissonProvinceId: '', permissonCityId: '', isAdd: 'Y'}]

      },
      //筛选
      selectBtn() {
        this.currentPage = 1
        this.getAreaList()
      },
      // 当前页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getAreaList()
      },
      //获取城市列表
      _filterCity(pId) {
        return (this.provinceList.filter(item => item.id == pId)).length ? (this.provinceList.filter(item => item.id == pId))[0].childRegions : []
      },

      // 增加商户工号个数
      addJobNum() {
        this.dialogJobArr = this.dialogJobArr.map(item => {
          if (item.isAdd == "Y") {
            item.isAdd = "N"
          }
          return item
        })
        this.dialogJobArr.push({numStr: '', isAdd: 'Y'})
      },
      // 删除商户工号
      deleteJobNum(e) {
        this.dialogJobArr = this.dialogJobArr.filter((item, index, self) => {
          if (index != e) {
            return item
          }
        })
      },
      // 增加地区数据
      addArea() {
        this.dialogAreaArr = this.dialogAreaArr.map(item => {
          if (item.isAdd == "Y") {
            item.isAdd = "N"
          }
          return item
        })
        this.dialogAreaArr.push({cityList: [], permissonProvinceId: '', permissonCityId: '', isAdd: 'Y'})
      },
      // 删除对应的地区栏
      deleteAddArea(e) {
        this.dialogAreaArr = this.dialogAreaArr.filter((item, index) => {
          if (index != e) {
            return item
          }
        })
      },
      // 整理商户工号
      arrangeJobNum() {
        this.submitJobArr = this.dialogJobArr.filter((item, index, arr) => {
          if (item.numStr != '') {
            return item
          }
        })
        this.submitJobArr = this.submitJobArr.map(item => {
          return item.numStr
        })
      },

      // 整理地区数据
      arrageArea() {
        this.submitAreaArr = this.dialogAreaArr.filter((item, index, arr) => {
          if (item.permissonProvinceId != '') {
            return item
          }
        })
        this.submitAreaArr = this.submitAreaArr.map(item => {
          return {
            parentId: item.permissonProvinceId,
            id: item.permissonCityId ? item.permissonCityId : '-1',
          }
        })
      },
      // 确认提交授权地区
      confirmInfo() {
        this.arrangeJobNum();
        this.arrageArea();
        core.confirmInfo({
          merchantIds: this.submitJobArr.join(),
          authorizeRegions: this.submitAreaArr,
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.dialogFormVisible = false
            this.$message({
              message: '添加授权地区成功！',
              type: 'success'
            });
            setTimeout(function () {
              location.reload()
            }, 500);
          } else {
            this.dialogFormVisible = false
            this.$message.error(data.message)
          }
        })
      },

      // 编辑授权内容
      edit(e) {
        this.dialogFormVisible = true
        console.log(e)
        this.dialogJobArr = [{numStr: e.merchantId, isAdd: ''}]

        let list = e.authorizeAreaList
        let len = list.length;
        let addr = [];
        if(list && len){
          for(var i=0;i<len;i++){
            let list2 = list[i]
            for(var y=0;y<list2.childRegions.length;y++){
              let list3 = list2.childRegions[y];
              let obj = {};
              Object.assign(obj,{
                permissonProvinceId: list2.id,
                permissonCityId: (list3.id > 0) ? list3.id : '',
                cityList: this._filterCity(list2.id),
                isAdd: 'N'
              })
              addr.push(obj)
            }
          }
        }
        this.dialogAreaArr = addr;
        let lens = this.dialogAreaArr.length-1;
        for(var i=0;i<=lens;i++){
          if(i == lens){
            this.dialogAreaArr[i].isAdd = "Y"
          }
        }
      },
      deleted(id) {
        core.deleteCon({
          merchantId: id,
        }).then(data => {
          if (data.code && '00' === data.code) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            setTimeout(function () {
              location.reload()
            }, 500);
          } else {
            this.$message.error(data.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .el-table {
    text-align: center;
  }

  .area_li {
    display: flex;
    justify-content: space-between;
    width: 74%;
    margin-left: 10px;
  }

  .area_li .el-form-item {
    margin-bottom: 0;
    width: 48%;
  }

</style>
<style>
  .authorized-areaNew .el-dialog__body {
    padding: 0 20px;
  }

  .authorized-areaNew .el-table th > .cell {
    text-align: center;
  }

  .authorized-areaNew .el-dialog__header {
    text-align: center;
  }
</style>

