import type { ControllerPort } from '../types/ControllerPort'
import { StartFvpSession } from '../domain/usecases/StartFvpSession'
import { useTodolistStore } from '../stores/todolist'
import { container } from '../di/container'
import { TASK_REPOSITORY_KEY, FVP_REPOSITORY_KEY, EXTERNAL_TODOLIST_KEY } from '../di/keys'

export class TodolistController implements ControllerPort {

  async refresh(): Promise<void> {
    const todolistStore = useTodolistStore()

    const taskRepository = container.inject(TASK_REPOSITORY_KEY)
    const fvpRepository = container.inject(FVP_REPOSITORY_KEY)
    const externalTodolist = container.inject(EXTERNAL_TODOLIST_KEY)

   const startFvpSession = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)

    await startFvpSession.execute()

    todolistStore.setState({
      type: 'DoTask',
      task: 'Tâche récupérée depuis localStorage'
    })
  }
}
