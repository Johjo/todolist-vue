import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { container } from './di/container'
import { TASK_REPOSITORY_KEY, FVP_REPOSITORY_KEY, EXTERNAL_TODOLIST_KEY } from './di/keys'
import { TaskRepositoryLocalStorage } from './adapters/TaskRepositoryLocalStorage'
import { FvpRepositoryLocalStorage } from './adapters/FvpRepositoryLocalStorage'
import { ExternalTodolistFromTodoist } from './adapters/ExternalTodolistFromTodoist'
import { TodolistController } from './controllers/TodolistController'

// Configuration de l'injection de dépendances
container.provide(TASK_REPOSITORY_KEY, new TaskRepositoryLocalStorage())
container.provide(FVP_REPOSITORY_KEY, new FvpRepositoryLocalStorage())
container.provide(EXTERNAL_TODOLIST_KEY, new ExternalTodolistFromTodoist(import.meta.env.VITE_TODOIST_API_TOKEN || 'no-token'))

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Injection du controller dans Vue
const controller = new TodolistController()
app.provide('controller', controller)

app.mount('#app')
