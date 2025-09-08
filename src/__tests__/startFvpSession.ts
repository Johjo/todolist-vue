export interface TaskRepositoryPort {
  save(task: TaskInformation): Promise<void>;
}

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

    for (const task of externalTasks) {
      await this._taskRepository.save(this._toTaskInformation(task))
      await this._fvpRepository.save(this._toTaskFvp(task))
    }

  }

  private _toTaskInformation(externalTask: ExternalTask) {
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

export type TaskInformation = { key: string, title: string }
export type ExternalTask = { key: string, title: string }

export interface ExternalTodolistPort {
  allActiveTasks(): Promise<ExternalTask[]>
}

export type NewTask = { key: string, status: 'new' }
export type TaskFvp = NewTask

export interface FvpRepositoryPort {
  save(taskFvp: TaskFvp): Promise<void>
}
