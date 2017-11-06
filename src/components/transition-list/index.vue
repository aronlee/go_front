<template>
  <transition-group
    tag="div"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
import Velocity from "velocity-animate"

export default {
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
      console.log("beforeEnter")
    },
    enter(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: "1.6em" },
          { complete: done }
        )
      }, delay)
      console.log("enter")
    },
    leave(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
      console.log("leave")
    }
  }
}
</script>

<style>
  
</style>
