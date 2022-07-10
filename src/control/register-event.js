import Funcs from './func'
import EventBus from '@/util/bus.js'
const funcs = new Funcs()
export const registerEvent = function (graph, vm) {
  // ------------ 监听画布相关事件 ------------
  graph.on('blank:click', () => {
    EventBus.$emit('click-graph')
  })
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

  graph.on('edge:mouseenter', ({ edge }) => {
    !edge.hasTool('button') &&
      edge.addTools({
        name: 'button',
        args: {
          markup: [
            {
              tagName: 'circle',
              selector: 'button',
              attrs: {
                r: 10,
                stroke: '#ffa2a2',
                'stroke-width': 2,
                fill: '#f56c6c',
                cursor: 'pointer'
              }
            }
          ],
          distance: '50%',
          onClick({ cell }) {
            vm.showNodeMenu = true
            const source = cell.getSource()
            const target = cell.getTarget()
            const sourceNode = graph.getCellById(source.cell)
            const targetNode = graph.getCellById(target.cell)
            let { x: sourceX, y: sourceY } = sourceNode.position()
            let { x: targetX, y: targetY } = targetNode.position()
            const handleMiddle = (p1, p2) => {
              return Math.abs((p1 - p2) / 2)
            }
            const middleX = handleMiddle(sourceX, targetX)
            const middleY = handleMiddle(sourceY, targetY)
            const middle = graph.localToPage({
              x: Math.min(sourceX, targetX) + middleX,
              y: Math.min(sourceY, targetY) + middleY
            })
            console.log(sourceX, sourceY, targetX, targetY, '源、目标')
            // console.log(middle, ' middle position')

            vm.edgeBtnClickSelectConfig = {
              nodeMenuPosition: {
                left: middle.x + 30 + 'px',
                top: middle.y + 'px'
              },
              originEdge: cell,
              sourceNode: cell.getSourceNode(),
              targetNode: cell.getTargetNode(),
              from: 'middleEdge'
            }
            vm.nodeMenuPosition = {
              left: middle.x + 30 + 'px',
              top: middle.y + 'px'
            }
          }
        }
      })
  })

  graph.on('edge:mouseleave', ({ edge }) => {
    edge.hasTool('button') && edge.removeTool('button')
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
          edge.attr('line/stroke', '#ff0000')
          edge.attr('line/strokeDasharray', 5)
          edge.attr('line/style/animation', 'runnig-line 60s infinite linear')
        } else {
          edge.attr('line/stroke', '#606266')
          edge.attr('line/strokeDasharray', '')
          edge.attr('line/style/animation', '')
        }
      })
  })

  graph.on('node:mouseenter', () => {
    funcs.showPorts(true)
  })

  graph.on('node:mouseleave', () => {
    funcs.showPorts(false)
  })
  // ------------ 监听画布相关事件 ------------
}
