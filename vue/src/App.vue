<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onBeforeUnmount } from 'vue'

const clearLoginRecords = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('token')
}

onBeforeUnmount(() => {
  clearLoginRecords()
})
</script>

<template>
  <!-- <RouterLink to="/about">About</RouterLink> -->
  <RouterView />
</template>

<style scoped>
</style>
