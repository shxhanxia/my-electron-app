<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import TheWelcome from '../components/TheWelcome.vue'

const list = ref([
  { index: 1, name: 'A', address: 'http://localhost:3001', Nameplate: 'A', client: 'A', workshop: 'A', ProductionLine: 'A', Remark: '', status: 'connecting' },
  { index: 2, name: 'B', address: 'http://localhost:3002', Nameplate: 'B', client: 'B', workshop: 'B', ProductionLine: 'B', Remark: '', status: 'connecting' },
  { index: 3, name: 'C', address: 'http://localhost:3003', Nameplate: 'C', client: 'C', workshop: 'C', ProductionLine: 'C', Remark: '', status: 'connecting' },
  { index: 4, name: 'D', address: 'http://localhost:3004', Nameplate: 'D', client: 'D', workshop: 'D', ProductionLine: 'D', Remark: '', status: 'connecting' },
  { index: 5, name: 'E', address: 'http://localhost:3005', Nameplate: 'E', client: 'E', workshop: 'E', ProductionLine: 'E', Remark: '', status: 'connecting' },
  { index: 6, name: 'F', address: 'http://localhost:3006', Nameplate: 'F', client: 'F', workshop: 'F', ProductionLine: 'F', Remark: '', status: 'connecting' },
  { index: 7, name: 'G', address: 'http://localhost:3007', Nameplate: 'G', client: 'G', workshop: 'G', ProductionLine: 'G', Remark: '', status: 'connecting' },
  { index: 8, name: 'H', address: 'http://localhost:3008', Nameplate: 'H', client: 'H', workshop: 'H', ProductionLine: 'H', Remark: '', status: 'connecting' },

])

const handleUpdate = ({ index, ...arg }) => {
  list.value = list.value.map(item => {
    if (item.index === index) {
      return { ...item, ...arg }
    }
    return item
  })
}
</script>

<template>
  <Header />
  <main class="home">
    <TheWelcome v-for="item in list" :key="item.index" :index="item.index" :name="item.name" :address="item.address"
      :Nameplate="item.Nameplate" :client="item.client" :workshop="item.workshop" :ProductionLine="item.ProductionLine"
      :Remark="item.Remark" :status="item.status" @update="handleUpdate" />
  </main>
</template>

<style scoped>
.home {
  height: calc(100vh - 2rem - 200px);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
}
</style>
