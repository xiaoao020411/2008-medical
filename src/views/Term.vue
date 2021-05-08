<template>
  <div class="setmeal">
    <div class="setmeal_top">
      <span>体检套餐管理</span>
    </div>
    <div class="setmeal_body">
      <div class="body_span">
        <span>数据筛选</span>
      </div>
      <!-- 搜索引擎 -->
      <div class="body_div">
        <el-form
          :inline="true"
          size="small"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="审批人">
            <el-input v-model="formInline.id" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="适用地区">
            <el-select
              v-model="formInline.district"
              placeholder="请选择适用地区"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用机构：" prop="organization">
            <el-select
              v-model="formInline.organization"
              multiple
              collapse-tags
              style="margin-left: 20px"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="(item, index) in organData"
                :key="index"
                :label="item.organ"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
    <div class="setmeal_footer">
      <!-- 按钮 -->
      <div class="footer_button">
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-button type="danger" @click="deleteAll">删除</el-button>
        <el-button>导入</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="deleteClick"
      >
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>

        <el-table-column
          align="center"
          prop="item_name"
          label="套餐名称"
          width="300"
        >
        </el-table-column>
        <el-table-column align="center" prop="price" label="原价" width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="price_now"
          label="售价"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="district"
          label="适用地区"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="is_avaliable"
          label="是否启用"
          width="150"
        >
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageMaxNumber"
        background
        layout="sizes,total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      :title="itEild ? '修改' : '添加'"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="basic">
            <el-form
              :model="addComboData"
              :rules="rules"
              ref="addComboData"
              label-width="100px"
              class="demo-addComboData"
            >
              <div class="header">
                <div class="header_left">
                  <el-form-item label="套餐名称：" prop="item_name">
                    <el-input
                      v-model="addComboData.item_name"
                      placeholder="请输入体检套餐名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="套餐ID：">
                    <el-input placeholder="请输入体检套餐Id" :disabled="true">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="是否启用：" prop="is_avaliable">
                    <el-switch
                      v-model="addComboData.is_avaliable"
                      active-value="0"
                      inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                  <el-form-item label="适用标签：">
                    <el-checkbox-group v-model="addComboData.label">
                      <el-checkbox-button
                        v-for="(item, index) in cities"
                        :label="item"
                        v-model="addComboData.label"
                        :key="index"
                        >{{ item }}</el-checkbox-button
                      >
                    </el-checkbox-group>
                  </el-form-item>

                  <el-form-item label="原价：" prop="price">
                    <el-input
                      v-model="addComboData.price"
                      placeholder="请输入体检套餐原价"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="售价：" prop="price_now">
                    <el-input
                      v-model="addComboData.price_now"
                      placeholder="请输入体检套餐售价"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="header_right">
                  <el-form-item label="适用城市">
                    <el-select
                      v-model="addComboData.location"
                      placeholder="请选择适用城市"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select
                      v-model="addComboData.district"
                      placeholder="请选择适用地区"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="适用机构：" prop="organization">
                    <el-select
                      v-model="addComboData.organization"
                      multiple
                      collapse-tags
                      style="margin-left: 20px"
                      placeholder="请选择活动区域"
                    >
                      <el-option
                        v-for="(item, index) in organData"
                        :key="index"
                        :label="item.organ"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动名称" prop="embranchment">
                    <el-transfer
                      v-model="addComboData.embranchment"
                      :data="data"
                    ></el-transfer>
                  </el-form-item>
                </div>
              </div>
              <div class="footer">
                <el-form-item label="套餐介绍" prop="scope">
                  <el-input
                    type="textarea"
                    :rows="6"
                    v-model="addComboData.scope"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="使用规则" prop="significance">
                  <el-input
                    type="textarea"
                    :rows="6"
                    v-model="addComboData.significance"
                  ></el-input>
                </el-form-item>
                <el-form-item label="套餐组成" prop="attention">
                  <el-input
                    type="textarea"
                    :rows="6"
                    v-model="addComboData.attention"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="el-form-bottom">
                <el-form-item>
                  <el-button @click="resetForm('dialogForm')">取消</el-button>
                  <el-button type="primary" @click="submitForm('addComboData')"
                    >确定</el-button
                  >
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="套餐组成">
          <div>
            <el-button>默认按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
          </div>
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="加项包">
          <div>
            <el-button>默认按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
          </div>
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ['男性项目', '女性项目', '不区分性别', '不区分婚否']
export default {
  data() {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        })
      }
      return data
    }
    return {
      cities: cityOptions,
      formInline: {
        id: '',
        district: '',
        organization: '',
      },

      provinceData: [
        {
          id: '1',
          province: '湖南省',
        },
        {
          id: '2',
          province: '广东省',
        },
      ],
      cityData: [
        {
          id: '1',
          city: '广州市',
        },
        {
          id: '2',
          city: '深圳市',
        },
      ],
      organData: [
        {
          id: '1',
          organ: '慈铭',
        },
        {
          id: '2',
          organ: '美年大健康',
        },
        {
          id: '3',
          organ: '中山三院',
        },
      ],
      //校验
      rules: {
        item_name: [
          { required: true, message: '请输入套餐名称', trigger: 'blur' },
        ],

        price: [{ required: true, message: '请输入套餐原价', trigger: 'blur' }],
        price_now: [
          { required: true, message: '请输入套餐售价', trigger: 'blur' },
        ],
        location: [
          { required: true, message: '请选择适用城市', trigger: 'change' },
        ],
        organization: [
          { required: true, message: '请选择适用机构', trigger: 'change' },
        ],
        scope: [{ required: true, message: '请填写套餐介绍', trigger: 'blur' }],
        significance: [
          { required: true, message: '请填写适用规则', trigger: 'blur' },
        ],
        attention: [
          { required: true, message: '请填写套餐组成', trigger: 'blur' },
        ],
      },
      //分页

      currentPage: 1, // 当前第几页
      pageMaxNumber: 10, // 每页查看多少条数据
      total: 0,

      data: generateData(),
      value: [1, 4],
      dialogVisible: false,
      addComboData: {
        item_name: '', // 套餐民称,String
        is_avaliable: true, // 是否启用 ，Boolean
        label: [], // 标签，String
        price: '', // 原价 String、Number
        price_now: '', // 售价 String、Number
        location: '', // 适用城市 String
        district: '',
        organization: '', // 下级机构 String
        embranchment: '',
        scope: 'packageAttention', // 注意事项 String
        significance: 'packageAttention', // 套餐介绍 String
        attention: 'packageAttention', // 套餐规则 String
      },
      //表格
      tableData: [],

      itEild: false,
      multipleSelection: [],
    }
  },
  created() {
    this.getOrgaList()
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true
      this.itEild = true
      const packageData = { ...row }

      packageData.is_avaliable = toString(packageData.is_avaliable)
      packageData.price = toString(packageData.price)
      packageData.price_now = toString(packageData.price_now)
      packageData.organization = toString(packageData.organization)

      console.log(packageData)
      this.addComboData = packageData
    },
    //执行编辑

    //批量删除
    deleteAll() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let add = []
          this.multipleSelection.forEach((i) => {
            add.push(i.id)
          })
          this.$service
            .get('/lw/item/deleteitem?id=' + [add.id])
            .then((res) => {
              console.log(res)
            })
          this.getOrgaList()
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    deleteClick(val) {
      this.multipleSelection = val
      console.log(val)
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row)

      this.$service.get('/lw/item/deleteitem?id=' + row.id).then((res) => {
        console.log(res)
        this.getOrgaList()
      })

      this.$message({
        type: 'success',
        message: '删除成功!',
      })
    },
    //列表展示
    getOrgaList() {
      this.$service
        .get(
          '/lw/item/list?page=' +
            this.currentPage +
            '&size=' +
            this.pageMaxNumber
        )
        .then((res) => {
          console.log(res)
          this.tableData = res.data.data.list.data
          this.total = res.data.data.list.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleChange(value) {
      console.log(value)
    },
    //添加
    submitForm(addComboData) {
      console.log(this.addComboData)
      this.$refs[addComboData].validate((valid) => {
        if (this.itEild == false) {
          this.itEild = false
          const packageData = { ...this.addComboData }
          packageData.embranchment = packageData.embranchment.split()
          packageData.organization = packageData.organization.join(',')
          packageData.is_avaliable = parseFloat(packageData.is_avaliable)
          packageData.price = parseFloat(packageData.price)
          packageData.price_now = parseFloat(packageData.price_now)
          packageData.organization = parseFloat(packageData.organization)
          console.log(packageData)

          this.$service.post('/lw/item/additem', packageData).then((res) => {
            console.log(res)
            this.dialogVisible = false
            this.getOrgaList()
          })
        } else {
          const packageData = { ...this.addComboData }
          console.log(packageData)
          packageData.is_avaliable = parseFloat(packageData.is_avaliable)
          packageData.price = parseFloat(packageData.price)
          packageData.price_now = parseFloat(packageData.price_now)
          packageData.organization = parseFloat(packageData.organization)

          console.log(packageData.label)
          // packageData.label = packageData.label.split(',')
          packageData.label = packageData.label.split(',')
          packageData.embranchment = packageData.embranchment.split(',')
          console.log(packageData)

          this.$service.post('/lw/item/edit', packageData).then((res) => {
            console.log(res)
            this.dialogVisible = false
            this.getOrgaList()
          })
        }
      })
    },
    onSubmit(formInline) {
      console.log(this.formInline)
      const district = undefined
      const organization = undefined
      const item_id = this.formInline.id
      const page = this.currentPage
      const size = this.pageMaxNumber
      this.$service
        .get(
          `/lw/item/searchitem?item_id=${item_id}&district=${district}&organization=${organization}&page=${page}&size=${size}`
        )
        .then((res) => {
          console.log(res)
          this.tableData = res.data.orgaData.data
        })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageMaxNumber = val
      this.getOrgaList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val

      this.getOrgaList()
    },
  },
}
</script>

<style lang="scss">
.setmeal {
  .basic {
    width: 100%;
    height: 1000px;

    .header {
      width: 100%;
      height: 450px;

      display: flex;
      .header_left {
        width: 50%;
        height: 100%;
        .el-input__inner {
          width: 80%;
        }
      }
      .header_right {
        width: 50%;
        height: 100%;
        .el-transfer-panel {
          width: 180px;
        }
        .el-checkbox,
        .el-checkbox__input {
          display: flex;
        }
      }
    }
    .footer {
      width: 100%;
      height: 350px;
    }
    .el-form-bottom {
      height: 200px;
      width: 100%;
      display: flex;
      margin-top: 130px;
      margin-left: 1000px;
    }
  }
  .setmeal_top {
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
  .setmeal_body {
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
  .setmeal_footer {
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
