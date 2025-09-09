<template>
  <div>
    <div v-if="store.state.type === 'NothingToDo'">
      Il n'y a rien à faire
    </div>
    <div v-else-if="store.state.type === 'DoTask'">
      {{ store.state.task }}
    </div>
    <div v-else-if="store.state.type === 'ChooseTaskBetween'">
      <div>{{ store.state.task1 }}</div>
      <div>{{ store.state.task2 }}</div>
    </div>
    <button @click="handleRefresh">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useTodolistStore } from '@/stores/todolist'
import type { ControllerPort } from '@/types/ControllerPort'

defineOptions({
  name: 'TodoList'
})

const controller = inject('controller') as ControllerPort
const store = useTodolistStore()

function handleRefresh() {
  controller.refresh()
}
</script>
