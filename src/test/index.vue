<template>
  <div class="test">
    <div class="ul-wrap" v-show="isShow">
      <!-- <transition name="aron">
          <ul v-if="isShow">
            <item v-for="item in list" :index="index" :key="item" :item="item"></item>
          </ul>
        </transition>  -->
  
      <!-- <ul v-if="isShow">
          <item v-for="item in list" :key="item" :item="item"></item>
        </ul> -->
  
      <!-- <transition-list>
          <div class="item" v-for="item in list" :key="item">{{item}}</div>
        </transition-list> -->
  
      <!-- <transition-group
          name="staggered-fade"
          tag="div"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <div class="item" v-for="(item, index) in list" :key="item" v-bind:data-index="index">{{item}}</div>
        </transition-group> -->
    </div>
  
    <!-- <div class="let-text-wrap">
        <transition name="aron">
          <div v-if="isShow" class="let-text">test text</div>
        </transition>
      </div> -->
  
    <!-- <div>
        <button @click="showText">show text!</button>
      </div> -->
  
    <!-- <div class="circle"></div>  -->
  
    <div id="test2">
      <transition-group name="test2" tag="div" :css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @enter-cancelled="enterCancelled" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled">
        <div class="test2-item" v-for="(item, index) in list" :key="item" v-bind:data-index="index">{{item}}</div>
      </transition-group>
    </div>
    <div id="test3">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <div class="test3-items-wrap">
        <transition-group name="list" tag="p">
          <span v-for="item in testData" v-bind:key="item.id" class="list-item">
            <div class="list-item-inner">{{ item.id }}</div>
          </span>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
// import Velocity from "velocity-animate"
import Item from "./item.vue"
import TransitionList from "../components/transition-list/index.vue"
import $ from "jquery"
import { data as testData } from "./data.json"

// const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default {
  name: "test",
  components: {
    Item,
    TransitionList
  },
  data() {
    return {
      list: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      testData: testData,
      nextNum: 10,
      isShow: false,
      show: false
    }
  },
  created() {
    // this.getIp()
    // setTimeout(() => {
    //   this.list = list
    // }, 2000)
    // setTimeout(() => {
    //   this.list = []
    // }, 10000)
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.testData.length)
    },
    add: function () {
      this.testData.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      const random = this.randomIndex()
      console.log(random)
      this.testData.splice(random, 1)
    },
    showText() {
      this.isShow = !this.isShow
    },
    getIp() {
      // this.$http.get("/api/test/getIp").then(res => {
      //   console.log(res.body)
      // })
      this.$http.post("/api/login", {
        username: "lizongqing",
        password: "lxlzq11073"
      }).then(res => {
        console.log(res)
      })
    },
    beforeEnter(el) {
      // console.log("beforeEnter")
      const $el = $(el)
      $el.addClass("test2-item-before-enter")
    },
    enter(el, done) {
      // console.log("enter")
      const $el = $(el)
      var delay = el.dataset.index * 150
      setTimeout(() => {
        $el.addClass("test2-item-enter")
        done()
      }, delay)
    },
    afterEnter(el) {
      // console.log("afterEnter")
      const $el = $(el)
      $el.removeClass("test2-item-enter test2-item-before-enter")
    },
    enterCancelled(el) {
      // console.log("enterCancelled")
      // const $el = $(el)
      // $el.removeClass("test2-item-enter test2-item-before-enter")
    },
    beforeLeave(el) {
      // console.log("beforeLeave")
      // const $el = $(el)
      // $el.addClass("test2-item-before-leave")
    },
    leave(el, done) {
      // console.log("leave")
      const $el = $(el)
      var delay = el.dataset.index * 150
      setTimeout(function () {
        $el.addClass("test2-item-leave")
        done()
      }, delay)
    },
    afterLeave(el) {
      // console.log("afterLeave")
      const $el = $(el)
      $el.removeClass("test2-item-enter test2-item-before-enter test2-item-leave")
    },
    leaveCancelled(el) {
      // const $el = $(el)
      // $el.removeClass("test2-item-leave test2-item-before-leave")
    }
  }
}
</script>

<style lang="scss">
.test {
  padding: 20px 50px;
  .ul-wrap {
    width: 50px;
  }
  .item {
    display: inline-block;
    width: 50px;
    border-radius: 4px;
    text-align: center;
    border: 1px solid #757575;
    margin-bottom: 8px;
  }
}

.test-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.test-enter,
.test-leave-to
/* .test-leave-active for below version 2.1.8 */

{
  opacity: 0;
  transform: translateY(30px);
}

.test-leave-active {
  position: absolute;
}

.let-text {
  width: 100px;
  text-align: center;
  border: 1px solid #ff0000;
}

.let-text-wrap {
  height: 50px;
}

.aron-enter-active {
  transition: all .3s ease;
}

.aron-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.aron-enter,
.aron-leave-to
/* .aron-leave-active for below version 2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}

.circle {
  margin-top: 10px;
  border: 4px solid #212121;
  width: 200px;
  height: 200px;
  border-radius: 100px;
}

#test2 {
  width: 60px
}

.test2-item {
  display: inline-block;
  width: 50px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #757575;
  margin-bottom: 8px;
  transition: all 1s; // opacity: 0;
  // transform: translateY(30px);
}

.test2-item-before-enter {
  opacity: 0;
  transform: translateY(30px);
  transition: transform, opacity 1s;
}

.test2-item-enter {
  opacity: 1;
  transform: translateY(0);
}

.test2-item-before-leave {
  opacity: 1;
  transform: translateY(0);
  transition: all 1s;
}

.test2-item-leave {
  opacity: 0;
  transform: translateY(-30px);
} 
.list-item {
  transition: all 1s;
  margin-right: 10px;
  display: inline-block;
  border: 1px solid #757575;
  width: 24px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
.test3-items-wrap{
  width: 200px;
}
</style>
