import type { TaskRepositoryPort } from '../ports/TaskRepositoryPort'
import type { ExternalTodolistPort } from '../ports/ExternalTodolistPort'
import type { FvpRepositoryPort } from '../ports/FvpRepositoryPort'
import type { TaskInformation } from '../entities/TaskInformation'
import type { ExternalTask } from '../entities/ExternalTask'
import type { NewTask } from '../entities/TaskFvp'
import { container } from '@/di/container.ts'

export class StartFvpSession {
  private _taskRepository: TaskRepositoryPort
  private _externalTodolist: ExternalTodolistPort
  private _fvpRepository: FvpRepositoryPort

  constructor(taskRepository: TaskRepositoryPort, externalTodolist: ExternalTodolistPort, fvpRepository: FvpRepositoryPort) {
    this._taskRepository = taskRepository
    this._externalTodolist = externalTodolist
    this._fvpRepository = fvpRepository
  }

  async execute() {
    const externalTasks = await this._externalTodolist.allActiveTasks()
    console.log(externalTasks)
    for (const task of externalTasks) {

      await this._taskRepository.save(this._toTaskInformation(task))
      await this._fvpRepository.save(this._toTaskFvp(task))
    }

  }

  private _toTaskInformation(externalTask: ExternalTask): TaskInformation {
    return {
      key: externalTask.key,
      title: externalTask.title
    }
  }

  private _toTaskFvp(task: ExternalTask): NewTask {
    return {
      key: task.key,
      status: 'new'
    }
  }
}
