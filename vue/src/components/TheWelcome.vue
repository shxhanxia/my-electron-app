<script setup>
import { ref, toRefs, watch, onUnmounted } from 'vue'
const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  Nameplate: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  workshop: {
    type: String,
    required: true
  },
  ProductionLine: {
    type: String,
    required: true
  },
  Remark: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})
// 使用 toRefs 解构 info 对象，并保持响应式
const { index, name, Nameplate, client, workshop, ProductionLine, Remark, status } = toRefs(props)

const emit = defineEmits(['update'])

// 更新数据
const update = (data) => {
  emit('update', { index: index.value, ...data })
}
let ws
let isUnmounted = false
const connectionTimeout = 5000 // 设置超时时间为5秒
let connectionTimer

// 创建 WebSocket 连接
const createWebSocket = () => {
  if (index.value < 5) {
    update({ status: 'connected' })
    return
  }
  if (ws) {
    ws.close()
  }

  ws = new WebSocket(`ws://192.168.31.32:300${index.value}`)

  connectionTimer = setTimeout(() => {
    if (ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket connection timed out')
      ws.close()
    }
  }, connectionTimeout)

  ws.onopen = () => {
    clearTimeout(connectionTimer)
    console.log('WebSocket connection opened')
    ws.send(`Hello Server! Index: ${index.value}`)
    update({ status: 'connected' })
  }

  ws.onmessage = (message) => {
    console.log('Received:', message.data)
  }

  ws.onclose = () => {
    clearTimeout(connectionTimer)
    console.log('WebSocket connection closed')
    if (!isUnmounted) {
      setTimeout(() => {
        createWebSocket()
      }, 1000)
    }
  }

  ws.onerror = (error) => {
    clearTimeout(connectionTimer)
    console.error('WebSocket error:', error)
    update({ status: 'connecterror' })
  }
}

// 监听 index 的变化
watch(index, () => {
  createWebSocket()
})

// 在组件卸载时关闭 WebSocket 连接
onUnmounted(() => {
  isUnmounted = true
  if (ws) {
    ws.close()
  }
})

// 初始创建 WebSocket 连接
createWebSocket()

// 表单数据
const form = ref({
  name: name.value,
  Nameplate: Nameplate.value,
  client: client.value,
  workshop: workshop.value,
  ProductionLine: ProductionLine.value,
  Remark: Remark.value,
})
// 保存编辑前的数据
const oldForm = ref(form.value)
// 是否显示弹窗
const isDialogVisible = ref(false)
// 编辑
const edit = () => {
  oldForm.value = { ...form.value }
  isDialogVisible.value = true
}
// 提交编辑
const onSubmit = () => {
  console.log('submit!', form.value)
  update(form.value)
  isDialogVisible.value = false
}
// 取消编辑
const onCancel = () => {
  console.log('cancel!')
  form.value = { ...oldForm.value }
  isDialogVisible.value = false
}

const clients = ref([
  {
    label: '客户1',
    value: '客户1',
  }, {
    label: '客户2',
    value: '客户2',
  }, {
    label: '客户3',
    value: '客户3',
  },
])

const workshops = ref([
  {
    label: '车间1-1',
    value: '车间1-1',
  }, {
    label: '车间1-2',
    value: '车间1-2',
  }, {
    label: '车间1-3',
    value: '车间1-3',
  },
])

const ProductionLines = ref([
  {
    label: '产线1-1-1',
    value: '产线1-1-1',
  }, {
    label: '产线1-1-2',
    value: '产线1-1-2',
  }, {
    label: '产线1-1-3',
    value: '产线1-1-3',
  },
])
</script>

<template>
  <div :class="['welcome', status]">
    <div class="welcome-top">
      <span>{{ form.name }}</span>
      <span v-if="status === 'connecterror'" class="edit" @click="edit">编辑</span>
    </div>
    <div style="flex: 1;">
      <div>
        铭牌:
        <div class="welcome-cont">{{ form.Nameplate }}</div>
      </div>
      <div>
        客户:
        <div class="welcome-cont">{{ form.client }}</div>
      </div>
      <div>
        车间:
        <div class="welcome-cont">{{ form.workshop }}</div>
      </div>
      <div>
        产线:
        <div class="welcome-cont">{{ form.ProductionLine }}</div>
      </div>
    </div>
    <div class="footer">
      <el-button :type="{ connecting: 'primary', connected: 'success', connecterror: 'danger' }[status]" size="small"
        round>{{ status }}</el-button>
    </div>
    <el-dialog v-model="isDialogVisible" title="编辑信息" width="500" :before-close="onCancel">
      <el-form :model="form" label-width="auto">
        <el-form-item label="名字">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="铭牌">
          <el-input v-model="form.Nameplate" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="form.client" placeholder="Select">
            <el-option v-for="item in clients" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="车间">
          <el-select v-model="form.workshop" placeholder="Select">
            <el-option v-for="item in workshops" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产线">
          <el-select v-model="form.ProductionLine" placeholder="Select">
            <el-option v-for="item in ProductionLines" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.welcome {
  border-radius: 5px;
  padding: 10px;
  background-color: #f5f9fe;
  box-shadow: 0 0 4px rgba(245, 249, 254, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 0 8px rgba(245, 249, 254, 0.2);
  }
}

.connected {
  /* background-color: rgba(0, 255, 0, 0.1); */
  /* box-shadow: 0 0 10px rgba(0, 255, 0, 0.1); */
}

.connecterror {
  /* background-color: rgba(255, 0, 0, 0.1); */
  /* box-shadow: 0 0 10px rgba(255, 0, 0, 0.1); */
}

.welcome-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.edit {
  font-size: 12px;
  color: #4a90e2;
  cursor: pointer;
}

.welcome-cont {
  text-indent: 2em;
}

.footer {
  height: 50px;
  font-size: 12px;
  border-top: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
