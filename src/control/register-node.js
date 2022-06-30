import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
//  引入自定义vue节点
import nodeCircle from '@com/custom-node/nodeCircle.vue'
import nodeStart from '@com/custom-node/nodeStart.vue'
import nodeXunhuan from '@com/custom-node/nodeXunhuan.vue'
import nodeLingxing from '@com/custom-node/nodeLingxing.vue'
import nodeShujuku from '@com/custom-node/nodeShujuku.vue'
import nodeJuxing from '@com/custom-node/nodeJuxing.vue'
import nodeJieshu from '@com/custom-node/nodeJieshu.vue'
import nodeWendang from '@com/custom-node/nodeWendang.vue'
import nodeMessage from '@com/custom-node/nodeMessage.vue'
import nodeComposerluojibianpai from '@com/custom-node/nodeComposerluojibianpai.vue'
import nodeBianliangfuzhi from '@com/custom-node/nodeBianliangfuzhi.vue'
import nodeSwitch from '@com/custom-node/nodeSwitch.vue'
import nodeBianpaicanshu from '@com/custom-node/nodeBianpaicanshu.vue'

const nodes = [
  {
    name: 'nodeCircle',
    component: nodeCircle
  },
  { name: 'nodeStart', component: nodeStart },
  { name: 'nodeXunhuan', component: nodeXunhuan },
  { name: 'nodeLingxing', component: nodeLingxing },
  { name: 'nodeShujuku', component: nodeShujuku },
  { name: 'nodeJuxing', component: nodeJuxing },
  { name: 'nodeJieshu', component: nodeJieshu },
  { name: 'nodeWendang', component: nodeWendang },
  { name: 'nodeMessage', component: nodeMessage },
  { name: 'nodeComposerluojibianpai', component: nodeComposerluojibianpai },
  { name: 'nodeBianliangfuzhi', component: nodeBianliangfuzhi },
  { name: 'nodeSwitch', component: nodeSwitch },
  { name: 'nodeBianpaicanshu', component: nodeBianpaicanshu }
]

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
nodes.forEach((node) => {
  registerNodeWithVue(
    Graph,
    node.component.name,
    {
      width: 50,
      height: 50
    },
    {
      template: `<${node.component.name}/>`,
      components: {
        [`${node.name}`]: node.component
      }
    }
  )
})
