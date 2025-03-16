<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import TheWelcome from '../components/TheWelcome.vue'

const list = ref([
  { index: 1 },
  { index: 2 }, 
  // { index: 3 }, 
  // { index: 4 },
  // { index: 5 }, { index: 6 }, { index: 7 }, { index: 8 }
])

</script>

<template>
  <Header />
  <main class="home">
    <TheWelcome v-for="item in list" :key="item.index" :info="item" />
  </main>
</template>

<style scoped>
.home {
  height: calc(100vh - 2rem - 50px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}
</style>
