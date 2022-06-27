import { Graph } from '@antv/x6'

export const initGraph = function (container) {
  const graph = new Graph({
    grid: {
      size: 10,
      visible: true,
      type: 'dot',
      args: {
        color: '#fff',
        thickness: 1
      }
    },
    background: {
      color: '#000'
    },
    container,
    panning: {
      enable: true,
      eventTypes: ['leftMouseDown', 'mouseWheel']
    },
    mouseWheel: {
      enable: true,
      modifiers: 'ctrl',
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
        return graph.createEdge({
          shape: 'tjrf-edge',
          attrs: {
            line: {
              strokeDasharray: '5 5',
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8
              }
            }
          },
          zIndex: -1
        })
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
