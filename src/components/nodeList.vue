<template>
  <ul class="node-list">
    <li
      class="node-wrapper"
      v-for="(node, ind) in config"
      :key="ind"
      draggable="true"
      @drag="drag(node)"
      @dragend="dragend(node)">
      <div class="node">
        <span class="iconfont" :class="[node.iconfont]"></span>
      </div>
    </li>
  </ul>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      config
    }
  },
  methods: {
    drag(node) {
      this.$emit('drag-start', node)
    },
    dragend(node) {
      this.$emit('drag-end', node)
    }
  }
}
</script>

<style lang="scss" scoped>
.node-list {
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  & .node-wrapper {
    width: 33.33%;
    & .node {
      width: 50px;
      height: 50px;
      margin: 10px auto;
      border-radius: 50%;
      & .iconfont {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 10px $boxshadow, 0 0 10px $boxshadow,
          0 0 10px $boxshadow, 0 0 10px $boxshadow;
        border-radius: 50%;
        transition: all 0.6s ease-in-out;
        font-size: 50px;
        color: rgb(226, 106, 90);
        &::before {
          position: absolute;
          top: -2px;
        }
        &:hover::before {
          color: $nodehover;
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
