<template>
  <div class="institutional">
    <div class="institutional_top">
      <span>机构指标管理</span>
    </div>
    <div class="institutional_body">
      <div class="body_span">
        <span>数据筛选</span>
      </div>
      <div class="body_div">
        <el-form
          :inline="true"
          size="small"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="审批人">
            <el-input
              v-model="formInline.orga_name"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item label="适用地区">
            <el-select v-model="formInline.belongs_orga" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否比对：" prop="is_comparison">
            <el-switch
              v-model="formInline.is_comparison"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formInline')"
              >查询</el-button
            >
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="institutional_footer">
      <div class="footer_button">
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-button type="danger">删除</el-button>
        <el-button>导入</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="套餐ID" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="套餐名称"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="name" align="center" label="原价" width="100">
        </el-table-column>
        <el-table-column prop="name" align="center" label="售价" width="100">
        </el-table-column>
        <el-table-column
          prop="orga_name"
          align="center"
          label="适用地区"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="是否启用"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="订购数量"
          width="180"
        >
        </el-table-column>
        <el-table-column fixed="right" align="left" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              @click.native.prevent="deleteRow([scope.row.id])"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      :title="this.itEdit ? '修改' : '添加'"
      :visible.sync="dialogVisible"
      width="90%"
      center
    >
      <div class="dialog_All">
        <el-form
          :model="addOrgaForm"
          ref="addOrgaForm"
          label-width="100px"
          class="demo-ruleForm dialog-addform"
        >
          <div class="dialog_top">
            <div class="top_left">
              <el-form-item label="机构指标名称：" prop="orga_name">
                <el-input
                  v-model="addOrgaForm.orga_name"
                  placeholder="请输入机构指标名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="机构指标ID：">
                <el-input
                  placeholder="请输入机构指标ID"
                  v-model="addOrgaForm.orga_id"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="是否比对：" prop="is_comparison">
                <el-switch
                  v-model="addOrgaForm.is_comparison"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
              <el-form-item label="指标单位：" prop="orga_unit">
                <el-input
                  v-model="addOrgaForm.orga_unit"
                  placeholder="请输入指标单位"
                ></el-input>
              </el-form-item>
              <el-form-item label="参考上限：" prop="upper_limit">
                <el-input
                  v-model="addOrgaForm.upper_limit"
                  placeholder="请输入参考上限"
                ></el-input>
              </el-form-item>
              <el-form-item label="参考下限：" prop="lower_limit">
                <el-input
                  v-model="addOrgaForm.lower_limit"
                  placeholder="请输入参考下限"
                ></el-input>
              </el-form-item>
            </div>
            <div class="top_tight">
              <el-form-item label="体检机构：">
                <el-select
                  v-model="addOrgaForm.belongs_orga"
                  placeholder="全部"
                >
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="dialog_foot">
            <el-form-item label="正常提示：" prop="normal_message">
              <el-input type="textarea" v-model="addOrgaForm.normal_message">
              </el-input>
            </el-form-item>
            <el-form-item label="偏高提示：" prop="high_message">
              <el-input
                type="textarea"
                v-model="addOrgaForm.high_message"
              ></el-input>
            </el-form-item>
            <el-form-item label="偏低提示：" prop="low_message">
              <el-input
                type="textarea"
                v-model="addOrgaForm.low_message"
              ></el-input>
            </el-form-item>
          </div>
          <div class="el-form-bottom">
            <el-form-item>
              <el-button>取消</el-button>
              <el-button type="primary" @click="submitForm('addOrgaForm')"
                >确定</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        orga_name: '',
        belongs_orga: '',
        is_comparison: '',
      },
      itEdit: false,
      addOrgaForm: {
        orga_name: '',
        orga_id: '',
        is_comparison: '',
        orga_unit: '',
        upper_limit: '',
        lower_limit: '',
        normal_message: '',
        high_message: '',
        low_message: '',
        belongs_orga: '',
      },
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
    }
  },
  created() {
    this.getOrgaList()
  },
  methods: {
    onSubmit(formInline) {
      this.$service
        .post('/lw/orga/findOrga', {
          pageData: {
            page: this.currentPage,
            size: this.pageSize,
          },

          serchForm: {
            serchName: this.formInline.orga_name,
            orgaInfo: this.formInline.belongs_orga,
            mappingStatus: this.formInline.is_comparison,
          },
        })
        .then((res) => {
          console.log(res)
          this.tableData = res.data.serchOrgaData.data
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getOrgaList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getOrgaList()
    },
    //编辑数据
    handleEdit(row) {
      console.log(row)

      this.dialogVisible = true
      this.itEdit = true
      const packageData = { ...row }
      packageData.is_comparison = toString(packageData.is_comparison)
      packageData.upper_limit = toString(packageData.upper_limit)
      packageData.lower_limit = toString(packageData.lower_limit)
      packageData.belongs_orga = toString(packageData.belongs_orga)
      this.addOrgaForm = packageData
    },
    //执行编辑
    submithandleEdit(formName) {},
    // 删除列表信息
    deleteRow(id) {
      // console.log(row.orga_id)
      // return
      console.log(id)

      this.$service
        .post('/lw/orga/delOrga', id)
        .then((res) => {
          this.open2()
          this.getOrgaList()
        })
        .catch((err) => {
          console.log(err)
          this.open()
        })
    },
    // 获取列表信息
    getOrgaList() {
      this.loading = true
      this.$service
        .get(
          '/lw/orga/orgaList?page=' +
            this.currentPage +
            '&size=' +
            this.pageSize
        )
        .then((res) => {
          this.loading = false
          console.log(res)
          this.tableData = res.data.data.data
        })
    },
    open() {
      this.$message.error('删除失败')
    },
    open2() {
      this.$message({
        message: '删除成功',
        type: 'success',
      })
    },
    //详情
    handleDetails(row) {
      console.log(row)
      this.$router.push({
        path: '/details',
        query: row,
      })
    },
    // 添加数据
    submitForm(formName) {
      //console.log(this.addOrgaForm);
      if (this.itEdit == false) {
        this.itEdit = false
        const packageData = { ...this.addOrgaForm }
        packageData.is_comparison = parseFloat(packageData.is_comparison)
        packageData.upper_limit = parseFloat(packageData.upper_limit)
        packageData.lower_limit = parseFloat(packageData.lower_limit)
        packageData.belongs_orga = parseFloat(packageData.belongs_orga)
        console.log(packageData)
        this.$service
          .post('/lw/orga/addOrga', packageData)
          .then((res) => {
            console.log(res)

            this.$notify({
              msg: 'ok',
              message: '添加成功',
              type: 'success',
            })
            this.dialogVisible = false
            this.getOrgaList()
            this.addOrgaForm = {}
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.itEdit = true
        const packageData = { ...this.addOrgaForm }
        packageData.is_comparison = parseFloat(packageData.is_comparison)
        packageData.upper_limit = parseFloat(packageData.upper_limit)
        packageData.lower_limit = parseFloat(packageData.lower_limit)
        packageData.belongs_orga = parseFloat(packageData.belongs_orga)
        console.log(packageData)

        this.$service
          .post('/lw/orga/editOrga', packageData)
          .then((res) => {
            // console.log(res);

            this.$notify({
              msg: 'ok',
              message: '编辑成功',
              type: 'success',
            })
            this.dialogVisible = false
            this.getOrgaList()
            this.addOrgaForm = {}
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>

<style lang="scss">
.dialog_All {
  width: 100%;
  height: 900px;
  .dialog_top {
    width: 100%;
    height: 500px;

    display: flex;
    .top_left {
      width: 50%;
      height: 100%;
    }
    .top_right {
      width: 50%;
      height: 100%;
    }
  }
  .dialog_foot {
    width: 100%;
    height: 200px;
  }
  .el-form-bottom {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.institutional {
  .institutional_top {
    height: 40px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .institutional_body {
    width: 100%;
    height: 122px;

    .body_span {
      height: 50px;
      background-color: #fff;
      border: 1px solid rgb(233, 233, 233);
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', 微软雅黑;
      font-weight: 700;
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
        font-size: 13px;
      }
    }
    .body_div {
      height: 70px;
      background-color: #fff;
      border: 1px solid rgb(233, 233, 233);

      display: flex;
      .demo-form-inline {
        margin-top: 15px;
        margin-left: 15px;
      }
    }
  }
  .institutional_footer {
    .footer_button {
      height: 90px;
      width: 100%;
      background-color: #fff;
      display: flex;
      align-items: center;

      .el-button--primary,
      .el-button + .el-button {
        width: 100px;
        height: 50px;
      }
    }
  }
}
</style>
