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
  mounted() {
    this.filterNode()
  },
  methods: {
    drag(node) {
      this.$emit('drag-start', node)
    },
    dragend(node) {
      this.$emit('drag-end', node)
    },
    filterNode() {
      this.$bus.$on('filter-node', (search) => {
        let filterres = config.filter((node) => {
          let res =
            node.name.includes(search.trim()) ||
            node.label.includes(search.trim())
          return res
        })
        this.config = filterres
      })
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
      position: relative;
      width: 50px;
      height: 50px;
      margin: 10px auto;
      border-radius: 50%;
      box-shadow: 0 0 10px $boxshadow, 0 0 10px $boxshadow, 0 0 10px $boxshadow,
        0 0 10px $boxshadow;
      & .iconfont {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 1s ease-in-out;
        border-radius: 50%;
        font-size: 40px;
        color: $nodecolor;
        &:hover::before {
          display: inline-block;
          color: $nodehover;
          transform: scale(1.1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
