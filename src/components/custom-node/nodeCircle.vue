<template>
  <div class="node-circle">
    <img src="" alt="">
    <span>Node</span>
  </div>
</template>

<script>
export default {
  name: 'node-circle'
}
</script>

<style lang="scss" scoped>
.node-circle {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  color: #5c5c5c ;
  vertical-align: middle;
  box-shadow: 0 0 10px $boxshadow,
              0 0 10px $boxshadow,
              0 0 10px $boxshadow,
              0 0 10px $boxshadow;
  & span {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
}

</style>