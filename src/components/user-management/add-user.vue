<template>
  <div class="add-user">
    <h1 class="page-title">添加 / 编辑商户</h1>
    <div class="container">
      <el-button type="primary" @click="submit">提交</el-button>
      <p style="border-bottom: 1px dashed #d9d9d9;line-height: 24px;margin-top: 30px;">基础信息</p>
      <el-form ref="form" class="demo-ruleForm" :model="form" label-width="120px":rules="rules">
        <!--<el-form ref="form" :rules="rules" class="demo-ruleForm" :model="form" label-width="100px">-->
        <el-form-item  v-show="this.$route.query.merchantId" label="工号：" prop="workNum">
          <el-input v-model="form.workNum" disabled></el-input>
        </el-form-item>
        <el-form-item v-show="!this.$route.query.merchantId" label="工号：" prop="workNum">
          <el-input v-model="form.workNum"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd" v-show="this.$route.query.merchantId">
          <el-input v-model="form.pwd" placeholder="●●●●●●" value=""></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd" v-show="!this.$route.query.merchantId">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="可建用户数：" prop="userNum">      
          <el-input v-model="form.userNum"></el-input>
        </el-form-item>
        <el-form-item label="锁定状态：" prop="lockStatus">
          <!--<el-input v-model="form.lockStatus"></el-input>-->
          <el-select style="width: 105px" v-model="form.lockStatus" placeholder="请选择">
            <el-option label="锁定" value="Y"></el-option>
            <el-option label="未锁定" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="选择角色：" prop="role" v-if="$route.query.merchantId">
          <el-radio-group v-model="form.role">
            <el-radio :label="$route.query.roleId" :key="$route.query.roleId" :value="$route.query.roleName">{{$route.query.roleName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="选择角色：" prop="role" v-if="!this.$route.query.merchantId">
          <el-radio-group v-model="form.role">
            <el-radio v-for="item in selectRoleList" :label="item.id" :key="item.id" :value="item.name">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="showFlag">
          <p style="border-bottom: 1px dashed #d9d9d9;line-height: 24px;">详细信息</p>
          <div style="display: flex">
            <el-form-item label="商户名称：" style="margin-top: 16px;" prop="merchantName">
              <el-input v-model="form.merchantName"></el-input>
            </el-form-item>
            <el-form-item label="电话号码：" style="margin: 16px 0 0 20px;" prop="mobile">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="所在地区：" prop="province">
              <el-select style="width: 152px" v-model="form.province" placeholder="请选择省" @change="selectProvince">
                <el-option v-for="(item,index) in form.provinceList" :key="index" :label="item.regionName"
                           :value="item.id" style="width: 152px"></el-option>
              </el-select>
              <el-select style="width: 152px;margin-left:4px" v-model="form.city" placeholder="请选择市" prop="role">
                <el-option v-for="(item,index) in form.cityList" :key="index" :label="item.regionName"
                           :value="item.id" style="width: 152px"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行：" style="margin-left: 20px;" prop="bankType">
              <el-select style="width: 152px" filterable v-model="form.bankType" placeholder="请选择银行名称"
                         @click="chooseBank">
                <el-option v-for="(item,index) in bankList" :key="index" :label="item.text" :value="item.text"
                           style="width: 152px"></el-option>
              </el-select>
              <el-input v-model="form.bankName" placeholder="输入开户行名称" style="width: 152px;margin-left:4px"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="银行卡号：" prop="bankNum">
              <el-input v-model="form.bankNum"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" style="margin-left: 20px;" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="支付宝账号：" prop="zfbAccount">
              <el-input v-model="form.zfbAccount"></el-input>
            </el-form-item>
            <el-form-item label="备注：" style="margin-left: 20px;">
              <el-input v-model="form.note"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="证件提交：">
            <div style="width: 580px;display:flex;justify-content: space-between;vertical-align: center">
              <el-upload
                class="avatar-uploader"
                action="/admin/huabei/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1">
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 96px;"></i>
                <div slot="tip" class="el-upload__tip">营业执照</div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="/admin/huabei/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2">
                <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 96px;"></i>
                <div slot="tip" class="el-upload__tip">身份证正面</div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="/admin/huabei/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3">
                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 96px;"></i>
                <div slot="tip" class="el-upload__tip">身份证反面</div>
              </el-upload>
              <p style="color: #d50a0a;">(营业执照和身份证信息两者上传其一即可)</p>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'
  import BANK from '../../static/js/bank'

  // let province = address.filter(item => item.parent === '0')

  export default {
    name: "add-user",
    data() {
      return {
        searchForm: {},
        selectRoleList: '',
        selectRoleListId: '',
        areaList: [],
        lockStatusList: [],

        form: {
          workNum: '',
          pwd: '',
          userNum: '',
          lockStatus: '',
          role: '',
          merchantName: '',
          mobile: '',
          province: '',
          provinceList: [],
          city: '',
          cityList: [],
          bankType: '',
          bankName: '',
          bankNum: '',
          realName: '',
          zfbAccount: '',
          note: '',

        },
        bankList: BANK,
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',

        role: '',
        showFlag: true,

        rules:{
          workNum:[ { required: true, message: '请输入工号', trigger: 'blur' }],
          pwd:[ { required: true, message: '请输入密码', trigger: 'blur' }],
          userNum:[ {required: true, message: '请输入可建用户数', trigger: 'blur' }],
          lockStatus:[ {required: true, message: '请输入锁定状态', trigger: 'blur' }],
          role:[ { required: true, message: '请选择角色', trigger: 'change' }],
        }
      }
    },
    created() {
      this.getUser()    //获取当前登录用户的信息
      this.editUser()
      this.selectRole()   //获取可创建的角色
      this.getArea()
    },
    methods: {
      submit() {
        if (this.showFlag && this.form.imageUrl2 && !this.form.imageUrl3) {
          this.$message.error('请上传身份证反面图片！')
        } else if (this.showFlag && this.form.imageUrl3 && !this.form.imageUrl2) {
          this.$message.error('请上传身份证正面图片！')
        } else if(this.$route.query.roleName !== '操作员'){
          core.submitUser({
            'id': this.$route.query.id,
            'merchantId': this.$route.query.merchantId,
            'username': this.form.workNum,
            'password': this.form.pwd,
            'aliveNumber': this.form.userNum,
            'isLock': this.form.lockStatus,
            'roleId': this.form.role,
            'merchantName': this.form.merchantName ? this.form.merchantName : '',
            'mobile': this.form.mobile ? this.form.mobile : '',
            'provinceId': this.form.province ? this.form.province : '',
            'cityId': this.form.city ? this.form.city : '',
            'bankName': this.form.bankType ? this.form.bankType : '',
            'bankBranch': this.form.bankName ? this.form.bankName : '',
            'bankNum': this.form.bankNum ? this.form.bankNum : '',
            'realname': this.form.realName ? this.form.realName : '',
            'alipay': this.form.zfbAccount ? this.form.zfbAccount : '',
            'remark': this.form.note ? this.form.note : '',
            'businessLicense': this.imageUrl1 ? this.imageUrl1 : '',
            'idCardFront': this.imageUrl2 ? this.imageUrl2 : '',
            'idCardReverse': this.imageUrl3 ? this.imageUrl3 : '',
          }).then(data => {
            if (data.code && data.code == "00") {
              this.$confirm('提交成功！', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'success'
              }).then(() => {
                this.$router.push({path: '/user-management'});
              }).catch(() => {});
            } else {
              this.$message.error(data.message)
            }
          })
        }else{
          core.submitUser({
            'id': this.$route.query.merchantId,
            'merchantId': this.$route.query.merchantId,
            'username': this.form.workNum,
            'password': this.form.pwd,
            'aliveNumber': this.form.userNum,
            'isLock': this.form.lockStatus,
            'roleId': this.form.role,
            'merchantName': this.form.merchantName ? this.form.merchantName : '',
            'mobile': this.form.mobile ? this.form.mobile : '',
            'provinceId': this.form.province ? this.form.province : '',
            'cityId': this.form.city ? this.form.city : '',
            'bankName': this.form.bankType ? this.form.bankType : '',
            'bankBranch': this.form.bankName ? this.form.bankName : '',
            'bankNum': this.form.bankNum ? this.form.bankNum : '',
            'realname': this.form.realName ? this.form.realName : '',
            'alipay': this.form.zfbAccount ? this.form.zfbAccount : '',
            'remark': this.form.note ? this.form.note : '',
            'businessLicense': this.imageUrl1 ? this.imageUrl1 : '',
            'idCardFront': this.imageUrl2 ? this.imageUrl2 : '',
            'idCardReverse': this.imageUrl3 ? this.imageUrl3 : '',
          }).then(data => {
            if (data.code && data.code == "00") {
              this.$confirm('提交成功！', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'success'
              }).then(() => {
                this.$router.push({path: '/user-management'});
              }).catch(() => {});
            } else {
              this.$message.error(data.message)
            }
          })
        }
      },
      getArea() {
        core.fetchArea({}).then(data => {
          if (data.code && data.code == '00') {
            this.areaList = data.result
            this.form.provinceList = data.result
            this.areaList.map((item, index, arr) => {
              if (item.id === this.form.province) {
                this.form.cityList = item.childRegions
              }
            })
          }
        })
      },
      // 获取角色
      selectRole() {
        core.fetchRoleAdd({}).then(data => {
          if (data.code == "00" && data.result) {
            this.selectRoleList = data.result
            this.form.role = data.result[0].id
            // this.selectRoleListId = this.$route.query.id
            // this.form.role = data.result.id
          }
        })
      },

      getUser() {
        core.fetchUser({}).then(data => {
          if (data.code && data.code == '00') {
            this.form.role = data.result.roleName
            if (this.form.role == '商户' || this.$route.query.roleName == '操作员') {
              this.showFlag = false
            }
          }
        })
      },
      editUser() {
        let _merchantId = +this.$route.query.merchantId
        if (_merchantId) {
          core.editUser({
            'merchantId': this.$route.query.merchantId
          }).then(data => {
            if (data.code && data.code == '00') {
              if(this.$route.query.roleName){
              // <el-radio :label="this.selectRoleListId" :key="this.selectRoleListId">{{this.selectRoleList}}</el-radio>

                this.selectRoleList=this.$route.query.roleName
                this.selectRoleListId=this.$route.query.roleId
                this.form.role=this.$route.query.roleId
                this.form.workNum = data.result.username
                this.form.pwd = data.result.password
                this.form.userNum = data.result.aliveNumber
                this.form.lockStatus = data.result.isLock
                // this.form.role = this.$route.query.roleName
                this.form.merchantName = data.result.merchantName
                this.form.mobile = data.result.mobile
                this.form.province = data.result.provinceId
                this.form.city = data.result.cityId
                this.form.bankType = data.result.bankName
                this.form.bankName = data.result.bankBranch
                this.form.bankNum = data.result.bankNum
                this.form.realName = data.result.realname
                this.form.zfbAccount = data.result.alipay
                this.form.note = data.result.remark
                this.imageUrl1 = data.result.businessLicense ? data.result.businessLicense : ''
                this.imageUrl2 = data.result.idCardFront ? data.result.idCardFront : ''
                this.imageUrl3 = data.result.idCardReverse ? data.result.idCardReverse : ''
              }else{
                this.form.workNum = data.result.username
                this.form.pwd = data.result.password
                this.form.userNum = data.result.aliveNumber
                this.form.lockStatus = data.result.isLock
                this.form.role = data.result.roleId
                this.form.merchantName = data.result.merchantName
                this.form.mobile = data.result.mobile
                this.form.province = data.result.provinceId
                this.form.city = data.result.cityId
                this.form.bankType = data.result.bankName
                this.form.bankName = data.result.bankBranch
                this.form.bankNum = data.result.bankNum
                this.form.realName = data.result.realname
                this.form.zfbAccount = data.result.alipay
                this.form.note = data.result.remark
                this.imageUrl1 = data.result.businessLicense ? data.result.businessLicense : ''
                this.imageUrl2 = data.result.idCardFront ? data.result.idCardFront : ''
                this.imageUrl3 = data.result.idCardReverse ? data.result.idCardReverse : ''
              }


              // this.getArea()
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          // 添加 新的商品
          // core.getGoodsUpdate({
          //   'id': this.$route.query.id
          // }).then(item =>{
          //   if(item.code && item.code == '00'){
          //   }
          // })
        }
      },
      selectProvince() {
        this.form.city = ''
        this.areaList.map((item, index, arr) => {
          if (item.id === this.form.province) {
            this.form.cityList = item.childRegions
          }
        })
      },
      chooseBank() {
        this.bankName = this.bankList.filter(item => this.form.bankType == iten.value)
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val
      },
      handleAvatarSuccess1(response) {
        this.imageUrl1 = response.result
      },
      handleAvatarSuccess2(response) {
        this.imageUrl2 = response.result
      },
      handleAvatarSuccess3(response) {
        this.imageUrl3 = response.result
      },
    },

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 96px;
    height: 96px;
    line-height: 96px;
    text-align: center;
  }

  .avatar {
    width: 96px;
    height: 96px;
    display: block;
  }

  .el-upload__tip {
    text-align: center;
    margin-top: -11px !important;
  }

  .el-form-item__error {
    left: 20px;
  }

  .el-cascader .el-input, .el-cascader .el-input__inner {
    width: 312px;
  }
</style>

<style scoped>
  .el-form {
    margin-top: 16px;
  }

  .el-input {
    width: 312px;
  }

  .el-button--primary {
    float: right;
  }

</style>
