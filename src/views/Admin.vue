<template>
  <div class="admin">
    <el-submenu index="1" v-for="(item, index) in menuList" :key="index">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>{{ item.topTitle }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/setmeal">体检套餐管理</el-menu-item>
        <el-menu-item index="/admin/term">体检项管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
}
</script>

<style></style>
