<template>
  <div id="coverCot" style="width: 100vw; height: 100vh; overflow: hidden">
    <section class="section-cot" style="width: 100%; height: 100%">
      <div id="container" @click.stop="hideFn">
        <MenuBar 
          v-if="showContextMenu"
          ref="menuBar"
          @callBack="contextMenuFn"
        />
        <el-tag style="width: 100%" type="primary">AntV x6 、ElementUI 、 Vue.js 搭建可视化拖拽流程图</el-tag>
        <header v-show="true">
          <el-tooltip
            class="item"
            effect="dark"
            content="项目"
            placement="bottom"
          >
            <i class="el-icon-menu" @click="showDrawerFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="长按shift多选"
            placement="bottom"
          >
            <i class="el-icon-crop" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="放大"
            placement="bottom"
          >
            <i class="el-icon-zoom-in" @click="zoomFn(0.2)" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="缩小"
            placement="bottom"
          >
            <i class="el-icon-zoom-out" @click="zoomFn(-0.2)" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="适应屏幕"
            placement="bottom"
          >
            <i class="el-icon-full-screen" @click="centerFn" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="执行"
            placement="bottom"
          >
            <i class="el-icon-video-play" @click="startFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="保存"
            placement="bottom"
          >
            <i class="el-icon-upload" @click="saveFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="加载保存页面"
            placement="bottom"
          >
            <i class="el-icon-link" @click="loadFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="是否禁用"
            placement="bottom"
          >
            <i
              :class="{ 'el-icon-lock': isLock, 'el-icon-unlock': !isLock }"
              @click="lockFn()"
            />
          </el-tooltip>
        </header>
        <div id="draw-cot" />
        <Drawer v-show="false" ref="drawer" @addNode="addNode" />
      </div>
    </section>
  </div>
</template>

<script>
import DataJson from "./data";
import MenuBar from "./components/menuBar";
import Drawer from "./components/drawer";
import initGraph, { registerEvent } from '@/control'

import Funcs from '@/control/func.js'
const nodeStatusList = [
  [
    {
      id: "1",
      status: "running",
    },
    {
      id: "2",
      status: "default",
    },
    {
      id: "3",
      status: "default",
    },
    {
      id: "4",
      status: "default",
    },
  ],
  [
    {
      id: "1",
      status: "success",
    },
    {
      id: "2",
      status: "running",
    },
    {
      id: "3",
      status: "default",
    },
    {
      id: "4",
      status: "default",
    },
  ],
  [
    {
      id: "1",
      status: "success",
    },
    {
      id: "2",
      status: "success",
    },
    {
      id: "3",
      status: "running",
    },
    {
      id: "4",
      status: "running",
    },
  ],
  [
    {
      id: "1",
      status: "success",
    },
    {
      id: "2",
      status: "success",
    },
    {
      id: "3",
      status: "success",
    },
    {
      id: "4",
      status: "failed",
    },
  ],
];

export default {
  name: "App",
  components: { MenuBar, Drawer },
  data() {
    return {
      container: null,
      graph: "",
      timer: "",
      isLock: false,
      showContextMenu: false,
      funcs: {}
    };
  },
  mounted() {
    // 初始化 graph
    this.initGraph();
    // 按钮绑定
    this.keyBindFn();
    // 执行
    this.startFn();
  },
  methods: {
    getNodeById(id) {
      return this.graph.getCellById(id);
    },
    hideFn() {
      this.showContextMenu = false;
    },
    initGraph() {
      const container = document.getElementById('draw-cot')
      const graph = initGraph(container)
      this.container = container
      this.graph = graph;
      registerEvent(graph, this)
      const funcs = new Funcs(this)
      this.funcs = funcs
    },
    async showNodeStatus(statusList) {
      const status = statusList.shift();
      status?.forEach((item) => {
        const { id, status } = item;
        const node = this.graph.getCellById(id);
        const data = node.getData();
        node.setData({
          ...data,
          status: status,
        });
      });
      this.timer = setTimeout(() => {
        this.showNodeStatus(statusList);
      }, 300);
    },
    // 初始化节点/边
    init(data = []) {
      const cells = [];
      data.forEach((item) => {
        if (item.shape === "tjrf-edge") {
          cells.push(this.graph.createEdge(item));
        } else {
          delete item.component;
          cells.push(this.graph.createNode(item));
        }
      });
      this.graph.resetCells(cells);
    },
    zoomFn(num) {
      // this.graph.zoom(num);
      this.funcs.zoomFn(num)
    },
    centerFn() {
      this.funcs.centerFn()
    },
    startFn(item) {
      this.funcs.startFn(item, DataJson, nodeStatusList)
    },
    createMenuFn() {},
    keyBindFn() {
      // copy cut paste
      this.graph.bindKey(["meta+c", "ctrl+c"], () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
        }
        return false;
      });
      this.graph.bindKey(["meta+x", "ctrl+x"], () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.cut(cells);
        }
        return false;
      });
      this.graph.bindKey(["meta+v", "ctrl+v"], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
        return false;
      });

      // undo redo
      this.graph.bindKey(["meta+z", "ctrl+z"], () => {
        if (this.graph.history.canUndo()) {
          this.graph.history.undo();
        }
        return false;
      });
    },
    saveFn() {
      this.funcs.saveFn()
    },
    loadFn() {
      this.funcs.loadFn()
    },
    lockFn() {
      this.funcs.lockFn()
    },
    contextMenuFn(type, node) {
      switch (type) {
        case "remove":
          if (node.type == "edge") {
            this.graph.removeEdge(node.item.id);
          } else if (node.type == "node") {
            this.graph.removeNode(node.item.id);
          }
          break;
        case "source":
          break;
      }

      this.showContextMenu = false;
    },

    showDrawerFn() {
      this.$refs.drawer.visible = !this.$refs.drawer.visible;
    },
    addNode(option) {
      const p = this.graph.pageToLocal(option.x, option.y);
      this.graph.addNode(Object.assign({}, option, p));
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  box-sizing: border-box;
  margin: 0;
}

header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
}

header i {
  margin: 8px;
  font-size: 30px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.my-selecting {
  border: 1px solid red;
  display: block;
  z-index: 0;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}

.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}

.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}

.x6-edge:hover path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

.section-cot {
  display: flex;
}

.section-cot #container {
  position: relative;
  flex: 1;
}

.section-cot #container #draw-cot {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
