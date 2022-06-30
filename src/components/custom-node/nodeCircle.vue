<template>
  <div class="node-circle" ref="nodeCircle">
    <div class="node">
      <span class="iconfont icon-circle"></span>
    </div>
    <!-- <p class="label" ref="label">{{label}}</p> -->
  </div>
</template>

<script>
export default {
  inject: ['getGraph', 'getNode'],
  name: 'nodeCircle',
  data() {
    return {
      label: 'label',
      nodeWidth: 0
    }
  },
  mounted() {
    let node = this.getNode()
    console.log(node, 'node 元素')
  }
}
</script>

<style lang="scss" scoped>
.node-circle {
  width: 100%;
  height: 100%;
  // border: 1px solid #000;
  & .node {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
    color: #5c5c5c;
    vertical-align: middle;
    box-shadow: 0 0 10px $boxshadow, 0 0 10px $boxshadow, 0 0 10px $boxshadow,
      0 0 10px $boxshadow;
    & span {
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: $nodecolor;
      &:hover {
        color: $nodehover;
      }
    }
  }

  & .label {
    position: absolute;
    padding: 0;
    margin: 0;
    bottom: -24px;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
