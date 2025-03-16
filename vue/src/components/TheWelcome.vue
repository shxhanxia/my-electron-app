<script setup>
import { ref, toRefs, watch, onUnmounted } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})
// 使用 toRefs 解构 info 对象，并保持响应式
const { index } = toRefs(props.info)
let ws
let isUnmounted = false
const connectionTimeout = 5000 // 设置超时时间为5秒
let connectionTimer

const createWebSocket = () => {
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
  }
}

// 监听 props.info 的变化
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

// do not use same name with ref
const form = ref({
  name: '',
})

const onSubmit = () => {
  console.log('submit!', form.value)
}
</script>

<template>
  <div class="welcome">
    {{ index }}

    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
<template #heading>Documentation</template>

Vue’s
<a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
provides you with all information you need to get started.
</WelcomeItem>

<WelcomeItem>
  <template #icon>
      <ToolingIcon />
    </template>
  <template #heading>Tooling</template>

  This project is served and bundled with
  <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
  recommended IDE setup is
  <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>
  +
  <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
  you need to test your components and web pages, check out
  <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest</a>
  and
  <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>
  /
  <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a>.

  <br />

  More instructions are available in
  <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a>.
</WelcomeItem>

<WelcomeItem>
  <template #icon>
      <EcosystemIcon />
    </template>
  <template #heading>Ecosystem</template>

  Get official tools and libraries for your project:
  <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
  <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
  <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
  <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
  you need more resources, we suggest paying
  <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
  a visit.
</WelcomeItem>

<WelcomeItem>
  <template #icon>
      <CommunityIcon />
    </template>
  <template #heading>Community</template>

  Got stuck? Ask your question on
  <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>
  (our official Discord server), or
  <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>. You
  should also follow the official
  <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener">@vuejs.org</a>
  Bluesky account or the
  <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
  X account for latest news in the Vue world.
</WelcomeItem>

<WelcomeItem>
  <template #icon>
      <SupportIcon />
    </template>
  <template #heading>Support Vue</template>

  As an independent project, Vue relies on community backing for its sustainability. You can help
  us by
  <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
</WelcomeItem> -->
</template>

<style scoped>
.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  /* 背景颜色，可根据需要调整 */
  border: 1px solid #ccc;
  /* 边框，可根据需要调整 */
  height: 100%;
  /* 确保占满父容器的高度 */
  text-align: center;
  /* 文本居中 */
}
</style>
