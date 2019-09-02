<template>
  <div class="role-management">
    <h1 class="page-title">用户管理 / 角色管理</h1>
    <div class="container">
      <!--<el-button type="primary" icon="el-icon-plus" style="float: right;margin-bottom: 16px;" @click="addRole">添加角色-->
      <!--</el-button>-->
      <template>
        <el-table :data="getRoleList" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="角色"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" :formatter="dateFormate"></el-table-column>
          <el-table-column prop="authority" label="权限" width="100">
            <template slot-scope="scope">
              <el-button :disabled="false" size="mini" @click="editRole(scope.row)" type="text">
                <el-tooltip popper-class="popper-btn__tip" content="编辑" placement="top">
                  <i class="icon-bianji"></i>
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
          <!--<el-table-column prop="action" label="操作" width="100">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button :disabled="false" size="mini" @click="deleteRole(scope.row)" type="text">-->
                <!--<el-tooltip popper-class="popper-btn__tip" content="删除" placement="top">-->
                  <!--<i class="icon-shanchu"></i>-->
                <!--</el-tooltip>-->
              <!--</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
      </template>
      <div class="pagination-box">
      </div>
    </div>
  </div>
</template>

<script>
  import {toThousands, dateFormate} from '../../../static/js/util'
  import * as core from '../../core/userManageApi'
  import CONFIG from '../../core/config'

  export default {
    name: 'role-management',
    data() {
      return {
        getRoleList: [],
        roleId: '',
        loading: false,
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      getTableList() {
        this.loading = true,
          core.fetchRoleType({}).then(data => {
            if (data.code == "00" && data.result) {
              this.loading = false
              this.getRoleList = data.result
              // this.roleId = data.result.roleId
            } else {
              this.loading = false
              this.$message.error(data.message)
            }
          })
      },
      // deleteRole(e) {
      //   this.$confirm('删除之后无法恢复，请问您确定要删除吗？', '温馨提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     core.deleteRole({
      //       roleId: e.id
      //     }).then(data => {
      //       if (data.code == "00") {
      //         this.$confirm('删除成功！', '提示', {
      //           confirmButtonText: '确定',
      //           showCancelButton: false,
      //           type: 'success'
      //         }).then(() => {
      //           this.getTableList.map(item => {
      //             return {
      //               id: item.id,
      //               name: item.name,
      //               createTime: item.createTime,
      //               level: item.level,
      //             }
      //           })
      //         })
      //       }
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
      // },
      dateFormate(row) {
        return dateFormate(row.createTime)
      },
      addRole() {
        this.$router.push({path: '/add-role', query: {roleId: 0}})
      },
      editRole(e) {
        this.$router.push({path: '/add-role', query: {roleId: e.id, name: e.name}})
        // this.$router.push({path: '/add-role'})
      },
    }
  }
</script>

<style scoped>
  .icon-bianji {
    font-size: 25px;
  }

  .icon-shanchu {
    font-size: 28px;
  }
</style>
