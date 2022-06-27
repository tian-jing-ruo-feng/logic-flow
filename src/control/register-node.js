import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
//  引入自定义vue节点
import nodeCircle from '@com/custom-node/nodeCircle.vue'

/**
 * @description: 节点注册
 * @param {Graph} graph 构造函数
 * @param {String} name 节点名称
 * @param {Object} style 自定义样式[宽、高]
 * @param {Vue} component vue组件
 * @return {Graph}
 */
function registerNodeWithVue(graph, name, style, component) {
  const Graph = graph
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
      },
      attrs: {
        label: {
          text: '测试节点',
          fontSize: 14,
          fill: '#333333',
          refX: '50%',
          refY: '128%',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle'
        }
      }
    },
    true // 重名覆盖
  )

  return Graph
}

// 注册自定义节点
registerNodeWithVue(
  Graph,
  'node-circle',
  {
    width: 50,
    height: 50
  },
  {
    template: `<node-circle></node-circle>`,
    components: {
      nodeCircle
    }
  }
)
