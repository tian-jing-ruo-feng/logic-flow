export const registerEvent = function (graph, vm) {
  // ------------ 监听边的相关事件 ------------
  graph.on('edge:contextmenu', ({ e, edge }) => {
    vm.showContextMenu = true
    vm.$nextTick(() => {
      vm.$refs.menuBar.initFn(e.offsetX, e.offsetY, {
        type: 'edge',
        item: edge
      })
    })
  })

  graph.on('edge:connected', ({ edge }) => {
    const source = graph.getCellById(edge.source.cell)
    const target = graph.getCellById(edge.target.cell)

    // 只许输入
    if (target.data.type == 'output') {
      return graph.removeEdge(edge.id)
    }

    // 只许输出
    if (source.data.type == 'onlyIn') {
      return graph.remomveEdge(edge.id)
    }

    // 线源端的链接桩只许输入
    if (/in/.test(edge.source.port)) {
      return graph.removeEdge(edge.id)
    }

    // 线目标端的链接桩只许输出
    if (/out/.test(edge.target.port)) {
      return graph.removeEdge(edge.id)
    }

    if (source.data.type == 'condition') {
      if (target.data.t === edge.id || target.data.f === edge.id) {
        return graph.removeEdge(edge.id)
      }
      vm.$refs.dialogContition.visible = true
      vm.$refs.dialogContition.init(source.data.edge)
    }

    edge.attr({
      line: {
        strokeDasharray: ''
      }
    })
  })

  // ------------ 监听节点相关事件 ------------
  graph.on('node:contextmenu', ({ x, y, node }) => {
    vm.showContextMenu = true
    vm.$nextTick(() => {
      vm.$refs.menuBar.setItem({ type: 'node', item: node })
      const p = graph.localToPage(x, y)
      vm.$refs.menuBar.initFn(p.x, p.y, {
        type: 'node',
        item: node
      })
    })
  })

  graph.on('node:change:data', ({ node }) => {
    const edges = graph.getIncomingEdges(node)
    const { status } = node.getData()
    edges &&
      edges.forEach((edge) => {
        if (status === 'running') {
          edge.attr('line/strokeDasharray', 5)
          edge.attr('line/style/animation', 'runnig-line 30s infinite linear')
        } else {
          edge.attr('line/strokeDasharray', '')
          edge.attr('line/style/animation', '')
        }
      })
  })

  // ------------ 监听画布相关事件 ------------
}
