<template>
  <div>
    Il n'y a rien à faire
    <button @click="handleRefresh">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ControllerPort } from '@/types/ControllerPort'

const controller = inject('controller') as ControllerPort

function handleRefresh() {
  controller.refresh()
}
</script>