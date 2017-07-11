<template>
  <div>
    <i-form 
      ref="loginForm" 
      :model="loginForm" 
      :rules="rules"
    >
      <i-form-item prop="username">
          <i-input 
            type="text" 
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
      </i-form-item>
      <i-form-item prop="password">
          <i-input 
            type="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
          >
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
      </i-form-item>
      <i-form-item>
        <div class="login-btn-wrap">
          <Button type="ghost" @click="handleReset('loginForm')">重置</Button>
          <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
        </div>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
  import {
    Form as IForm,
    FormItem as IFormItem,
    Input as IInput
  } from "iview"
  export default {
    components: {
      IForm,
      IFormItem,
      IInput
    },
    data () {
      const validateName = (rule, value, callback) => {
        const trimVal = String.prototype.trim.call(value)
        if (!trimVal) {
          callback(new Error("用户名不能为空"))
        }
        if (trimVal.length > 12) {
          callback(new Error("用户名长度过大"))
        }
        callback()
      }

      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        }
        callback()
      }

      return {
        loginForm: {
          user: "",
          password: ""
        },
        rules: {
          user: [
            {
              required: true,
              message: "请填写用户名",
              trigger: "blur",
              validator: validateName
            }
          ],
          password: [
            {
              required: true,
              message: "请填写密码",
              trigger: "blur",
              validator: validatePass
            },
            {
              type: "string",
              min: 6,
              message: "密码长度不能小于6位",
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const params = {
              username: this[name].username.toString(),
              password: this[name].password.toString()
            }
            this.$http.post("/api/user/login", params)
              .then(res => {
                if (res.body && res.body.code === 1) {
                  this.$Message.success("提交成功")
                  this.$router.push("/admin/list")
                } else {
                  this.$Message.error("登陆失败")
                }
              }, err => {
                if (err) {
                  this.$Message.error("登陆失败")
                }
              })
          } else {
            this.$Message.error("表单验证失败")
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style scoped lang="sass">
  .login-btn-wrap{
    text-align: center;
  }
</style>


