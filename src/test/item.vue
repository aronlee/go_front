<template>
  <transition name="aron" tag="li">
    <span class="item" :style="{'animationDelay': `${index * .1}s`}" v-if="item">{{item}}</span>
  </transition>
</template>

<script>
export default {
  props: {
    item: Number,
    index: Number
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 50px;
  text-align: center;
  border: 1px solid #757575;
  margin-bottom: 8px;
}

.aron-enter-active {
  transition: all 2s ease;
}

.aron-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.aron-enter,
.aron-leave-to
/* .aron-leave-active for below version 2.1.8 */

{
  transform: translateY(10px);
  opacity: 0;
}
</style>
