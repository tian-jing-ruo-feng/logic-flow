<template>
  <div id="coverCot" style="width: 100vw; height: 100vh; overflow: hidden">
    <section class="section-cot" style="width: 100%; height: 100%">
      <div id="container" @click.stop="hideFn">
        <node-menu
          v-if="showNodeMenu"
          @addNode="addNodeFromMenuList"
          :position="edgeBtnClickSelectConfig.nodeMenuPosition"
          :from="edgeBtnClickSelectConfig.from"></node-menu>
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
            content="小地图"
            placement="bottom">
            <i class="el-icon-map-location" @click="showMap"></i
          ></el-tooltip>
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
        <div id="minimap" ref="minimap" v-show="showMinimap"></div>
        <!-- 左侧节点列表栏目 -->
        <Drawer ref="drawer" @addNode="addNode" />
        <!-- 右侧编辑栏目 -->
        <rightDrawer
          ref="rightDrawer"
          :title="rightDrawerTitle"
          @save="preserveStatus"></rightDrawer>
        <!-- 右侧文件树&数据状态编辑 -->
        <file-tree
          class="right-file-tree"
          v-if="true"
          ref="fileTree"></file-tree>
      </div>
    </section>
  </div>
</template>

<script>
import DataJson from './data'
import MockExample from '@/mock/example.json'
import MenuBar from './components/menuBar'
import Drawer from './components/drawer'
import rightDrawer from './components/rightDrawer.vue'
import FileTree from './components/fileTree.vue'
import NodeMenu from './components/nodeMenu.vue'
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
  components: { MenuBar, Drawer, rightDrawer, FileTree, NodeMenu },
  data() {
    return {
      container: null,
      graph: '',
      timer: '',
      isLock: false,
      showContextMenu: false,
      funcs: {},
      rightDrawerTitle: '自定义标题',
      showMinimap: false,
      edgeBtnClickSelectConfig: {
        nodeMenuPosition: {
          left: '0px',
          top: '0px'
        },
        originEdge: null,
        sourceNode: null,
        targetNode: null,
        from: ''
      },
      showNodeMenu: false
    }
  },
  mounted() {
    // 初始化 graph
    this.initGraph()
    // 按钮绑定
    this.keyBindFn()
    // 执行
    // this.startFn()
    this.startMock()
    this.$bus.$on('click-graph', () => {
      if (this.showNodeMenu) {
        // 隐藏菜单、删除引出的边
        this.showNodeMenu = false
        this.edgeBtnClickSelectConfig.from === 'pullEdge' &&
          this.graph.removeEdge(this.edgeBtnClickSelectConfig.originEdge)
      }
    })
  },
  methods: {
    preserveStatus({ node, form }) {
      node.item.attr('label/text', form.label)
    },
    getNodeById(id) {
      return this.graph.getCellById(id)
    },
    hideFn() {
      this.showContextMenu = false
    },
    initGraph() {
      const container = document.getElementById('draw-cot')
      const graph = initGraph(container, this)
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
      }, 3000)
    },
    // 初始化节点/边
    init(data = []) {
      console.log(data, '初始化数据')
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
    startMock(item) {
      this.funcs.startMock(item, MockExample, [])
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
      const { type: nodeType, item } = node
      let drawer = this.$refs.rightDrawer
      switch (type) {
        case 'remove':
          if (nodeType == 'edge') {
            this.graph.removeEdge(item.id)
          } else if (nodeType == 'node') {
            this.graph.removeNode(item.id)
          }
          break
        case 'edit':
          drawer.visible = !drawer.visible
          drawer.node = node
          drawer.form.label = node.item.data.name
          if (nodeType == 'edge') {
            this.rightDrawerTitle = '编辑边'
          } else if (nodeType == 'node') {
            this.rightDrawerTitle = '编辑节点'
          }
      }

      this.showContextMenu = false
    },

    showDrawerFn() {
      this.$refs.drawer.visible = !this.$refs.drawer.visible
    },
    showMap() {
      this.showMinimap = !this.showMinimap
    },
    addNodeFromMenuList({ node: option, position, type, from }) {
      console.log(option, position, type, from, '菜单栏node添加配置')
      let node = this.$cloneDeep(option)
      let { name: text } = option.data
      node.width = 50
      node.height = 50
      node.attrs = {
        label: {
          text
        }
      }
      const random = Date.now()
      node.ports = [
        {
          id: random + '-1',
          group: 'top'
        },
        {
          id: random + '-2',
          group: 'right'
        },
        {
          id: random + '-3',
          group: 'bottom'
        },
        {
          id: random + '-4',
          group: 'left'
        }
      ]
      let p = this.graph.pageToLocal({
        x: parseFloat(position.left),
        y:
          from === 'middleEdge'
            ? parseFloat(position.top)
            : parseFloat(position.top) - 30
      })
      const addnode = this.graph.addNode(Object.assign({}, node, p))
      const getOriginNodeDirection = (ports, id) => {
        let direction = ''
        ports.forEach((port) => {
          if (port.id === id) {
            direction = port.group
          }
        })
        return direction
      }
      const handleDirection = (direction) => {
        let res = ''
        switch (direction) {
          case 'top':
            res = 'bottom'
            break
          case 'bottom':
            res = 'top'
            break
          case 'left':
            res = 'right'
            break
          case 'right':
            res = 'left'
            break
          default:
            res = ''
        }
        return res
      }
      if (from == 'middleEdge') {
        const { originEdge, sourceNode, targetNode } =
          this.edgeBtnClickSelectConfig
        const { target: finalTarget } = originEdge
        const sourcePortId = originEdge.getSourcePortId()
        const targetPortId = originEdge.getTargetPortId()
        // 过滤链接桩分组（方向）
        const {
          ports: { items: sourceItems }
        } = sourceNode
        const {
          ports: { items: targetItems }
        } = targetNode
        let originSouceNodeDirection = getOriginNodeDirection(
          sourceItems,
          sourcePortId
        )

        let originTartetNodeDirection = getOriginNodeDirection(
          targetItems,
          targetPortId
        )

        console.log(
          originSouceNodeDirection,
          originTartetNodeDirection,
          '源头方向，目标方向'
        )
        // 新增节点起点链接桩
        let addNodeSourcePort = addnode.ports.items.filter(
          (item) => item.group === handleDirection(originTartetNodeDirection)
        )[0]
        // 新增节点被指向链接桩
        let addNodeConnectedPort = addnode.ports.items.filter(
          (item) => item.group === handleDirection(originSouceNodeDirection)
        )[0]
        console.log(addNodeSourcePort, addNodeConnectedPort, '新增节点方向')
        originEdge.setTarget({
          cell: addnode.id,
          port: addNodeConnectedPort.id
        })
        // 新建一条边
        this.graph.addEdge({
          source: { cell: addnode.id, port: addNodeSourcePort.id },
          target: finalTarget
        })
        addnode.translate(-30, 0, {
          transition: {
            duration: 300
          }
        })
      } else {
        const { originEdge: edge } = this.edgeBtnClickSelectConfig
        const sourcePortId = edge.getSourcePortId()
        let connectDirection = ''
        edge.getSourceNode().ports.items.forEach((item) => {
          if (item.id === sourcePortId) {
            connectDirection = handleDirection(item.group)
          }
        })
        // 获取边连接的链接桩的方向
        console.log(addnode, 'addnode')
        let {
          port: { ports }
        } = addnode
        edge.setTarget({
          cell: addnode.id,
          port: ports.filter((item) => item.group === connectDirection)[0].id
        })
        addnode.translate(-20, 4, {
          transition: {
            duration: 300
          }
        })
      }
      this.showNodeMenu = false
    },
    addNode(option) {
      console.log(option, '拖拽节点配置')
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
