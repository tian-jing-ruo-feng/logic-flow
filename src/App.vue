<template>
  <div id="coverCot" style="width: 100vw; height: 100vh; overflow: hidden">
    <section class="section-cot" style="width: 100%; height: 100%">
      <div id="container" @click.stop="hideFn">
        <MenuBar
          v-if="showContextMenu"
          ref="menuBar"
          @callBack="contextMenuFn"
        />
        <header>
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
        <Drawer ref="drawer" @addNode="addNode" />
      </div>
    </section>
    <DialogCondition ref="dialogCondition"></DialogCondition>
    <DialogMysql ref="dialogMysql"></DialogMysql>
  </div>
</template>

<script>
import { Graph, Node, Path, Cell } from "@antv/x6";
import "@antv/x6-vue-shape";

import database from "./components/nodeTheme/database.vue";
import condition from "./components/nodeTheme/condition.vue";
import onlyout from "./components/nodeTheme/onlyOut.vue";
import onlyin from "./components/nodeTheme/onlyIn.vue";
import DataJson from "./data";
import MenuBar from "./components/menuBar";
import Drawer from "./components/drawer";
import DialogCondition from "./components/dialog/condition.vue";
import DialogMysql from "./components/dialog/mysql.vue";


import initGraph from '@/control'

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
  components: { MenuBar, Drawer, DialogCondition, DialogMysql },
  data() {
    return {
      graph: "",
      timer: "",
      isLock: false,
      showContextMenu: false,
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
      const graph = initGraph(document.getElementById("draw-cot"))
      this.graph = graph;

      graph.on("edge:contextmenu", ({ e, x, y, edge, view }) => {
        this.showContextMenu = true;
        this.$nextTick(() => {
          this.$refs.menuBar.initFn(e.offsetX, e.offsetY, {
            type: "edge",
            item: edge,
          });
        });
      });

      graph.on("node:contextmenu", ({ e, x, y, node, view }) => {
        this.showContextMenu = true;

        this.$nextTick(() => {
          this.$refs.menuBar.setItem({ type: 'node', item: node })
          const p = graph.localToPage(x, y);
          this.$refs.menuBar.initFn(p.x, p.y, { type: "node", item: node });
        });
      });

      graph.on("edge:connected", ({ edge }) => {
        const source = graph.getCellById(edge.source.cell);
        const target = graph.getCellById(edge.target.cell);

        // 只允许输入
        if (target.data.type == "output") {
          return graph.removeEdge(edge.id);
        }

        // 只允许输出
        if (source.data.type == "onlyIn") {
          return graph.removeEdge(edge.id);
        }

        // 如果线源头的一端链接桩只允许输入
        if (/in/.test(edge.source.port)) {
          return graph.removeEdge(edge.id);
        }

        // 目标一端链接桩只允许输出
        if (/out/.test(edge.target.port)) {
          return graph.removeEdge(edge.id);
        }

        if (source.data.type == "condition") {
          console.log(source);
          console.log(target);
          console.log(edge);
          if (target.data.t === edge.id || target.data.f === edge.id) {
            return graph.removeEdge(edge.id);
          }
          this.$refs.dialogCondition.visible = true;
          this.$refs.dialogCondition.init(source.data, edge);
        }

        edge.attr({
          line: {
            strokeDasharray: "",
          },
        });
      });

      graph.on("node:change:data", ({ node }) => {
        const edges = graph.getIncomingEdges(node);
        const { status } = node.getData();
        edges?.forEach((edge) => {
          if (status === "running") {
            edge.attr("line/strokeDasharray", 5);
            edge.attr(
              "line/style/animation",
              "running-line 30s infinite linear"
            );
          } else {
            edge.attr("line/strokeDasharray", "");
            edge.attr("line/style/animation", "");
          }
        });
      });
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
      this.graph.zoom(num);
    },
    centerFn() {
      const num = 1 - this.graph.zoom();
      num > 1 ? this.graph.zoom(num * -1) : this.graph.zoom(num);
      this.graph.centerContent();
    },
    startFn(item) {
      this.timer && clearTimeout(this.timer);
      this.init(item || DataJson);
      this.showNodeStatus(Object.assign([], nodeStatusList));
      this.graph.centerContent();
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
      localStorage.setItem(
        "x6Json",
        JSON.stringify(this.graph.toJSON({ diff: true }))
      );
    },
    loadFn() {
      this.timer && clearTimeout(this.timer);
      const x6Json = JSON.parse(localStorage.getItem("x6Json"));

      this.startFn(x6Json.cells);
    },
    lockFn() {
      this.isLock = !this.isLock;
      if (this.isLock) {
        this.graph.enablePanning();
        this.graph.enableKeyboard();
      } else {
        this.graph.disablePanning();
        this.graph.disableKeyboard();
      }
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
          this.$refs.dialogMysql.visible = true;
          this.$refs.dialogMysql.init(node);
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
