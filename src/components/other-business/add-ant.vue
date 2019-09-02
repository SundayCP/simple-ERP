<template>
  <div class="add-ant">
    <h1 class="page-title">其他业务 / 蚂蚁花呗 / 商户管理 / {{title}}</h1>
    <div class="container" style="position: relative">
      <div style="position: fixed;right: 72px;z-index: 100">
        <el-button type="primary" plain>取消</el-button>
        <el-button type="primary" @click="submitBtn">确定</el-button>
      </div>
      <el-form :model="form" status-icon ref="form" label-width="140px">
        <el-form-item v-show="!flag" label="聚乐商户编号：">
          <!--<el-input type="password" v-model="form.userNum" auto-complete="off"></el-input>-->
          <template>
            <el-select filterable clearable style="width: 307px"
                       v-model="form.userNum" placeholder="请选择门店">
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.username"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item v-show="flag" label="商户编码：">
          <el-input disabled v-model="form.merchantNum"
                    auto-complete="off"></el-input>
          <span class="tip">(注意：填写营业执照中的名称。如果名称为“*”，请填写 省市区+经营者+行业的形式，比如：成都金牛区张三手机店)</span>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input v-model="form.userName"
                    auto-complete="off"></el-input>
          <span class="tip">(注意：填写营业执照中的名称。如果名称为“*”，请填写 省市区+经营者+行业的形式，比如：成都金牛区张三手机店)</span>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="经营者：">
          <el-input v-model="form.manager"
                    auto-complete="off"></el-input>
          <span class="tip">(注意：填写营业执照中的经营者)</span>
        </el-form-item>
        <el-form-item label="联系人电话：">
          <el-input v-model="form.mobile"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付宝类型：">
          <!--<el-input v-model="form.zfbType"-->
          <!--auto-complete="off"></el-input>-->
          <el-select style="width: 312px" v-model="form.zfbType"
                     placeholder="全部" clearable>
            <el-option v-for="(item, index) in options2" :key="index"
                       :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省市区：">
          <template>
            <!--<el-select style="width: 312px" v-model="form.areaCode"-->
            <!--placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <el-cascader style="width: 312px" placeholder="请选择"
                         :options="options"
                         v-model="form.areaCode"
            ></el-cascader>
          </template>
          <!--<el-input type="password" v-model="form.areaCode" autocomplete="off"></el-input>-->
        </el-form-item>
        <!--<el-form-item v-show="flag" label="省市区编码：">-->
        <!--<template>-->
        <!--<el-input disabled v-model="form.provinceNum"-->
        <!--auto-complete="off"></el-input>-->
        <!--</template>-->
        <!--&lt;!&ndash;<el-input type="password" v-model="form.areaCode" autocomplete="off"></el-input>&ndash;&gt;-->
        <!--</el-form-item>-->
        <el-form-item label="支付宝账号：">
          <el-input v-model="form.zfbAccount"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付宝认证人姓名/企业名称：">
          <el-input v-model="form.officialName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input v-model="form.creditCode"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片：">
          <!--<el-button type="primary" size="small">选择文件</el-button>-->
          <!--<p class="tips">(注意：上传清晰完整的营业执照图片，复印件需要涵盖公司公章)</p>-->
          <el-upload
            class="upload-demo"
            action="http://106.75.91.115:803/payAPIV/uploadPictures"
            :data="data1"
            ref="upload1"
            :on-success="uploadSuccess1"
            :on-error="uploadError1"
            :limit=1
            :on-remove="uploadRemove1"
            :on-exceed="uploadExceed1"
            name="imgFile"
            list-type="picture"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="tips">(注意：上传清晰完整的营业执照图片，复印件需要涵盖公司公章)</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证正面照：">
          <el-upload
            class="upload-demo"
            action="http://106.75.91.115:803/payAPIV/uploadPictures"
            :data="data1"
            ref="upload2"
            :on-success="uploadSuccess2"
            :on-error="uploadError2"
            :limit=1
            :on-remove="uploadRemove2"
            :on-exceed="uploadExceed2"
            name="imgFile"
            list-type="picture"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面照：">
          <el-upload
            class="upload-demo"
            action="http://106.75.91.115:803/payAPIV/uploadPictures"
            :data="data1"
            ref="upload3"
            :on-success="uploadSuccess3"
            :on-error="uploadError3"
            :limit=1
            :on-remove="uploadRemove3"
            :on-exceed="uploadExceed3"
            name="imgFile"
            list-type="picture"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="门店店内照：">
          <!--<el-button type="primary" size="small">选择文件</el-button>-->
          <!--<p class="tips">(注意：上传完整的店内照，不需要单独拍摄某一柜台)</p>-->
          <el-upload
            class="upload-demo"
            action="http://106.75.91.115:803/payAPIV/uploadPictures"
            :data="data1"
            ref="upload4"
            :on-success="uploadSuccess4"
            :on-error="uploadError4"
            :limit=1
            :on-remove="uploadRemove4"
            :on-exceed="uploadExceed4"
            name="imgFile"
            list-type="picture"
          >
            <div slot="tip" class="tips">(注意：上传完整的店内照，不需要单独拍摄某一柜台)</div>
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="门店招牌照：">
          <!--<el-button type="primary" size="small">选择文件</el-button>-->
          <!--<p class="tips">(注意：上传完整的门头照)</p>-->
          <el-upload
            class="upload-demo"
            action="http://106.75.91.115:803/payAPIV/uploadPictures"
            :data="data1"
            ref="upload5"
            :on-success="uploadSuccess5"
            :on-error="uploadError5"
            :limit=1
            :on-remove="uploadRemove5"
            :on-exceed="uploadExceed5"
            name="imgFile"
            list-type="picture"
          >
            <div slot="tip" class="tips">(注意：上传完整的门头照)</div>
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as core from '../../core/otherBusinessApi'

  export default {
    name: 'add-ant',
    data() {
      return {
        param1: null,//表单要提交的参数
        param2: null,//表单要提交的参数
        param3: null,//表单要提交的参数
        param4: null,//表单要提交的参数
        param5: null,//表单要提交的参数
        data1: {
          stamp: 'HJJB',
        },
        options: [],
        options1: [],
        options2: [{label: '个人', value: 1}, {label: '商户', value: 2}],
        form: {
          userNum: '',
          merchantNum: '',
          userName: '',
          email: '',
          manager: '',
          mobile: '',
          zfbType: '',
          areaCode: [],
          provinceNum: '',
          zfbAccount: '',
          officialName: '',
          creditCode: '',
          license: '',
          businessLicense: '',
          identityCard1: '',
          IdCardFront: '',
          identityCard2: '',
          IdCardVerso: '',
          shopPhoto1: '',
          shopFront: '',
          shopPhoto2: '',
          shopVerso: '',
        },
        flag: false,
        title: '添加花呗商户'
      }
    },
    created() {
      this.getProvince()
      this.getAntmerchant()
      if (this.$route.query.merchantId) {
        this.title = '编辑花呗商户'
        this.merchantDetail({merchantId: this.$route.query.merchantId})
        this.flag = true
      }
    },

    methods: {
      uploadSuccess1(response, file, fileList) {
        if (response.key) {
          this.form.license = response.key
        } else {
          this.$message.error(response.msg)
          this.$refs.upload1.clearFiles()
          return
        }
        console.log(response)
        this.param1 = new FormData();
        this.param1.append('file', file.raw, file.raw.name);
        console.log(this.param1)
        core.upload(this.param1).then(data => {
          if (data.code && '00' === data.code) {
            this.form.businessLicense = data.result
            this.$message.success('上传营业执照图片成功')
          } else {
            this.$message.error(data.message)
            this.$refs.upload1.clearFiles()
          }
        })

      },
      uploadRemove1() {
        this.form.license = ''
        this.form.businessLicense = ''
      },
      uploadError1(err, file, fileList) {
        this.$message.error('上传图片失败')
        this.$refs.upload1.clearFiles()
      },
      uploadExceed1(file, fileList) {
        this.$message.info('请上传单张图片')
      },


      uploadSuccess2(response, file, fileList) {
        if (response.key) {
          this.form.identityCard1 = response.key
        } else {
          this.$message.error(response.msg)
          this.$refs.upload2.clearFiles()
          return
        }
        this.param2 = new FormData();
        this.param2.append('file', file.raw, file.raw.name);
        core.upload(this.param2).then(data => {
          if (data.code && '00' === data.code) {
            this.form.IdCardFront = data.result
            this.$message.success('上传身份证正面照成功')
          } else {
            this.$message.error(data.message)
            this.$refs.upload2.clearFiles()
          }
        })

      },
      uploadRemove2() {
        this.form.identityCard1 = ''
        this.form.IdCardFront = ''
      },
      uploadError2(err, file, fileList) {
        this.$message.error('上传图片失败')
        this.$refs.upload2.clearFiles()
      },
      uploadExceed2(file, fileList) {
        this.$message.info('请上传单张图片')
      },

      uploadSuccess3(response, file, fileList) {
        if (response.key) {
          this.form.identityCard2 = response.key
        } else {
          this.$message.error(response.msg)
          this.$refs.upload3.clearFiles()
          return
        }
        this.param3 = new FormData();
        this.param3.append('file', file.raw, file.raw.name);
        core.upload(this.param3).then(data => {
          if (data.code && '00' === data.code) {
            this.form.IdCardVerso = data.result
            this.$message.success('上传身份证反面照成功')
          } else {
            this.$message.error(data.message)
            this.$refs.upload3.clearFiles()
          }
        })

      },
      uploadRemove3() {
        this.form.identityCard2 = ''
        this.form.IdCardVerso = ''
      },
      uploadError3(err, file, fileList) {
        this.$message.error('上传图片失败')
        this.$refs.upload3.clearFiles()
      },
      uploadExceed3(file, fileList) {
        this.$message.info('请上传单张图片')
      },


      uploadSuccess4(response, file, fileList) {
        if (response.key) {
          this.form.shopPhoto1 = response.key
        } else {
          this.$message.error(response.msg)
          this.$refs.upload4.clearFiles()
          return
        }
        this.param4 = new FormData();
        this.param4.append('file', file.raw, file.raw.name);
        core.upload(this.param4).then(data => {
          if (data.code && '00' === data.code) {
            this.form.shopFront = data.result
            this.$message.success('上传门店店内照成功')
          } else {
            this.$message.error(data.message)
            this.$refs.upload4.clearFiles()
          }
        })

      },
      uploadRemove4() {
        this.form.shopPhoto1 = ''
        this.form.shopFront = ''
      },
      uploadError4(err, file, fileList) {
        this.$message.error('上传图片失败')
        this.$refs.upload4.clearFiles()
      },
      uploadExceed4(file, fileList) {
        this.$message.info('请上传单张图片')
      },

      uploadSuccess5(response, file, fileList) {
        if (response.key) {
          this.form.shopPhoto2 = response.key
        } else {
          this.$message.error(response.msg)
          this.$refs.upload5.clearFiles()
          return
        }
        this.param5 = new FormData();
        this.param5.append('file', file.raw, file.raw.name);
        core.upload(this.param5).then(data => {
          if (data.code && '00' === data.code) {
            this.form.shopVerso = data.result
            this.$message.success('上传门店招牌照成功')
          } else {
            this.$message.error(data.message)
            this.$refs.upload5.clearFiles()
          }
        })

      },
      uploadRemove5() {
        this.form.shopPhoto2 = ''
        this.form.shopVerso = ''
      },
      uploadError5(err, file, fileList) {
        this.$message.error('上传图片失败')
        this.$refs.upload5.clearFiles()
      },
      uploadExceed5(file, fileList) {
        this.$message.info('请上传单张图片')
      },
      submitBtn() {
        if (this.form.userName === '') {
          this.$message.info('请输入商户名称')
          return
        }
        if (this.form.email === '') {
          this.$message.info('请输入邮箱')
          return
        }
        if (this.form.manager === '') {
          this.$message.info('请输入经营者')
          return
        }
        if (this.form.mobile === '') {
          this.$message.info('请输入联系人电话')
          return
        }
        if (this.form.zfbType === '') {
          this.$message.info('请选择支付宝类型')
          return
        }
        if (this.form.areaCode === []) {
          this.$message.info('请选择省市区')
          return
        }
        if (this.form.zfbAccount === '') {
          this.$message.info('请选择支付宝账号')
          return
        }
        if (this.form.officialName === '') {
          this.$message.info('请输入支付宝认证人姓名/企业名称')
          return
        }
        if (this.form.creditCode === '') {
          this.$message.info('请输入统一社会信用代码')
          return
        }
        //     userNum: '',
        //   merchantNum: '',
        //   userName: '',
        //   email: '',
        //   manager: '',
        //     mobile: '',
        //     zfbType: '',
        //     areaCode: [],
        //     provinceNum: '',
        //     zfbAccount: '',
        //     officialName: '',
        //     creditCode: '',
        //     license:'',
        //     businessLicense:'',
        //     identityCard1:'',
        //     IdCardFront:'',
        //     identityCard2:'',
        //     IdCardVerso:'',
        //     shopPhoto1:'',
        //     shopFront:'',
        //     shopPhoto2:'',
        //     shopVerso:'',
        if (!this.flag) {
          if (this.form.userNum === '') {
            this.$message.info('请选择聚乐商户编号')
            return
          }
          if (this.form.businessLicense === '' && this.form.license === '') {
            this.$message.info('请上传营业执照图片')
            return
          }
          if (this.form.IdCardFront === '' && this.form.identityCard1 === '') {
            this.$message.info('请上传身份证正面照')
            return
          }
          if (this.form.IdCardVerso === '' && this.form.identityCard2 === '') {
            this.$message.info('请上传身份证反面照')
            return
          }
          if (this.form.shopFront === '' && this.form.shopPhoto1 === '') {
            this.$message.info('请上传门店店内照')
            return
          }
          if (this.form.shopVerso === '' && this.form.shopPhoto2 === '') {
            this.$message.info('请上传门店招牌照')
            return
          }
          this.getAddAntmerchant({
            userNum: this.form.userNum,
            userName: this.form.userName + '-聚积宝',
            email: this.form.email,
            manager: this.form.manager,
            mobile: this.form.mobile,
            zfbType: this.form.zfbType,
            areaCode: this.form.areaCode[2],
            zfbAccount: this.form.zfbAccount,
            officialName: this.form.officialName,
            creditCode: this.form.creditCode,
            license: this.form.license,
            businessLicense: this.form.businessLicense,
            identityCard1: this.form.identityCard1,
            IdCardFront: this.form.IdCardFront,
            identityCard2: this.form.identityCard2,
            IdCardVerso: this.form.IdCardVerso,
            shopPhoto1: this.form.shopPhoto1,
            shopFront: this.form.shopFront,
            shopPhoto2: this.form.shopPhoto2,
            shopVerso: this.form.shopVerso,
          })

        }
        if (this.flag) {
          this.getEditAntmerchant({
            id: this.$route.query.merchantId,
            userName: this.form.userName + '-聚积宝',
            email: this.form.email,
            manager: this.form.manager,
            mobile: this.form.mobile,
            zfbType: this.form.zfbType,
            areaCode: this.form.areaCode[2],
            zfbAccount: this.form.zfbAccount,
            officialName: this.form.officialName,
            creditCode: this.form.creditCode,
            license: this.form.license,
            businessLicense: this.form.businessLicense,
            identityCard1: this.form.identityCard1,
            IdCardFront: this.form.IdCardFront,
            identityCard2: this.form.identityCard2,
            IdCardVerso: this.form.IdCardVerso,
            shopPhoto1: this.form.shopPhoto1,
            shopFront: this.form.shopFront,
            shopPhoto2: this.form.shopPhoto2,
            shopVerso: this.form.shopVerso,
          })
        }
      },
      getAddAntmerchant(opts) {
        core.addAntmerchant(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.$router.back()
            this.$message.success('添加花呗商户成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getEditAntmerchant(opts) {
        core.editAntmerchant(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.$router.back()
            this.$message.success('编辑花呗商户成功')
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getProvince() {
        core.province().then(data => {
          if (data.code && '00' === data.code) {
            let provinceList = []
            for (var i = 0; i < data.result.length; i++) {
              provinceList.push({})
              provinceList[i].value = data.result[i].id
              provinceList[i].label = data.result[i].regionName
              provinceList[i].children = []
              for (var j = 0; j < data.result[i].childRegions.length; j++) {
                provinceList[i].children.push({})
                provinceList[i].children[j].value = data.result[i].childRegions[j].id
                provinceList[i].children[j].parentId = data.result[i].childRegions[j].parentId
                provinceList[i].children[j].label = data.result[i].childRegions[j].regionName
                provinceList[i].children[j].children = []
                for (var k = 0; k < data.result[i].childRegions[j].childRegions.length; k++) {
                  provinceList[i].children[j].children.push({})
                  provinceList[i].children[j].children[k].value = data.result[i].childRegions[j].childRegions[k].code
                  provinceList[i].children[j].children[k].parentId = data.result[i].childRegions[j].childRegions[k].parentId
                  provinceList[i].children[j].children[k].label = data.result[i].childRegions[j].childRegions[k].regionName
                }
              }
            }
            this.options = provinceList
            this.provinceFlag = true
            if (this.detailFlag) {
              for (var i = 0; i < this.options.length; i++) {
                for (var j = 0; j < this.options[i].children.length; j++) {
                  for (var k = 0; k < this.options[i].children[j].children.length; k++) {
                    if (this.options[i].children[j].children[k].value === this.form.provinceNum) {
                      // console.log(this.options[i].children[j])
                      this.parentId = this.options[i].children[j].children[k].parentId
                    }
                  }
                }
              }
              for (var n = 0; n < this.options.length; n++) {
                for (var m = 0; m < this.options[n].children.length; m++) {
                  if (this.options[n].children[m].value == this.parentId) {
                    this.provinceId = this.options[n].children[m].parentId
                  }
                }
              }
              this.form.areaCode = [this.provinceId, this.parentId, this.form.provinceNum]
            }
          }
        })
      },
      merchantDetail(opts) {
        core.merchantDetail(opts).then(data => {
          if (data.code && '00' === data.code) {
            this.form.merchantNum = data.result.merchantCode
            this.form.userName = data.result.merchantName ? data.result.merchantName.split("-")[0] : '',
            this.form.email = data.result.email
            this.form.manager = data.result.contact
            this.form.mobile = data.result.mobile
            this.form.zfbType = data.result.zfbType
            this.form.provinceNum = data.result.provinceCityDistrictCode
            this.form.zfbAccount = data.result.zfbAccount
            this.form.officialName = data.result.zfbCertificateName
            this.form.creditCode = data.result.org
            this.detailFlag = true
            if (this.provinceFlag) {
              for (var i = 0; i < this.options.length; i++) {
                for (var j = 0; j < this.options[i].children.length; j++) {
                  for (var k = 0; k < this.options[i].children[j].children.length; k++) {
                    if (this.options[i].children[j].children[k].value == this.form.provinceNum) {
                      this.parentId = this.options[i].children[j].children[k].parentId
                    }
                  }
                }
              }
              for (var n = 0; n < this.options.length; n++) {
                for (var m = 0; m < this.options[n].children.length; m++) {
                  if (this.options[n].children[m].value === this.parentId) {
                    this.provinceId = this.options[n].children[m].parentId
                  }
                }
              }
              this.form.areaCode = [this.provinceId, this.parentId, this.form.provinceNum]
            }
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getAntmerchant() {
        core.getAntmerchant().then(data => {
          if (data.code && '00' === data.code) {
            this.options1 = data.result.data
          } else {
            this.$message.error(data.message)
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style>
  .el-form-item__label {
    /*line-height: 20px!important;*/
  }

  .add-ant .el-upload-list {
    width: 312px;
  }

  .add-ant .tips {
    font-size: 14px;
    color: #000;
    opacity: 0.45;
  }

  .add-ant .el-upload-list--picture .el-upload-list__item {
    height: 180px;
  }

  .add-ant .el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name {
    display: none;
  }

  .add-ant .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
  }

</style>
<style scoped>
  .tip {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .el-input {
    width: 312px;
  }

  .el-form-item {
    margin-bottom: 16px;
  }
</style>
