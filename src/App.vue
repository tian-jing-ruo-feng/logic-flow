<template>
  <div id="coverCot" style="width: 100vw; height: 100vh; overflow: hidden">
    <section class="section-cot" style="width: 100%; height: 100%">
      <div id="container" @click.stop="hideFn">
        <!-- 右键菜单栏 -->
        <MenuBar
          v-if="showContextMenu"
          ref="menuBar"
          @callBack="contextMenuFn" />
        <el-tag v-show="false" style="width: 100%" type="primary"
          >AntV x6 、ElementUI 、 Vue.js 搭建可视化拖拽流程图</el-tag
        >
        <!-- 工具栏目 -->
        <header v-show="true">
          <el-tooltip
            class="item"
            effect="dark"
            content="项目"
            placement="bottom">
            <i class="el-icon-menu" @click="showDrawerFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="长按shift多选"
            placement="bottom">
            <i class="el-icon-crop" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="放大"
            placement="bottom">
            <i class="el-icon-zoom-in" @click="zoomFn(0.2)" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="缩小"
            placement="bottom">
            <i class="el-icon-zoom-out" @click="zoomFn(-0.2)" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="适应屏幕"
            placement="bottom">
            <i class="el-icon-full-screen" @click="centerFn" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="执行"
            placement="bottom">
            <i class="el-icon-video-play" @click="startFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="保存"
            placement="bottom">
            <i class="el-icon-upload" @click="saveFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="加载保存页面"
            placement="bottom">
            <i class="el-icon-link" @click="loadFn()" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="是否禁用"
            placement="bottom">
            <i
              :class="{ 'el-icon-lock': isLock, 'el-icon-unlock': !isLock }"
              @click="lockFn()" />
          </el-tooltip>
        </header>
        <!-- 画布 -->
        <div id="draw-cot" />
        <!-- 右侧小地图 -->
        <div id="minimap"></div>
        <!-- 左侧节点列表栏目 -->
        <Drawer ref="drawer" @addNode="addNode" />
      </div>
    </section>
  </div>
</template>

<script>
import DataJson from './data'
import MenuBar from './components/menuBar'
import Drawer from './components/drawer'
import initGraph, { registerEvent } from '@/control'

import Funcs from '@/control/func.js'
const nodeStatusList = [
  [
    {
      id: '1',
      status: 'running'
    },
    {
      id: '2',
      status: 'default'
    },
    {
      id: '3',
      status: 'default'
    },
    {
      id: '4',
      status: 'default'
    }
  ],
  [
    {
      id: '1',
      status: 'success'
    },
    {
      id: '2',
      status: 'running'
    },
    {
      id: '3',
      status: 'default'
    },
    {
      id: '4',
      status: 'default'
    }
  ],
  [
    {
      id: '1',
      status: 'success'
    },
    {
      id: '2',
      status: 'success'
    },
    {
      id: '3',
      status: 'running'
    },
    {
      id: '4',
      status: 'running'
    }
  ],
  [
    {
      id: '1',
      status: 'success'
    },
    {
      id: '2',
      status: 'success'
    },
    {
      id: '3',
      status: 'success'
    },
    {
      id: '4',
      status: 'failed'
    }
  ]
]

export default {
  name: 'App',
  components: { MenuBar, Drawer },
  data() {
    return {
      container: null,
      graph: '',
      timer: '',
      isLock: false,
      showContextMenu: false,
      funcs: {}
    }
  },
  mounted() {
    // 初始化 graph
    this.initGraph()
    // 按钮绑定
    this.keyBindFn()
    // 执行
    this.startFn()
  },
  methods: {
    getNodeById(id) {
      return this.graph.getCellById(id)
    },
    hideFn() {
      this.showContextMenu = false
    },
    initGraph() {
      const container = document.getElementById('draw-cot')
      const graph = initGraph(container)
      this.container = container
      this.graph = graph
      registerEvent(graph, this)
      const funcs = new Funcs(this)
      this.funcs = funcs
    },
    async showNodeStatus(statusList) {
      const status = statusList.shift()
      status &&
        status.forEach((item) => {
          const { id, status } = item
          const node = this.graph.getCellById(id)
          const data = node.getData()
          node.setData({
            ...data,
            status: status
          })
        })
      this.timer = setTimeout(() => {
        this.showNodeStatus(statusList)
      }, 300)
    },
    // 初始化节点/边
    init(data = []) {
      const cells = []
      data.forEach((item) => {
        if (item.shape === 'tjrf-edge') {
          cells.push(this.graph.createEdge(item))
        } else {
          delete item.component
          cells.push(
            this.graph.createNode(item).attr({
              label: {
                text: item.data.label
              }
            })
          )
        }
      })
      this.graph.resetCells(cells)
    },
    zoomFn(num) {
      this.funcs.zoomFn(num)
    },
    centerFn() {
      this.funcs.centerFn()
    },
    startFn(item) {
      this.funcs.startFn(item, DataJson, nodeStatusList)
      this.funcs.showPorts(false)
    },
    createMenuFn() {},
    keyBindFn() {
      // copy cut paste
      this.graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.copy(cells)
        }
        return false
      })
      this.graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.cut(cells)
        }
        return false
      })
      this.graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 })
          this.graph.cleanSelection()
          this.graph.select(cells)
        }
        return false
      })

      // undo redo
      this.graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (this.graph.history.canUndo()) {
          this.graph.history.undo()
        }
        return false
      })
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
        case 'remove':
          if (node.type == 'edge') {
            this.graph.removeEdge(node.item.id)
          } else if (node.type == 'node') {
            this.graph.removeNode(node.item.id)
          }
          break
        case 'source':
          break
      }

      this.showContextMenu = false
    },

    showDrawerFn() {
      this.$refs.drawer.visible = !this.$refs.drawer.visible
    },
    addNode(option) {
      console.log(option.data)
      let node = this.$cloneDeep(option)
      let { name: text } = option.data
      node.width = 50
      node.height = 50
      node.attrs = {
        label: {
          text
        }
      }
      node.ports = [
        {
          id: text + '-1',
          group: 'top'
        },
        {
          id: text + '-2',
          group: 'right'
        },
        {
          id: text + '-3',
          group: 'bottom'
        },
        {
          id: text + '-4',
          group: 'left'
        }
      ]
      const p = this.graph.pageToLocal(node.x, node.y)
      const addnode = this.graph.addNode(Object.assign({}, node, p))
      console.log(addnode, '新增节点')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(./style/app.scss);
</style>
