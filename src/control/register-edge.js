import { Graph, Path } from '@antv/x6'
/**
 * @description: 注册边
 * @param {Graph} graph 构造函数
 * @param {String} name 边名称
 * @return {Graph}
 */
function registerEdgeWithSelf(graph, name) {
  const Graph = graph

  Graph.registerEdge(
    name,
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#606266',
          strokeWidth: 2,
          targetMarker: {
            name: 'block',
            width: 12,
            height: 8
          }
        }
      },
      router: {
        name: 'normal',
        args: {
          startDirections: ['bottom'],
          endDirections: ['top']
        }
      }
    },
    true
  )

  return Graph
}

// 注册自定义边
registerEdgeWithSelf(Graph, 'tjrf-edge')

// 自定义连接器
export const registerConnectorWithSelf = function (graph) {
  const Graph = graph
  Graph.registerConnector(
    'tjrf-connector',
    (s, e) => {
      const offset = 4
      const deltaY = Math.abs(e.y - s.y)
      const control = Math.floor((deltaY / 3) * 2)

      const v1 = { x: s.x, y: s.y + offset + control }
      const v2 = { x: e.x, y: e.y - offset - control }

      return Path.normalize(
        `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `
      )
    },
    true
  )
}
