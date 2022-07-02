<template>
  <div class="Ec-x6-icon">
    <el-drawer
      :visible.sync="visible"
      :direction="direction"
      size="300px"
      :modal="false"
      :modal-append-to-body="false"
      style="position: absolute; width: 300px; box-sizing: border-box">
      <template slot="title">
        <h2 class="iconfont icon-jiedianleixing drawe-title">节点类型</h2>
      </template>
      <!-- 模糊过滤 -->
      <section class="node-filter">
        <el-input
          size="small"
          placeholder="请输入搜索的内容"
          maxlength="20"
          show-word-limit
          clearable
          v-model="search"
          @input="filterNode"></el-input>
      </section>
      <!-- 节点列表 -->
      <section v-if="true" class="listBar" @click.stop="">
        <p @click="showMore = !showMore" class="down-select">
          <img
            :class="{ arrow: showMore }"
            src="../assets/svg/arrow.svg"
            alt="" />
          基础组件
        </p>
        <div v-show="showMore" class="listBar-cot">
          <node-list @drag-start="drag" @drag-end="dragend"></node-list>
        </div>
      </section>
    </el-drawer>
  </div>
</template>

<script>
const mouseXY = { x: null, y: null }
import config from './config'
import NodeList from './nodeList.vue'

export default {
  name: 'Drawer',
  components: { NodeList },
  data() {
    return {
      visible: true,
      direction: 'ltr',
      showMore: true,
      configList: config,
      search: ''
    }
  },
  mounted() {
    document.getElementById('container').addEventListener(
      'dragover',
      function (e) {
        mouseXY.x = e.clientX
        mouseXY.y = e.clientY
      },
      false
    )
  },
  methods: {
    filterNode() {
      this.$bus.$emit('filter-node', this.search)
    },
    drag: function () {
      // 当元素被拖动时触发
      const parentRect = document
        .getElementById('container')
        .getBoundingClientRect()
      let mouseInGrid = false
      // 在container 元素内
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        // 当元素拖动到container元素内时触发
      }
    },
    nodeConfig(item, x, y) {
      let config = ''
      // const time = new Date().getTime();
      let { type, shape, data } = item
      switch (type) {
        case 'primary':
          config = {
            x,
            y,
            shape,
            data
          }
          break

        default:
          config = {
            x,
            y,
            shape: 'node-circle',
            data: {}
          }
          break
      }

      // 链接桩3种状态 1、in | 只允许被连  2、out | 只允许输出  3、any | 不限制
      // switch (item.type) {
      //   case "output":
      //     config = {
      //       x: x,
      //       y: y,
      //       width: 50,
      //       height: 50,
      //       shape: "node-circle",
      //       data: item,
      //       ports: {
      //         groups: {
      //           bottom: {
      //             position: "bottom",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //         },
      //         items: [
      //           {
      //             id: `out-${time}`,
      //             group: "bottom", // 指定分组名称
      //           },
      //         ],
      //       },
      //     };
      //     break;
      //   case "onlyIn":
      //     config = {
      //       x: x,
      //       y: y,
      //       width: 50,
      //       height: 50,
      //       shape: "node-circle",
      //       data: item,
      //       ports: {
      //         groups: {
      //           top: {
      //             position: "top",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //         },
      //         items: [
      //           {
      //             id: `in-${time}`,
      //             group: "top", // 指定分组名称
      //           },
      //         ],
      //       },
      //     };
      //     break;
      //   case "database":
      //     config = {
      //       x: x,
      //       y: y,
      //       width: 50,
      //       height: 50,
      //       shape: "node-circle",
      //       data: item,
      //       ports: {
      //         groups: {
      //           top: {
      //             position: "top",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //           bottom: {
      //             position: "bottom",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //         },
      //         items: [
      //           {
      //             id: `in-${time}`,
      //             group: "top", // 指定分组名称
      //           },
      //           {
      //             id: `out-${time}`,
      //             group: "bottom", // 指定分组名称
      //           },
      //         ],
      //       },
      //     };
      //     break;
      //   case "condition":
      //     config = {
      //       x: x,
      //       y: y,
      //       width: 50,
      //       height: 50,
      //       shape: "node-circle",
      //       data: item,
      //       ports: {
      //         groups: {
      //           top: {
      //             position: "top",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //           bottom: {
      //             position: "bottom",
      //             attrs: {
      //               circle: {
      //                 r: 4,
      //                 magnet: true,
      //                 stroke: "#C2C8D5",
      //                 strokeWidth: 1,
      //                 fill: "#fff",
      //               },
      //             },
      //           },
      //         },
      //         items: [
      //           {
      //             id: `in-${time}`,
      //             group: "top", // 指定分组名称
      //           },
      //           {
      //             id: `out-${time}`,
      //             group: "bottom", // 指定分组名称
      //           },
      //           {
      //             id: `out-${time}-2`,
      //             group: "bottom", // 指定分组名称
      //           },
      //         ],
      //       },
      //     };
      //     break;
      // }
      return config
    },
    dragend: function (item) {
      // 拖放动作在拖放结束时触发
      const parentRect = document
        .getElementById('container')
        .getBoundingClientRect()
      let mouseInGrid = false
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        console.log(item, '拖拽配置')
        this.$emit('addNode', this.nodeConfig(item, mouseXY.x, mouseXY.y))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Ec-x6-icon ::v-deep .el-drawer__body {
  overflow-y: scroll;
}

.Ec-x6-icon ::v-deep .el-drawer__header {
  padding: 0 12px;
  margin-bottom: 0;
  width: 300px;
}

.listBar {
  padding: 0 10px;

  & .down-select {
    cursor: pointer;
  }
}

.listBar img {
  width: 12px;
}

.arrow {
  transform: rotate(90deg);
  transition-duration: 0.3s;
}

.listBar-cot {
  display: inline-block;
  padding-left: 12px;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
}

.listBar-cot .drag-cot {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
}

.listBar-cot .drag-cot span {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.listBar-cot .drag-cot span img {
  width: 100%;
  height: 100%;
}

.listBar-cot .drag-cot p {
  margin: -2px 0 0;
  text-align: center;
  font-size: 12px;
  color: #939393;
}
.node-filter {
  padding: 0 10px;
}
.drawe-title {
  color: #000;
}
</style>
