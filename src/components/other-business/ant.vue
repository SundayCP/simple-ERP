<template>
  <div class="ant">
    <h1 class="page-title" v-show="choose==1">其他业务 / 蚂蚁花呗 / 商户管理</h1>
    <h1 class="page-title" v-show="choose==2">其他业务 / 蚂蚁花呗 / 门店管理</h1>
    <h1 class="page-title" v-show="choose==3">其他业务 / 蚂蚁花呗 / 订单管理</h1>
    <div class="container">
      <div class="bar">
        <span :class="{active : choose==1}" @click="choose=1">商户管理</span>
        <span :class="{active : choose==2}" @click="choose=2">门店管理</span>
        <span :class="{active : choose==3}" @click="choose=3">订单管理</span>
      </div>
      <!--商户管理-->
      <div style="margin-top: 24px;" v-show="choose==1">
        <el-form :inline="true">
          <el-form-item label="商户编码：">
            <el-input style="width: 168px" v-model="merchantNum1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="商户名称：">
            <el-input style="width: 224px" v-model="merchantName1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input style="width: 146px" v-model="linkMan1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input style="width: 144px" v-model="linkMobile1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="支付宝类型：">
            <el-select style="width: 168px" v-model="zfbType1" placeholder="全部"
                       clearable>
              <el-option label="个人" value=1></el-option>
              <el-option label="商户" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select style="width: 168px" v-model="status1" placeholder="全部"
                       clearable>
              <el-option label="待授权" value="PERSMISSIONING"></el-option>
              <el-option label="审核中" value="AUDITING"></el-option>
              <el-option label="审核拒绝" value="AUDIT_REJECT"></el-option>
              <el-option label="审核成功" value="AUDIT_SUCCESS"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付宝账号：">
            <el-input style="width: 144px" v-model="zfbAccount1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="支付宝认证人姓名/企业名称：">
            <el-input style="width: 168px" v-model="officialName1"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button plain @click="inquire1">查询</el-button>
            <!--全部导出没有条件筛选-->
            <el-button type="primary" @click="exportData1">导出</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addMerchant">
              添加花呗商户
            </el-button>
          </el-form-item>
        </el-form>
        <template>
          <el-table v-loading="loading" :data="merchantList"
                    style="width: 100%">
            <el-table-column type="index" label="序号"
                             width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="60"></el-table-column>
            <el-table-column prop="merchantCode" label="商户编码"
                             width="120"></el-table-column>
            <el-table-column prop="provinceCityDistrictCode" label="省市区编码"
                             width="100"></el-table-column>
            <el-table-column prop="merchantName" label="商户名称 "
                             width="220"></el-table-column>
            <el-table-column prop="email" label="邮箱"
                             width="180"></el-table-column>
            <el-table-column prop="contact" label="联系人"
                             width="80"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"
                             width="120"></el-table-column>
            <el-table-column label="支付宝类型"
                             width="90">
              <template slot-scope="scope">
                <span v-show="scope.row.zfbType===1">个人</span>
                <span v-show="scope.row.zfbType===2">商户</span>
              </template>
            </el-table-column>
            <el-table-column prop="zfbAccount" label="支付宝账号"
                             width="140"></el-table-column>
            <el-table-column prop="zfbCertificateName" label="支付宝认证人姓名"
                             width="135"></el-table-column>
            <el-table-column label="状态"
                             width="80">
              <template slot-scope="scope">
                <span v-show="scope.row.status==='PERSMISSIONING'">待授权</span>
                <span v-show="scope.row.status==='AUDITING'">审核中</span>
                <span v-show="scope.row.status==='AUDIT_REJECT'">审核拒绝</span>
                <span v-show="scope.row.status==='AUDIT_SUCCESS'">审核成功</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="105">
              <template slot-scope="scope">
                <el-button :disabled="false" size="mini"
                           @click="editMerchant(scope.row)" type="text">
                  <el-tooltip popper-class="popper-btn__tip" content="编辑"
                              placement="top">
                    <i class="icon-bianji"></i>
                  </el-tooltip>
                </el-button>
                <el-button :disabled="false" size="mini"
                           @click="deleteMerchant(scope.row)" type="text">
                  <el-tooltip popper-class="popper-btn__tip" content="删除"
                              placement="top">
                    <i class="icon-shanchu"></i>
                  </el-tooltip>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="pagination-box">
          <el-pagination
            background
            @current-change="handleCurrentChange1"
            :current-page.sync="currentPage1"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            layout="sizes, prev, pager, next, jumper"
            :total="pageTotal1">
          </el-pagination>
        </div>
      </div>
      <!--门店管理-->
      <div style="margin-top: 24px;" v-show="choose==2">
        <el-form :inline="true">
          <el-form-item label="门店编码：">
            <el-input style="width: 168px" v-model="storeNum2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="商户编码：">
            <el-input style="width: 224px" v-model="merchantNum2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="门店名称：">
            <el-input style="width: 224px" v-model="merchantName2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input style="width: 146px" v-model="linkMan2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input style="width: 144px" v-model="linkMobile2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="门店地址：">
            <el-input style="width: 224px" v-model="linkAddress2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="省市区编码：">
            <el-input style="width: 146px" v-model="postalCode2"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button plain @click="inquire2">查询</el-button>
            <!--<el-button type="primary" @click="exportData2">导出</el-button>-->
            <el-button type="primary" icon="el-icon-plus" @click="addStore">
              添加花呗门店
            </el-button>
          </el-form-item>
        </el-form>
        <template>
          <el-table v-loading="loading" :data="storeList" style="width: 100%">
            <el-table-column type="index" label="序号"
                             width="80"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="storeCode" label="门店编码"
                             width="120"></el-table-column>
            <el-table-column prop="merchantCode" label="所属商户编码"
                             width="120"></el-table-column>
            <el-table-column prop="name" label="门店名称 "
                             width="220"></el-table-column>
            <el-table-column prop="contact" label="门店联系人"
                             width="120"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"
                             width="160"></el-table-column>
            <el-table-column prop="address" label="门店地址"
                             min-width="250"></el-table-column>
            <el-table-column prop="provinceCityDistrictCode" label="省市区编码"
                             width="120"></el-table-column>
            <el-table-column prop="action" label="操作" fixed="right" width="105">
              <template slot-scope="scope">
                <el-button :disabled="false" size="mini"
                           @click="editShop(scope.row)" type="text">
                  <el-tooltip popper-class="popper-btn__tip" content="编辑"
                              placement="top">
                    <i class="icon-bianji"></i>
                  </el-tooltip>
                </el-button>
                <el-button :disabled="false" size="mini"
                           @click="deleteShop(scope.row)" type="text">
                  <el-tooltip popper-class="popper-btn__tip" content="删除"
                              placement="top">
                    <i class="icon-shanchu"></i>
                  </el-tooltip>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="pagination-box">
          <el-pagination
            background
            @current-change="handleCurrentChange2"
            :current-page.sync="currentPage2"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            layout="sizes, prev, pager, next, jumper"
            :total="pageTotal2">
          </el-pagination>
        </div>
      </div>
      <!--订单管理-->
      <div style="margin-top: 24px;" v-show="choose==3">
        <el-form :inline="true">
          <el-form-item label="商户编码：">
            <el-input style="width: 144px" v-model="merchantNum3"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="门店编码：">
            <el-input style="width: 144px" v-model="storeNum3"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="外部订单号：">
            <el-input style="width: 224px" v-model="outOrderNum3"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="顾客手机号：">
            <el-input style="width: 144px" v-model="clientMobile3"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select clearable="" style="width: 168px" v-model="orderStatus3"
                       placeholder="全部">
              <el-option label="待支付" value="WAIT"></el-option>
              <el-option label="支付成功" value="SUCCESS"></el-option>
              <el-option label="支付失败"
                         value="FAIL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button @click="inquire3" plain>查询</el-button>
            <!--<el-button type="primary" @click="exportData3">导出</el-button>-->
          </el-form-item>
        </el-form>
        <template>
          <el-table v-loading="loading" :data="orderList" style="width: 100%">
            <el-table-column type="index" label="序号"
                             width="70"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="createTime" :formatter="dateFormate"
                             label="创建时间" width="160"></el-table-column>
            <el-table-column prop="merchantCode" label="商户编码"
                             width="120"></el-table-column>
            <el-table-column prop="storeCode" label="门店编码"
                             width="100"></el-table-column>
            <el-table-column prop="huabeiOrderId" label="外部订单号 "
                             width="200"></el-table-column>
            <el-table-column label="顾客总支付金额"
                             width="120" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.totalAmount)}}</template>
            </el-table-column>
            <el-table-column label="订单总金额"
                             width="140" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.orderAmount)}}</template>
            </el-table-column>
            <el-table-column label="手续费金额"
                             width="120" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.poundageAmount)}}</template>

            </el-table-column>
            <el-table-column label="补差价金额"
                             width="100" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.spreadAmount)}}</template>
            </el-table-column>
            <el-table-column label="是否使用营销包" width="125">
              <template slot-scope="scope">
                <span v-show="scope.row.marketingFlag==='T'">是</span>
                <span v-show="scope.row.marketingFlag==='F'">否</span>
              </template>
            </el-table-column>
            <el-table-column label="营销包金额"
                             width="80" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.marketAmount)}}</template>
            </el-table-column>
            <el-table-column label="每月分期本金" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.repayPerMonth)}}</template>
            </el-table-column>
            <el-table-column label="分期本金" align="right">
              <template slot-scope="scope">{{toThousands(scope.row.capitalAmount)}}</template>
            </el-table-column>
            <el-table-column prop="periods" label="分期期数"></el-table-column>
            <el-table-column prop="status" label="订单状态"></el-table-column>
            <el-table-column prop="msg" label="失败原因"></el-table-column>
            <el-table-column prop="customerName" label="顾客姓名"></el-table-column>
            <el-table-column prop="telNo" label="顾客手机号"></el-table-column>
            <el-table-column prop="brandName" label="产品品牌"></el-table-column>
            <el-table-column prop="modelName" label="品牌型号"></el-table-column>
            <el-table-column prop="jlMerchantId"
                             label="聚乐商户号"></el-table-column>
          </el-table>
        </template>
        <div class="pagination-box">
          <el-pagination
            background
            @current-change="handleCurrentChange3"
            :current-page.sync="currentPage3"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            layout="sizes, prev, pager, next, jumper"
            :total="pageTotal3">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="441px"
               :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="90px">
        <el-form-item label="门店编码:" v-show="formDisable">
          <el-input :disabled="formDisable" style="width: 307px"
                    v-model="form.storeNum2"
                    auto-complete="off"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item v-show="dialogTitle==='添加门店信息'" label="花呗商户:">
          <!--<el-input style="width: 307px" v-model="form.merchantName2"-->
          <!--autoc-omplete="off"-->
          <!--placeholder=""></el-input>-->
          <template>
            <el-select filterable clearable style="width: 307px"
                       v-model="form.merchantName2" placeholder="请选择门店">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.merchantName"
                :value="item.merchantCode">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="门店名称:">
          <el-input style="width: 307px" v-model="form.name2"
                    autoc-omplete="off"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="门店联系人:">
          <el-input style="width: 307px" v-model="form.linkMan2"
                    autoc-omplete="off"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系人电话:">
          <el-input style="width: 307px" v-model="form.linkMobile2"
                    autoc-omplete="off"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="门店地址:">
          <el-input style="width: 307px" v-model="form.linkAddress2"
                    autoc-omplete="off"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item v-show="formDisable" label="省市区编码:">
          <el-input :disabled="formDisable" style="width: 307px"
                    v-model="form.postalCode2"
                    autoc-omplete="off"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消
        </el-button>
        <el-button type="primary" size="mini"
                   @click="submitBtn">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/otherBusinessApi'
  import CONFIG from '../../core/config';
  import {mixin} from '../../static/js/mixin';

  export default {
    mixins:[mixin],
    name: 'ant',
    data() {
      return {
        options: [],
        dialogFormVisible: false,
        form: {
          id: '',
          storeNum2: '',
          name2: '',
          merchantName2: '',
          linkMan2: '',
          linkMobile2: '',
          linkAddress2: '',
          postalCode2: ''
        },
        dialogTitle: '添加门店信息',
        formDisable: false,
        loading: true,
        choose: 1,
        // 商户管理
        merchantNum1: '',//商户编码
        merchantName1: '',//商户名称
        linkMan1: '',//联系人
        linkMobile1: '',//联系电话
        zfbType1: '',//支付宝类型
        zfbAccount1: '',//支付宝账号
        status1: '',//状态
        officialName1: '',//支付宝认证姓名
        currentPage1: 1,
        pageSize1: CONFIG.PAGE_SIZE,
        pageSize: CONFIG.PAGE_SIZE,
        pageTotal1: 0,
        // 门店管理
        storeNum2: '',//门店编码
        merchantNum2: '',//商户编码
        merchantName2: '',//门店名称
        linkMan2: '',//联系人
        linkMobile2: '',//联系电话
        linkAddress2: '',//门店地址
        postalCode2: '',//邮政编码
        currentPage2: 1,
        pageSize2: CONFIG.PAGE_SIZE,
        pageTotal2: 10,
        // 订单管理
        merchantNum3: '',//商户编码
        storeNum3: '',//门店编码
        outOrderNum3: '',//外部订单号
        clientMobile3: '',//顾客手机号
        orderStatus3: '',//订单状态
        currentPage3: 1,
        pageSize3: CONFIG.PAGE_SIZE,
        pageTotal3: 10,
        // 商户管理列表
        merchantList: [],
        // 门店管理列表
        storeList: [],
        // 订单管理列表
        orderList: [],
      }
    },
    created() {
      this.inquire1()
      this.inquire2()
      this.inquire3()
      this.getStoreList()
    },
    methods: {
      pageSizeChange(value) {
        this.currentPage=1
        this.pageSize=value
        this.inquire1()
        this.inquire2()
        this.inquire3()
        },
      toThousands(val) {
        return toThousands(val)
      },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
      getStoreList(opts) {
        core.storeList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.options = data.result.data
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getFetchMerchantList(opts) {
        this.loading = true
        core.fetchMerchantList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.merchantList = data.result.data.map(item=>{return Object.assign(item,{'merchantName': item.merchantName ? item.merchantName.split('-')[0] : ''})})
            this.pageTotal1 = data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val
        this.selectObj1.currentPage1 = val
        this.getFetchMerchantList(this.selectObj1)
      },
      inquire1() {
        this.currentPage1 = 1
        this.selectObj1 = {
          merchantNum1: this.merchantNum1,
          merchantName1: this.merchantName1,
          linkMan1: this.linkMan1,
          linkMobile1: this.linkMobile1,
          zfbType1: this.zfbType1,
          zfbAccount1: this.zfbAccount1,
          status1: this.status1,
          officialName1: this.officialName1,
          currentPage1: 1,
          pageSize1: this.pageSize,
        }
        this.getFetchMerchantList(this.selectObj1)
      },
      exportData1() {
        //   'merchantCode': opts.merchantNum1,
        //   'merchantName': opts.merchantName1,
        //   'contact': opts.linkMan1,
        //   'mobile': opts.linkMobile1,
        //   'zfbType': opts.zfbType1,
        //   'zfbAccount': opts.zfbAccount1,
        //   'status': opts.status1,
        //   'zfbCertificateName': opts.officialName1,
        window.location.href = '/admin/huabei/huabeiMerchantExport'
      },
      getFetchStoreList(opts) {
        this.loading = true
        core.fetchStoreList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.storeList = data.result.data
            this.pageTotal2 = data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        this.selectObj2.currentPage2 = val
        this.getFetchStoreList(this.selectObj2)
      },
      inquire2() {
        this.currentPage2 = 1
        this.selectObj2 = {
          storeNum2: this.storeNum2,
          merchantNum2: this.merchantNum2,
          merchantName2: this.merchantName2,
          linkMan2: this.linkMan2,
          linkMobile2: this.linkMobile2,
          linkAddress2: this.linkAddress2,
          postalCode2: this.postalCode2,
          currentPage2: 1,
          pageSize2: this.pageSize,
        }
        this.getFetchStoreList(this.selectObj2)
      },
      exportData2() {
        window.location.href = ''
      },
      getFetchAntOrderList(opts) {
        this.loading = true
        core.fetchAntOrderList(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.loading = false
            this.orderList = data.result.data
            this.pageTotal3 = data.result.amount
          } else {
            this.loading = false
            this.$message.error(data.message)
          }
        })
      },
      handleCurrentChange3(val) {
        this.currentPage3 = val
        this.selectObj3.currentPage3 = val
        this.getFetchAntOrderList(this.selectObj3)
      },
      inquire3() {
        this.currentPage3 = 1
        this.selectObj3 = {
          merchantNum3: this.merchantNum3,
          storeNum3: this.storeNum3,
          outOrderNum3: this.outOrderNum3,
          clientMobile3: this.clientMobile3,
          orderStatus3: this.orderStatus3,
          currentPage3: 1,
          pageSize3: this.pageSize,
        }
        this.getFetchAntOrderList(this.selectObj3)
      },
      exportData3() {
        window.location.href = ''
      },
      //添加商户
      addMerchant() {
        this.$router.push({path: '/add-ant'})
      },
      //编辑商户
      editMerchant(val) {
        this.$router.push({path: '/add-ant', query: {merchantId: val.id}})
      },
      //删除商户
      deleteMerchant(val) {
        this.$confirm('删除之后无法恢复，请问您确定要删除吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          core.deleteAntmerchant({id: val.id}).then(data => {
            if (data.code && '00' === data.code) {
              this.$message.success('删除商户成功')
              this.getFetchMerchantList(this.selectObj1)
            } else {
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
      //添加门店
      addStore() {
        this.formDisable = false
        this.dialogTitle = '添加门店信息'
        this.form.id = ''
        this.form.name2 = ''
        this.form.storeNum2 = ''
        this.form.merchantName2 = ''
        this.form.linkMan2 = ''
        this.form.linkMobile2 = ''
        this.form.linkAddress2 = ''
        this.form.postalCode2 = ''
        this.dialogFormVisible = true
      },
      //编辑门店
      editShop(val) {
        this.formDisable = true
        this.dialogTitle = '编辑门店信息'
        this.form.id = val.id
        this.form.storeNum2 = val.storeCode
        // this.form.merchantName2 = val.storeCode
        this.form.name2 = val.name
        this.form.linkMan2 = val.contact
        this.form.linkMobile2 = val.mobile
        this.form.linkAddress2 = val.address
        this.form.postalCode2 = val.provinceCityDistrictCode
        this.dialogFormVisible = true
      },
      //删除门店
      deleteShop(val) {
        this.$confirm('删除之后无法恢复，请问您确定要删除吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          core.deleteAntStore({id: val.id}).then(data => {
            if (data.code && '00' === data.code) {
              this.$message.success('删除花呗门店成功')
              this.getFetchStoreList(this.selectObj2)
            } else {
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
      submitBtn() {
        if (this.form.name2 === '') {
          this.$message.info('请输入门店名称')
          return
        }
        if (this.form.linkMan2 === '') {
          this.$message.info('请输入门店联系人')
          return
        }
        if (this.form.linkMobile2 === '') {
          this.$message.info('请输入联系人电话')
          return
        }
        if (this.form.linkAddress2 === '') {
          this.$message.info('请输入门店地址')
          return
        }
        if (this.dialogTitle === '编辑门店信息') {
          core.editAntStore({
            id: this.form.id,
            // storeNum2: this.form.storeNum2,
            // merchantName2: this.form.merchantName2,
            name2: this.form.name2,
            linkMan2: this.form.linkMan2,
            linkMobile2: this.form.linkMobile2,
            linkAddress2: this.form.linkAddress2,
            // postalCode2: this.form.postalCode2
          }).then(data => {
            if (data.code && '00' === data.code) {
              this.$message.success('编辑花呗门店成功')
              this.getFetchStoreList(this.selectObj2)
              this.dialogFormVisible = false
            } else {
              this.$message.error(data.message)
            }
          })

        } else {
          if (this.form.merchantName2 === '') {
            this.$message.info('请选择花呗商户')
            return
          }
          core.addAntStore({
            id: '',
            // storeNum2: this.form.storeNum2,
            merchantName2: this.form.merchantName2,
            name2: this.form.name2,
            linkMan2: this.form.linkMan2,
            linkMobile2: this.form.linkMobile2,
            linkAddress2: this.form.linkAddress2,
            // postalCode2: this.form.postalCode2
          }).then(data => {
            if (data.code && '00' === data.code) {
              this.$message.success('添加花呗门店成功')
              this.getFetchStoreList(this.selectObj2)
              this.dialogFormVisible = false
            } else {
              this.$message.error(data.message)
            }
          })
        }
      },
    },
  }
</script>
<style>
  .ant .el-dialog__body {
    padding: 0px 16px;
  }
</style>
<style scoped>
  .bar {
    width: 100%;
    height: 40px;
    background-color: #f5f7fa;
    border-radius: 4px 4px 0px 0px;
    border: solid 1px #dcdfe6;
  }

  .bar span {
    width: 96px;
    height: 41px;
    display: inline-block;

    line-height: 40px;
    color: #000000;
    opacity: 0.85;
    text-align: center;
  }

  .active {
    background: #fff;
    border-radius: 4px 4px 0px 0px;
    border: solid 1px #dcdfe6;
    border-bottom: none;
    border-top: none;
    color: #1890ff !important;
  }

  .icon-bianji {
    font-size: 25px;
  }

  .icon-shanchu {
    font-size: 28px;
  }
</style>
