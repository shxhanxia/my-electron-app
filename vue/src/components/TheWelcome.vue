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
  status: {
    type: String,
    required: true
  }
})
// 使用 toRefs 解构 info 对象，并保持响应式
const { index, name, address, status } = toRefs(props)

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
  address: address.value,
})
// 保存编辑前的数据
const oldForm = ref(form.value)
// 是否正在编辑
const isEditing = ref(false)
// 编辑
const edit = () => {
  oldForm.value = { ...form.value }
  isEditing.value = true
}
// 提交编辑
const onSubmit = () => {
  console.log('submit!', form.value)
  update(form.value)
  isEditing.value = false
}
// 取消编辑
const onCancel = () => {
  console.log('cancel!')
  form.value = { ...oldForm.value }
  isEditing.value = false
}
</script>

<template>
  <div :class="['welcome', status]">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="name">
        <el-input v-if="isEditing" v-model="form.name" />
        <div v-else class="form-item-cont" @click="edit">{{ form.name }}</div>
      </el-form-item>
      <el-form-item label="address">
        <el-input v-if="isEditing" v-model="form.address" />
        <div v-else class="form-item-cont" @click="edit">{{ form.address }}</div>
      </el-form-item>
      <div v-if="isEditing" style="text-align: center;">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.welcome {
  padding: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
}
.connected {
  background-color: rgba(0, 255, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
}
.connecterror {
  background-color: rgba(255, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.1);
}
.form-item-cont {
  width: 100%;
}
</style>
