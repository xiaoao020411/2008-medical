<template>
  <div class="mechanism">
    <div class="mechanism_top">
      <span>体检机构管理</span>
    </div>
    <div class="mechanism_body">
      <div class="body_span">
        <span>数据筛选</span>
      </div>
      <div class="body_div">
        <el-form
          :inline="true"
          size="small"
          :model="addComboData"
          class="demo-form-inline"
        >
          <el-form-item label="审批人">
            <el-input
              v-model="addComboData.exam_name"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市">
                <el-select
                  v-model="addComboData.exam_city"
                  placeholder="请选择所在城市"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select
                  v-model="addComboData.exam_city1"
                  placeholder="请选择所在城市"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构类型">
                <el-select
                  v-model="addComboData.exam_genre"
                  placeholder="请选择机构类型"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addComboData')"
              >查询</el-button
            >
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mechanism_footer">
      <div class="footer_button">
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-button type="danger">删除</el-button>
        <el-button>导入</el-button>
      </div>
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="套餐ID" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="exam_name"
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
          prop="name"
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
              @click.native.prevent="updataRow(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
      :title="this.itEild ? '修改' : '添加'"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <div class="mechanism_All">
        <el-form
          :model="addComboData"
          ref="addComboData"
          label-width="100px"
          class="demo-addComboData"
        >
          <div class="top">
            <div class="left">
              <el-form-item label="机构名称：" prop="exam_name">
                <el-input
                  v-model="addComboData.exam_name"
                  placeholder="请输入体检套餐名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="分支机构：" prop="exam_branch">
                <el-input
                  v-model="addComboData.exam_branch"
                  placeholder="请输入体检套餐名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="套餐ID：">
                <el-input placeholder="请输入体检套餐Id" :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="是否启用：" prop="exam_start">
                <el-switch
                  v-model="addComboData.exam_start"
                  active-value="0"
                  inactive-value="1"
                ></el-switch>
              </el-form-item>
              <el-form-item label="地址：" prop="startprice">
                <el-input
                  v-model="addComboData.startprice"
                  placeholder="请输入体检套餐原价"
                ></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="所在城市">
                <el-select
                  v-model="addComboData.exam_city"
                  placeholder="请选择所在城市"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select
                  v-model="addComboData.exam_city1"
                  placeholder="请选择所在城市"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构类型">
                <el-select
                  v-model="addComboData.exam_genre"
                  placeholder="请选择机构类型"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构属性">
                <el-checkbox
                  v-model="addComboData.exam_property"
                  true-label="1"
                  false-label="0"
                  >免预约</el-checkbox
                >
              </el-form-item>
              <el-form-item label="电话：" prop="exam_tel">
                <el-input
                  v-model="addComboData.exam_tel"
                  placeholder="请输入电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="坐标位置：" prop="startprice">
                <el-input
                  placeholder="请选择日期"
                  v-model="addComboData.exam_coord1"
                >
                </el-input>
                <el-input
                  placeholder="请输入内容"
                  v-model="addComboData.exam_coord2"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="foot">
            <div class="el-form-bottom">
              <el-form-item>
                <el-button @click="resetForm('dialogForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('addComboData')"
                  >确定</el-button
                >
              </el-form-item>
            </div>
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
        user: '',
        region: '',
      },
      addComboData: {
        exam_name: '',
        exam_branch: '',
        exam_city: '',
        exam_city1: '',
        exam_genre: '',
        exam_tel: '',
        exam_start: 0,
        exam_coord1: '',
        exam_coord2: '',
        exam_property: 0,
        startprice: '',
      },
      itEild: false,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      currentPage: 1,
      pageMaxNumber: 10,
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    //编辑
    updataRow(row) {
      this.itEild = true
      console.log(row)
      this.dialogVisible = true
      const packageData = { ...row }
      packageData.exam_tel = toString(packageData.exam_tel)
      packageData.exam_start = toString(packageData.exam_start)
      packageData.exam_coord1 = toString(packageData.exam_coord1)
      packageData.exam_coord2 = toString(packageData.exam_coord2)
      packageData.exam_property = toString(packageData.exam_property)
      packageData.exam_property = toString(packageData.exam_property)
      this.addComboData = packageData
    },
    onSubmit(addComboData) {
      this.$service.post('/lw//examo/find', this.addComboData).then((res) => {
        console.log(res)
      })
    },
    deleteRow(index, row) {
      console.log(index, row)
      this.$service
        .post('/lw/examo/delete', {
          idList: [row.id],
        })
        .then((res) => {
          console.log(res)
          this.getlist()
        })
    },
    //添加
    submitForm(addComboData) {
      if ((this.itEild = false)) {
        this.itEild = false
        console.log(this.addComboData)
        const packageData = { ...this.addComboData }
        packageData.exam_tel = parseFloat(packageData.exam_tel)
        packageData.exam_start = parseFloat(packageData.exam_start)
        packageData.exam_coord1 = parseFloat(packageData.exam_coord1)
        packageData.exam_coord2 = parseFloat(packageData.exam_coord2)
        packageData.exam_property = parseFloat(packageData.exam_property)
        packageData.exam_property = parseFloat(packageData.exam_property)
        console.log(packageData)

        this.$service.post('/lw/examo/add', packageData).then((res) => {
          console.log(res)
          this.dialogVisible = false
          this.getlist()
        })
      } else {
        this.itEild = true
        console.log(this.addComboData)
        const packageData = { ...this.addComboData }
        packageData.exam_tel = parseFloat(packageData.exam_tel)
        packageData.exam_start = parseFloat(packageData.exam_start)
        packageData.exam_coord1 = parseFloat(packageData.exam_coord1)
        packageData.exam_coord2 = parseFloat(packageData.exam_coord2)
        packageData.exam_property = parseFloat(packageData.exam_property)
        packageData.exam_property = parseFloat(packageData.exam_property)
        console.log(packageData)

        this.$service.post('/lw/examo/edit', packageData).then((res) => {
          console.log(res)
          this.dialogVisible = false
          this.getlist()
          this.addComboData = {}
        })
      }
    },
    //列表
    getlist() {
      this.$service
        .get(
          '/lw/examo/list?page=' +
            this.currentPage +
            '&size=' +
            this.pageMaxNumber
        )
        .then((res) => {
          console.log(res)
          this.tableData = res.data.data.data
        })
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style lang="scss">
.mechanism {
  .mechanism_top {
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
  .mechanism_body {
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
      border-top: none;
      display: flex;
      .demo-form-inline {
        margin-top: 15px;
        margin-left: 15px;
      }
    }
  }
  .mechanism_footer {
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
  .mechanism_All {
    width: 100%;
    height: 500px;
    .top {
      width: 100%;
      height: 400px;

      display: flex;
      .left {
        width: 50%;
        height: 100%;
      }
      .right {
        width: 50%;
        height: 100%;
      }
    }
    .foot {
      width: 100%;
      height: 100px;
      display: flex;
    }
  }
}
</style>
