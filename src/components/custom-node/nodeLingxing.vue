<template>
  <div class="node-lingxing" ref="nodeLingxing">
    <div class="node">
      <span class="iconfont icon-lingxing1"></span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['getGraph', 'getNode'],
  name: 'node-lingxing',
  data() {
    return {
      label: 'label',
      nodeWidth: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.node-lingxing {
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
