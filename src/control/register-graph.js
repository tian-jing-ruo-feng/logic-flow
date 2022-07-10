import { Graph } from '@antv/x6'

export const initGraph = function (container, vm) {
  const graph = new Graph({
    grid: {
      size: 10,
      visible: true,
      type: 'dot',
      args: {
        color: '#000',
        thickness: 1
      }
    },
    background: {
      color: '#fff'
    },
    container,
    snapline: {
      enabled: true,
      sharp: false,
      tolerance: 20
    },
    scroller: true, // 滚动画布
    minimap: {
      enabled: true,
      container: document.getElementById('minimap'),
      width: 200,
      height: 160,
      padding: 10,
      graphOptions: {
        async: true,
        getCellView(cell) {
          if (cell.isNode()) {
            // return SimpleNodeView
          }
        },
        createCellView(cell) {
          if (cell.isEdge()) {
            return null
          }
        }
      }
    }, // 小地图
    autoResize: true,
    panning: {
      enable: true,
      eventTypes: ['leftMouseDown', 'mouseWheel']
    },
    allowPanning: () => {
      return true
    },
    mouseWheel: {
      enable: true,
      modifiers: ['ctrl', 'meta'],
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            storke: '#31D0C6',
            strokeWidth: 4
          }
        }
      }
    },
    connecting: {
      snap: true,
      allowBlank: true,
      allowLoop: false,
      highlight: true,
      connectionPoint: 'anchor',
      anchor: 'center',
      validateMagnet() {
        // 连线验证配置
        return true
      },
      createEdge() {
        const edge = graph.createEdge({
          shape: 'tjrf-edge',
          attrs: {
            line: {
              // strokeDasharray: '5 5',
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8
              }
            }
          },
          zIndex: -1
        })
        return edge
      },
      validateEdge({ edge, type, previous }) {
        console.log(edge, type, previous, 'edge, type, previous')
        let target = graph.localToPage(edge.target)
        console.log(target, 'target目标点')
        vm.showNodeMenu = true
        vm.edgeBtnClickSelectConfig = {
          nodeMenuPosition: {
            left: target.x + 'px',
            top: target.y + 'px'
          },
          originEdge: edge,
          from: 'pullEdge'
        }
        return true
      }
    },
    selecting: {
      enable: true,
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: 'shift',
      rubberband: true
    },
    keyboard: true,
    clipboard: true,
    history: true
  })

  return graph
}
