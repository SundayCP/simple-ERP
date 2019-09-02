<template>
  <div class="authorized-area">
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
        <el-form-item label="商户名称：">
          <el-input style="width: 105px" v-model="manageName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上级工号：">
          <el-input style="width: 105px" v-model="prevManager" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button plain @click="selectBtn">查询</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>

      </el-form>
      <template>
        <el-button type="primary" @click="showDialog">批量设置</el-button>
        <el-table
          ref="multipleTable"
          :data="areaListShow"
          tooltip-effect="dark"
          style="width: 100%;margin-top: 16px;"
          @selection-change="handleSelectionChange"
          v-loading="loading">
          <el-table-column label="ID" type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="工号" width="120"></el-table-column>
          <el-table-column prop="merchantName" label="商户名称"></el-table-column>
          <el-table-column prop="pname" label="上级工号"></el-table-column>
          <el-table-column prop="roleName" label="角色" width="80"></el-table-column>
          <el-table-column prop="permissonProvince" label="授权地区（省）">
            <template slot-scope="scope">
              <el-select style="width: 90%" v-model="scope.row.permissonProvinceId" placeholder="请选择省"
                         @change="selectProvince(scope.row)">
                <el-option v-for="(item,index) in provinceList" :key="index" :label="item.regionName"
                           :value="item.id"></el-option>
              </el-select>
              <!--<el-select v-if="" style="width: 100%" v-model="scope.row.permissonProvinceId" placeholder="请选择省"-->
              <!--@change="selectProvince(scope.row)">-->
              <!--<el-option v-for="(item,index) in provinceList" :key="index" :label="item.regionName"-->
              <!--:value="item.id"></el-option>-->
              <!--</el-select>-->

              <!--<el-select v-else style="width: 100%" v-model="scope.row.permissonProvinceId" placeholder="请选择省" disabled>-->
              <!--<el-option v-for="(item,index) in provinceList" :key="index" :label="item.regionName"-->
              <!--:value="item.id"></el-option>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column prop="permissonCity" label="授权地区（市）">
            <template slot-scope="scope">
              <el-select style="width: 90%;" v-model="scope.row.permissonCityId" placeholder="请选择市"
                         @change="updataAddressItem(scope.row)">
                <el-option v-for="(item,index) in scope.row.cityList" :key="index" :label="item.regionName"
                           :value="item.id"></el-option>
              </el-select>

              <!---->
              <!--<el-select v-if="" style="width: 100%;" v-model="scope.row.permissonCityId" placeholder="请选择市"-->
              <!--@change="updataAddressItem(scope.row)">-->
              <!--<el-option v-for="(item,index) in scope.row.cityList" :key="index" :label="item.regionName"-->
              <!--:value="item.id"></el-option>-->
              <!--</el-select>-->
              <!--<el-select v-else style="width: 100%;" v-model="scope.row.permissonCityId" placeholder="请选择市" disable>-->
              <!--<el-option v-for="(item,index) in scope.row.cityList" :key="index" :label="item.regionName"-->
              <!--:value="item.id"></el-option>-->
              <!--</el-select>-->

            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="授权地区批量设置" :visible.sync="dialogFormVisible" width="450px">
        <el-form>
          <el-form-item>
            <el-select style="width: 100%" v-model="permissonProvinceId" placeholder="请选择省"
                       @change="selectProvince2">
              <el-option v-for="(item,index) in provinceList" :key="index" :label="item.regionName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select style="width: 100%" v-model="permissonCityId" placeholder="请选择市">
              <el-option v-for="(item,index) in cityList" :key="index" :label="item.regionName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataAddressAll">确 定</el-button>
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
    mixins:[mixin],
    name: 'authorized-area',
    data() {
      return {
        loading: false,
        selectAll: {
          label: '全部',
          value: ''
        },
        workNum: '',
        roleSelect: '',
        manageName: '',
        prevManager: '',
        checkAll: false,
        isIndeterminate: true,

        province: '',
        city: '',
        cityList: [], //城市列表
        provinceList: [], //省份列表

        merchantId: '',

        permissonProvinceId: '',
        permissonCityId: '',

        areaList: [],
        areaListShow: [],
        selectRoleList: [],
        multipleSelection: [], //多选

        dialogFormVisible: false,

        pageSize: CONFIG.PAGE_SIZE,
        pageTotal: 0,
        currentPage: 1,
      }
    },
    created() {
      this.selectRole()
      this.getFetchArea()
    },
    methods: {
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.getAreaList()
      },
      getFetchArea() {
        core.fetchArea().then(data => {
          if (data.code && '00' === data.code) {
            this.provinceList = data.result
            this.getAreaList()
          } else {
            this.$message.error(data.message)
          }
        })
      }
      ,
      getAreaList() {
        this.loading = true,
          core.fetchAreaList({
            'username': this.workNum,
            'roleId': this.roleSelect,
            'merchantName': this.manageName,
            'pName': this.prevManager,
            'currentPage': this.currentPage,
            'pageSize': this.pageSize
          }).then(data => {
            if (data.code && data.code == '00') {
              this.pageTotal = data.result.amount
              this.loading = false
              if (data.result.data) {
                this.areaListShow = data.result.data.map(item => Object.assign(item, {
                  cityList: this._filterCity(item.permissonProvinceId),
                  permissonCityId: item.permissonCityId || '',
                  permissonProvinceId: item.permissonProvinceId || ''
                }))

                console.log(this.areaListShow)

              } else {
                this.areaListShow = []
              }
            } else {
              this.loading = false
              this.$message.error(data.message)
            }
          })
      }
      ,
      // 获取角色
      selectRole() {
        core.fetchRoleType({}).then(data => {
          if (data.code == "00" && data.result) {
            this.selectRoleList = data.result;
          }
        })
      }
      ,
      //单独获取省市
      selectProvince(e) {
        e.cityList = this._filterCity(e.permissonProvinceId)
        e.permissonCityId = ''
      }
      ,
      //批量设置获取省市
      selectProvince2() {
        this.cityList = this._filterCity(this.permissonProvinceId)
        this.permissonCityId = ''
      }
      ,
      //单独设置地区
      updataAddressItem(e) {
        core.updataAddressItem({
          'merchantId': e.id,
          'permisssionProvinceId': e.permissonProvinceId,
          'permisssionCityId': e.permissonCityId
        }).then(data => {
          if (data.code && data.code === '00') {
            this.$message({
              message: '设置成功！',
              type: 'success'
            });
          }
        })
      }
      ,
      //批量设置地区
      updataAddressAll() {
        core.updataAddressAll({
          'merchantIdStr': this.merchantIdStr.join(),
          'permisssionProvinceId': this.permissonProvinceId,
          'permisssionCityId': this.permissonCityId
        }).then(data => {
          if (data.code && data.code == "00") {
            this.dialogFormVisible = false
            this.$message({
              message: '批量设置成功！',
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
      ,
      exportData() {
        window.location.href = ' /admin/authorize/data/export?' + 'username=' + this.workNum + '&roleId=' + this.roleSelect + '&merchantName=' + this.manageName + '&pName=' + this.prevManager
      }
      ,
      showDialog() {
        if (this.multipleSelection.length <= 0) {
          this.$message.error('请选择')
        } else {
          this.dialogFormVisible = true
        }
      }
      ,
      selectBtn() {
        this.currentPage = 1
        this.getAreaList()
      }
      ,
      handleCurrentChange(val) {
        this.currentPage = val
        this.getAreaList()
      }
      ,
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.merchantIdStr = this.multipleSelection.map(item => item.id)
      }
      ,
      //获取城市列表
      _filterCity(pId) {
        return (this.provinceList.filter(item => item.id == pId)).length ? (this.provinceList.filter(item => item.id == pId))[0].childRegions : []

        // var arr = [];
        // for(var i in this.provinceList){
        //   if(this.provinceList[i].id == pId){
        //     arr = this.provinceList[i].childRegions
        //   }
        // }
        // return arr;

      }
    },

  }
</script>
<style>
  .authorized-area .el-dialog__body {
    padding: 0 20px;
  }
</style>
