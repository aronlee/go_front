<template>
  <div class="login-bg">
    <div class="login-wrap">
      <Tabs
        v-model="activeName"
        animated
        type="card"
        @on-click="handleTabs"
      >
        <Tab-pane label="登陆" name="1">
          <login></login>
        </Tab-pane>
        <Tab-pane label="注册" name="2">
          <register></register>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Login from "./login.vue"
import Register from "./register.vue"

export default {
  name: "login_regist",
  components: {
    Login,
    Register
  },
  data () {
    return {
      activeName: "1"
    }
  },
  methods: {
    handleTabs (name) {
      // console.log(tab, event);
    }
  }
}
</script>

<style lang="sass">
  .login-wrap {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }
</style>


