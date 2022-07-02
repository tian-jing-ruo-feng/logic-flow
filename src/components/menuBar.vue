<template>
  <el-card
    class="box-card"
    :style="{ left: x + 'px', top: y + 'px' }"
    :stop="11"
    @click.stop=""
    style="padding: 0">
    <ul class="func-list">
      <li class="func-item">
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          class="func-button"
          @click="callBack('edit')"
          >编辑</el-button
        >
      </li>
      <li class="func-item">
        <el-button
          type="text"
          size="small"
          icon="el-icon-delete"
          class="func-button func-delete"
          @click="callBack('remove')"
          >删除</el-button
        >
      </li>
    </ul>
  </el-card>
</template>

<script>
import { deleteNode } from '@/control/func.js'
export default {
  name: 'MenuBar',
  data() {
    return {
      x: '',
      y: '',
      item: {}
    }
  },
  methods: {
    deleteNode,
    initFn(x, y, item) {
      const offset = 20
      this.x = offset + parseInt(x) + ''
      this.y = y + ''
      if (item) {
        this.item = item
      }
    },
    setItem(item) {
      this.item = item
    },
    callBack(type) {
      this.$emit('callBack', type, this.item)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  position: absolute;
  z-index: 112;
}

.box-card ::v-deep .el-card__body {
  padding: 0;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
  text-align: center;
}

.item:hover {
  color: #ffffff;
  background-color: #409eff;
}

.box-card {
  & .func-list {
    list-style: none;
    padding: 0;
    margin: 0;
    & .func-item {
      padding: 4px 8px;
      border-bottom: 1px solid $tjrf-border4;
      & .func-button {
        width: 100%;
      }

      & .func-delete {
        color: $tjrf-delete-button;
      }
    }
  }
}
</style>
