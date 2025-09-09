<template>
  <div>
    <div v-if="store.state.type === 'NothingToDo'">
      Il n'y a rien à faire
    </div>
    <div v-else-if="store.state.type === 'DoTask'">
      {{ store.state.task }}
    </div>
    <button @click="handleRefresh">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useTodolistStore } from '@/stores/todolist'
import type { ControllerPort } from '@/types/ControllerPort'

const controller = inject('controller') as ControllerPort
const store = useTodolistStore()

function handleRefresh() {
  controller.refresh()
}
</script>
