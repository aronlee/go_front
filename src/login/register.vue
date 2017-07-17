<template>
  <div>
    <i-form 
      ref="registForm" 
      :model="registForm" 
      :rules="rules"
    >
      <i-form-item prop="username">
          <i-input 
            type="text" 
            v-model="registForm.username"
            placeholder="请输入用户名"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
      </i-form-item>
      <i-form-item prop="password">
          <i-input 
            type="password" 
            v-model="registForm.password" 
            placeholder="请输入密码"
          >
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
      </i-form-item>
      <i-form-item prop="checkPass">
          <i-input 
            type="password" 
            v-model="registForm.checkPass" 
            placeholder="确认密码"
          >
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
      </i-form-item>
      <i-form-item>
        <div class="login-btn-wrap">
          <Button type="ghost" @click="handleReset('registForm')">重置</Button>
          <Button type="primary" @click="handleSubmit('registForm')">注册</Button>
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
      var checkName = (rule, value, callback) => {
        const trimVal = String.prototype.trim.call(value)
        if (!trimVal) {
          callback(new Error("用户名不能为空"))
        }
        if (trimVal.length > 12) {
          callback(new Error("用户名长度过大"))
        }
        callback()
      }

      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.registForm.checkPass !== "") {
            this.$refs.registForm.validateField("checkPass")
          }
          callback()
        }
      }

      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(""))
        } else if (value !== this.registForm.password) {
          callback(new Error("两次输入密码不一致！"))
        } else {
          callback()
        }
      }

      return {
        registForm: {
          username: "",
          password: "",
          checkPass: ""
        },
        rules: {
          username: [
            {
              validator: checkName,
              trigger: "blur"
            }
          ],
          password: [
            {
              validator: validatePass,
              trigger: "blur"
            }
          ],
          checkPass: [
            {
              validator: validatePass2,
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
            this.$http.post("/api/user/regist", params)
              .then(res => {
                if (res.body && res.body.code === 1) {
                  this.$Message.success("提交成功")
                  this.$router.push("/admin/list")
                } else {
                  this.$Message.success("注册失败")
                }
              }, err => {
                if (err) {
                  this.$Message.success("注册失败")
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

<style scoped lang="scss">
  .login-btn-wrap{
    text-align: center;
  }
</style>
