<template>
  <div class="file-tree">
    <!-- Processes、 Interface、Logic、Data -->
    <ul class="type-tabs">
      <li
        class="func-tab"
        v-for="(tab, ind) in tabs"
        :key="ind"
        :class="{
          active: tab.active
        }"
        @click="tabClicked(tab)">
        <span :class="['iconfont', tab.icon]"></span>
        <span class="title">{{ tab.title }}</span>
      </li>
    </ul>
    <!-- 文件树🌲 -->
    <el-tree
      v-loading="treeLoading"
      :data="data"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :draggable="false"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span
          class="iconfont"
          :class="{
            'icon-wenjianjia': handleIcon(data),
            'icon-wenjian': !handleIcon(data)
          }"
          >{{ node.label }}</span
        >
        <span v-show="false">
          <!-- 后缀操作 -->
          <el-button type="text" size="mini" @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeLoading: false,
      tabs: [
        {
          icon: 'icon-gonggong-youjiantou',
          title: 'Process',
          value: 1,
          active: true
        },
        {
          icon: 'icon-interface',
          title: 'Interface',
          value: 2,
          active: false
        },
        {
          icon: 'icon-luoji',
          title: 'Logic',
          value: 3,
          active: false
        },
        {
          icon: 'icon-database',
          title: 'Data',
          value: 4,
          active: false
        }
      ],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    /** tab栏点击 */
    tabClicked(tab) {
      const vm = this
      let { active } = tab
      if (!active) {
        this.treeLoading = true
        this.tabs.forEach((item) => {
          if (item.active) {
            item.active = false
          }
        })
        tab.active = true
        // 模拟数据请求
        setTimeout(() => {
          vm.treeLoading = false
        }, 300)
      }
    },
    handleIcon(data) {
      return data.children ? true : false
    },
    handleDragStart(node) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>

<style lang="scss" scoped>
.file-tree {
  width: 350px;
  & .icon-wenjianjia::before {
    color: #e6a23c;
  }
  & .icon-wenjian::before {
    color: #faecd8;
  }

  & .type-tabs {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    list-style: none;
    & > li {
      padding: 10px 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      border-left: 1px solid $tjrf-border4;
      &:hover {
        cursor: pointer;
        background: #606266;
        color: #fff;
      }
    }

    & > li.active {
      background: #606266;
      color: #fff;
    }
  }
}
</style>
