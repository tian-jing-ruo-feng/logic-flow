<template>
  <!-- node添加菜单 -->
  <div
    class="node-menu"
    :style="{
      ...position
    }">
    <el-card class="box-card">
      <el-scrollbar style="height: 200px">
        <ul class="node-menulist">
          <li
            class="node-item"
            v-for="(node, ind) in config"
            :key="ind"
            @click="$emit('addNode', { node, position, type })">
            <span :class="['iconfont', node.iconfont]">{{ node.name }}</span>
          </li>
        </ul>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script>
import config from './config'
export default {
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          left: '300px',
          top: '150px'
        }
      }
    }
  },
  data() {
    return {
      config,
      type: 'nodeMenu'
    }
  }
}
</script>

<style lang="scss" scoped>
.node-menu {
  position: absolute;
  z-index: 1;

  & .node-menulist {
    margin: 0;
    padding: 4px 10px;
    display: flex;
    flex-direction: column;
    list-style: none;
    & .node-item {
      flex: 1;
      padding: 2px 0;
      border-bottom: 1px solid $tjrf-border3;
      &:last-of-type {
        border-bottom: none;
      }
      cursor: pointer;
      & span::before {
        margin-right: 4px;
        color: $nodecolor;
      }

      &:hover {
        color: #ff0000;
        background: $hoverbackground;
      }
    }
  }

  &::v-deep .el-card__body {
    padding: 0;
  }
}
</style>
