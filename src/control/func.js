// 工具栏功能函数
class Funcs {
  constructor(vm) {
    this.vm = vm
  }

  zoomFn(num) {
    const that = this.vm
    that.graph.zoom(num)
  }

  centerFn() {
    const that = this.vm
    const num = that.graph.zoom()
    num > 1 ? that.graph.zoom(num * -1) : that.graph.zoom(num)
    that.graph.centerContent()
  }

  startFn(item, DataJson, nodeStatusList) {
    const that = this.vm
    that.timer && clearTimeout(that.timer)
    that.init(item || DataJson)
    that.showNodeStatus(Object.assign([], nodeStatusList))
    that.graph.centerContent()
  }

  startMock(item, DataJson, nodeStatusList) {
    const that = this.vm
    that.timer && clearTimeout(that.timer)
    that.init(item || DataJson.cells)
    that.showNodeStatus(Object.assign([], nodeStatusList))
    that.graph.centerContent()
  }

  saveFn() {
    const that = this.vm
    localStorage.setItem(
      'x6JSON',
      JSON.stringify(that.graph.toJSON({ diff: true }))
    )
  }

  loadFn() {
    const that = this.vm
    that.timer && clearTimeout(that.timer)
    const x6JSON = JSON.parse(localStorage.getItem('x6JSON'))

    that.startFn(x6JSON.cells)
  }

  lockFn() {
    const that = this.vm
    that.isLock = !that.isLock
    if (that.isLock) {
      that.graph.enablePanning()
      that.graph.enableKeyboard()
    } else {
      that.graph.disablePanning()
      that.graph.disableKeyboard()
    }
  }

  /** 链接桩显示隐藏 */
  showPorts(show) {
    const container = document.getElementById('container')
    const ports = container.querySelectorAll('.x6-port-body')
    for (let i = 0, len = ports.length; i < len; i++) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
}
/** 删除节点 */
export const deleteNode = (graph, node) => {
  const deleteNode = graph.removeNode(node)
  return deleteNode
}
export default Funcs
