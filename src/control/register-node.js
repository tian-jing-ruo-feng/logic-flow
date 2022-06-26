import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
//  引入自定义vue节点
import nodeCircle from '@com/custom-node/nodeCircle.vue'

/**
 * @description: 节点注册
 * @param {Graph} graph 构造函数
 * @param {String} name 节点名称
 * @param {Object} vuecomponet 节点对象[宽、高、Vue节点组件]
 * @return {Graph}
 */
function registerNodeWithVue(graph, name, vuecomponet) {
  const Graph = graph
  const { style, component } = vuecomponet
  const { width, height } = style

  Graph.registerNode(
    name,
    {
      inherit: 'vue-shape',
      width,
      height,
      component,
      // 默认上、下、左、右四个链接桩
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#c2c805',
                strokeWidth: 1,
                fill: '#fff'
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#c2c805',
                strokeWidth: 1,
                fill: '#fff'
              }
            }
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#c2c805',
                strokeWidth: 1,
                fill: '#fff'
              }
            }
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#c2c805',
                strokeWidth: 1,
                fill: '#fff'
              }
            }
          }
        }
      }
    },
    true // 重名覆盖
  )

  return Graph
}

// 注册自定义节点
registerNodeWithVue(Graph, 'node-circle', {
  style: {
    width: 50,
    height: 50
  },
  component: nodeCircle
})
