<template>
  <div class="edit-discount">
    <h1 class="page-title">用户管理 / 折扣设置</h1>
    <div class="container">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="saveEditDetail">保存</el-button>
        </el-form-item>
      </el-form>
      <template>
        <div>
          <el-table :data="goodsList" :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px">
            <el-table-column
              prop="type"
              label="产品分类"
              width="160">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="90">
            </el-table-column>
            <el-table-column
              prop="itemName"
              label="业务名称"
              width="170">
            </el-table-column>
            <el-table-column prop="discount" label="折扣">
              <!--<el-table-column prop="discount" label="折扣" width="380">-->
              <template slot-scope="scope" style="width: 200px;">
                <div class="input-container discount">
                  <p style="flex: 1;font-size:14px;padding-left: 9px;" v-show="scope.row.settlementType==='FIXED_NUM'">
                    ￥</p>
                  <input type="number" v-model="scope.row.discount" v-show="scope.row.settlementType==='FIXED_NUM'"
                         class="input-con fixedNum" style="text-align: left;padding-left: 10px;">
                  <input type="number" v-model="scope.row.discount" v-show="scope.row.settlementType==='RATE'"
                         class="input-con rate" style="">
                  <p style="flex: 1;font-size:14px;padding-right: 9px;" v-show="scope.row.settlementType==='RATE'">%</p>
                </div>
                <!--<div style="display: flex;flex-direction:column;align-items: center;">-->
                  <!--<template v-if="scope.row.itemName==='支付宝拉新核销'" style="display: flex;">-->
                    <!--<el-radio v-model="radio" label="one">T+1结算</el-radio>-->
                    <!--<div v-if="radio==='one'">-->
                      <!--首次结算金额：-->
                      <!--<el-input v-model="first" placeholder="" style="width: 80px"></el-input>-->
                      <!--二次结算金额：-->
                      <!--<el-input v-model="second" placeholder="" style="width: 80px"></el-input>-->
                    <!--</div>-->
                  <!--</template>-->
                  <!--<template v-if="scope.row.itemName==='支付宝拉新核销'" style="display: flex;">-->
                    <!--<el-radio v-model="radio" label="seven">T+7结算</el-radio>-->
                    <!--<div v-if="radio==='seven'">全款金额</div>-->
                  <!--</template>-->
                <!--</div>-->
              </template>
            </el-table-column>
            <el-table-column prop="prevDiscount" label="上级折扣" v-if="showPre">
              <template slot-scope="scope">
                <div class="input-container">
                  <p style="flex: 1;font-size:14px;padding-left: 9px;" v-show="scope.row.settlementType==='FIXED_NUM'">
                    <i v-show="scope.row.prevDiscount!=='未设置'">￥</i></p>
                  <input v-model="scope.row.prevDiscount" v-show="scope.row.settlementType==='FIXED_NUM'"
                         class="input-con" style="text-align: left;padding-left: 0px;"
                         disabled>
                  <input v-model="scope.row.prevDiscount" v-show="scope.row.settlementType==='RATE'"
                         class="input-con" style="text-align: right;padding-left: 20px;"
                         disabled>
                  <p style="flex: 1;font-size:14px;padding-right: 9px;" v-show="scope.row.settlementType==='RATE'"><i
                    v-show="scope.row.prevDiscount!=='未设置'">%</i></p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="loginDiscount" label="登录角色折扣" v-if="showLogin">
              <template slot-scope="scope">
                <div class="input-container loginDiscount">
                  <p style="flex: 1;font-size:14px;padding-left: 9px;" v-show="scope.row.settlementType==='FIXED_NUM'">
                    <i v-show="scope.row.loginDiscount!=='未设置'">￥</i></p>
                  <input v-model="scope.row.loginDiscount" v-show="scope.row.settlementType==='FIXED_NUM'"
                         class="input-con" style="text-align: left;padding-left: 0px;"
                         disabled>
                  <input v-model="scope.row.loginDiscount" v-show="scope.row.settlementType==='RATE'"
                         class="input-con rate" disabled>
                  <p style="flex: 1;font-size:14px;padding-right: 9px;" v-show="scope.row.settlementType==='RATE'"><i
                    v-show="scope.row.loginDiscount!=='未设置'">%</i></p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'

  export default {
    name: "edit-discount",
    data() {
      return {
        workNum: '',
        roleSelect: '',
        manageName: '',
        discount: '',
        prevDiscount: '',
        loginDiscount: '',
        loginRoleName: '',

        goodsList: [],
        discoutList: [],

        showPre: '',
        showLogin: '',

        list: [],

        radio: 'one',
        first: '',
        second: '',

      }
    },
    created() {
      this.getDiscountData()
      this.getUser()    //获取当前登录用户的信息
    },
    methods: {
      getUser() {
        core.fetchUser({}).then(data => {
          if (data.code && data.code == '00') {
            this.loginRoleName = data.result.roleName
            this.show()
          }
        })
      },
      show() {
        if (this.loginRoleName === '超级管理员') {
          if (this.$route.query.roleName === '大商户' || this.$route.query.roleName === '商户') {
            this.showPre = true
            this.showLogin = false
            console.log(this.loginRoleId, 111111111111)
          } else if (this.$route.query.roleName === '总代') {
            this.showPre = false
            this.showLogin = false
          }
          return
        }
        if (this.loginRoleName === '总代') {
          if (this.$route.query.roleName === '大商户') {
            this.showPre = false
            this.showLogin = true
          } else if (this.$route.query.roleName === '商户') {
            this.showPre = true
            this.showLogin = true
          }
          return
        }
        if (this.loginRoleName === '大商户') {
          if (this.$route.query.roleName === '商户') {
            this.showPre = false
            this.showLogin = true
          }
          return
        }
      },
      getDiscountData() {
        core.fetchDiscountData({
          'merchantId': this.$route.query.merchantId,
        }).then(data => {
          if (data.code && data.code == '00') {
            this.list = data.result.data
            let test = {}
            for (var i = 0; i < data.result.data.length; i++) {
              if (data.result.data[i].settlementType === 'RATE') {
                data.result.data[i].discount = data.result.data[i].rate
                data.result.data[i].loginDiscount = data.result.data[i].loginRate
                if (data.result.data[i].pRate == '-1') {
                  data.result.data[i].prevDiscount = '未设置'
                }
                else {
                  data.result.data[i].prevDiscount = data.result.data[i].pRate
                }
                if (data.result.data[i].loginRate == '-1') {
                  data.result.data[i].loginDiscount = '未设置'
                }
                else {
                }
              } else {
                data.result.data[i].discount = data.result.data[i].fixedNum
                data.result.data[i].prevDiscount = data.result.data[i].pFixedNum
                data.result.data[i].loginDiscount = data.result.data[i].loginFixedNum
                if (data.result.data[i].pFixedNum == '-1') {
                  data.result.data[i].prevDiscount = '未设置'
                }
                else {
                }
                if (data.result.data[i].loginFixedNum == '-1') {
                  data.result.data[i].loginDiscount = '未设置'
                }
                else {
                }
              }
              if (test[data.result.data[i].settlementType]) {
                test[data.result.data[i].settlementType].push(data.result.data[i])
              } else {
                test[data.result.data[i].settlementType] = []
                test[data.result.data[i].settlementType].push(data.result.data[i])
              }
            }
            this.flagList = {}
            for (var k in test) {
              this.flagList[k] = test[k].length
              this.goodsList = this.goodsList.concat(test[k])
            }
          }
        })
      },
      saveEditDetail(e) {
        this.discoutList = this.goodsList.map(item => ({
          itemId: item.itemId,
          itemName: item.itemName,
          rate: item.settlementType === 'RATE' ? (item.discount || -1) : -1,
          fixedNum: item.settlementType === 'FIXED_NUM' ? (item.discount || -1) : -1,
          settlementType: item.settlementType,
          merchantId: this.$route.query.merchantId,
        }))
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i]
          for (let j = 0; j < this.discoutList.length; j++) {
            let itemIn = this.discoutList[j]
            if (item.itemId == itemIn.itemId) {
              if (item.settlementType === 'RATE') {
                if (item.rate > -1 && itemIn.rate === -1) {
                  itemIn.rate = null
                }
              } else {
                if (item.fixedNum > -1 && itemIn.fixedNum === -1) {
                  itemIn.fixedNum = null
                }
              }
            }
          }
        }
        console.log(this.discoutList)
        core.updataDicountItem({
          'merchantId': this.$route.query.merchantId,
          'itemDiscounts': this.discoutList,
          // 'type':this.radio,
        }).then(data => {
          if (data.code && data.code == "00") {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push({path: '/set-discount'})
            }, 500)
          } else {
            this.$message.error(data.message)
          }
        })
      },

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        row.type = (row.settlementType === 'RATE' ? '积分类' : '活动类推广价')
        if (columnIndex === 0) {
          console.log(this.flagList)
          if (rowIndex % this.flagList.RATE === 0) {
            return {
              rowspan: this.flagList.RATE,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }


    },
  }
</script>
<style>
  .edit-discount .cell {
    display: flex;
    align-items: center;
  }

  .edit-discount .input-container {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .edit-discount  .discount {
    border: solid 1px #d9d9d9;
    background: #fff;
    margin-right: 20px;
  }

  .edit-discount  .loginDiscount {
    width: 85px;
    padding-left: 25px;
  }

  .edit-discount .input-con {
    flex: 4;
    width: 60%;
    background: #fff;
    outline: none;
  }
  .edit-discount .rate{
    text-align: right;
    padding-right: 0px;
  }
</style>
