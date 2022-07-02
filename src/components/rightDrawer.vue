<template>
  <div class="right-drawer">
    <el-drawer
      :visible.sync="visible"
      :direction="direction"
      :modal="false"
      :size="300"
      :modal-append-to-body="false">
      <template slot="title">
        <h3>{{ title }}</h3>
      </template>
      <el-form :model="form" size="small" class="form">
        <el-form-item prop="label" label="名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="$emit('save', { node, form })"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'rightDrawer',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      visible: false,
      direction: 'rtl',
      form: {
        label: '名称'
      },
      node: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.right-drawer {
  &.form {
    width: 100%;
    padding: 0 4px;
  }
  &::v-deep {
    .el-drawer {
      box-shadow: none;
      // background: $drawerbackground;
    }
    .el-drawer__container {
      top: $drawertop;
    }
    .el-drawer__header {
      margin: 0;
    }
    .el-drawer__body {
      overflow: scroll;
      padding: 0 20px;
    }
    .el-drawer__close-btn {
      text-align: right;
      padding-right: 20px;
    }
  }
}
</style>
