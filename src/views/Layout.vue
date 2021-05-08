<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div style="display:flex;">
          <img
            src="../assets/111.jpg"
            style="width:40px;height:40px;border-radius:50% ;margin-right:10px;"
            alt=""
          />
          <b style="font-size:14px;margin-left:10px;">在线体检预约管理后台</b>
        </div>

        <div style="width:150px;">
          <i class="el-icon-warning" style="width:50px;"></i>
          <span>admin </span>
          <i class="el-icon-circle-check" style="width:50px;"></i>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-submenu
              v-for="(item, index) in menuList"
              :key="index"
              index="1"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.topTitle }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(sub, subIndex) in item.children"
                  :key="subIndex"
                  :index="sub.path"
                  >{{ sub.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      menuList: [
        {
          index: 1,
          topTitle: '体检商品管理',
          children: [
            { title: '体检套餐管理', path: '/admin/setmeal' },
            { title: '体检项管理', path: '/admin/term' },
          ],
        },
        {
          index: 2,
          topTitle: '体检信息管理',
          children: [
            { title: '预约信息查询', path: '/admin/information' },
            { title: '体检机构管理', path: '/admin/mechanism' },
          ],
        },
        {
          index: 3,
          topTitle: '体检指标管理',
          children: [
            { title: '标准指标管理', path: '/admin/standardindex' },
            { title: '机构指标管理', path: '/admin/institutional' },
          ],
        },
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #324057;
  color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 45px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  padding: 0px 5px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
