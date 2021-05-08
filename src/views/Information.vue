<template>
  <div class="information">
    <div class="information_top">
      <span>预约信息查询</span>
    </div>
    <div class="information_body">
      <div class="body_span">
        <span>数据筛选</span>
      </div>
      <div class="body_div">
        <!-- 搜索引擎 -->
        <el-form
          :inline="true"
          size="small"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="体检状态">
            <el-select v-model="formInline.region" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-date-picker
            v-model="value4"
            size="small"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="information_footer">
      <div class="footer_button">
        <el-button type="primary" @click="dialogVisible = true"
          >修改状态</el-button
        >

        <el-button>导入</el-button>
      </div>
      <!-- 表格 -->
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
          prop="user_name"
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
              type="text"
              size="small"
              @click.native.prevent="updatatime(scope.$index, scope.row)"
              >修改时间</el-button
            >
            <el-button
              @click.native.prevent="updataRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              修改状态
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="add" ref="add" label-width="100px">
        <template>
          <el-radio v-model="add.book_status" label="1">已体检</el-radio>
          <el-radio v-model="add.book_status" label="2">失效</el-radio>
        </template>
        <el-button>取消</el-button>
        <el-button type="primary" @click="statusButton('add')">确认</el-button>
      </el-form>
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
      dialogtime: false,
      value1: '',
      settime: '',
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      add: {
        book_status: '',
      },
      editStatus: '',
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: '',
      currentPage: 1,
      pageMaxNumber: 10,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    updatatime(index, row) {
      console.log(index, row)
      this.settime = row
      this.dialogtime = true
    },
    statusButton(add) {
      // console.log(this.editStatus)
      const book_time = this.editStatus.book_time
      const id = this.editStatus.id
      // return
      this.$service
        .get(
          '/lw/book/edit?book_status=' +
            this.add.book_status +
            '&id=' +
            id +
            '&book_time=' +
            book_time
        )
        .then((res) => {
          console.log(res)
          this.dialogVisible = false
          this.getList()
        })
    },
    updataRow(index, row) {
      this.editStatus = row
      this.add.book_status = this.editStatus.book_status
      this.dialogVisible = true
    },
    getList() {
      this.$service
        .get(
          '/lw/book/page?page=' +
            this.currentPage +
            '&size=' +
            this.pageMaxNumber
        )
        .then((res) => {
          console.log(res)
          this.tableData = res.data.data.list.data
        })
    },
    onSubmit() {
      console.log('submit!')
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
.information {
  .information_top {
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
  .information_body {
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
  .information_footer {
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
