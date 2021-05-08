<template>
  <div class="login">
    <div class="login_All">
      <div class="login_top">
        <img
          src="../assets/111.jpg"
          style="width:80px;height:80px;border-radius: 50%;"
          alt=""
        />
      </div>
      <div class="login_foot">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登陆" name="first" class="first">
            <div class="denglu">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
              >
                <el-form-item label="登陆名" prop="name">
                  <el-input v-model.number="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >登陆</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      ruleForm: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.login {
  .login_All {
    width: 500px;
    height: 500px;
    background-color: aqua;
    margin: 50px auto;

    .login_top {
      height: 150px;
      width: 100%;
      background-color: aquamarine;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login_foot {
      height: 350px;
      width: 100%;

      .denglu {
        width: 300px;
        height: 200px;
        background-color: blue;
      }
    }
  }
}
</style>
