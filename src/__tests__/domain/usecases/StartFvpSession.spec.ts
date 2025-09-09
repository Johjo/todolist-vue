import { beforeEach, describe, expect, it } from 'vitest'
import { StartFvpSession } from '../../../domain/usecases/StartFvpSession'
import type { TaskRepositoryPort } from '../../../domain/ports/TaskRepositoryPort'
import type { ExternalTodolistPort } from '../../../domain/ports/ExternalTodolistPort'
import type { FvpRepositoryPort } from '../../../domain/ports/FvpRepositoryPort'
import type { TaskInformation } from '../../../domain/entities/TaskInformation'
import type { TaskFvp } from '../../../domain/entities/TaskFvp'
import type { ExternalTask } from '../../../domain/entities/ExternalTask'

class TaskRepositoryForTest implements TaskRepositoryPort {
  private _tasks: TaskInformation[] = []

  async save(task: TaskInformation): Promise<void> {
    this._tasks.push(task)
  }

  saved() {
    return this._tasks
  }
}

class FvpRepositoryForTest implements FvpRepositoryPort {
  private _tasks: TaskFvp[] = []

  async save(taskFvp: TaskFvp): Promise<void> {
    this._tasks.push(taskFvp)
  }

  saved() {
    return this._tasks
  }
}

class ExternalTodolistForTest implements ExternalTodolistPort {
  private _tasks: ExternalTask[] = []

  setTasks(tasks: ExternalTask[]) {
    this._tasks = tasks
  }

  async allActiveTasks() {
    return this._tasks
  }
}

describe('StartFvpSession', () => {
  let taskRepository: TaskRepositoryForTest
  let fvpRepository: FvpRepositoryForTest
  let externalTodolist: ExternalTodolistForTest

  beforeEach(() => {
    taskRepository = new TaskRepositoryForTest()
    fvpRepository = new FvpRepositoryForTest()
    externalTodolist = new ExternalTodolistForTest()
  })

  it('should save external tasks', async () => {
    const sut = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)
    externalTodolist.setTasks([{ key: 'key1', title: 'title1' }])

    await sut.execute()

    expect(taskRepository.saved()).toEqual([{ key: 'key1', title: 'title1' }])
  })

  it('should save fvp task', async () => {
    const sut = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)
    externalTodolist.setTasks([{ key: 'key1', title: 'title1' }])

    await sut.execute()

    expect(fvpRepository.saved()).toEqual([{ key: 'key1', status: 'new' }])
  })

  it('should not save external task when no tasks', async () => {
    const sut = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)

    await sut.execute()

    expect(taskRepository.saved()).toEqual([])
  })

  it('should save external tasks when multiple tasks', async () => {
    const sut = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)
    externalTodolist.setTasks([
      { key: 'key1', title: 'title1' },
      { key: 'key2', title: 'title2' }
    ])

    await sut.execute()

    expect(taskRepository.saved()).toEqual([
      { key: 'key1', title: 'title1' },
      { key: 'key2', title: 'title2' }
    ])
  })
})
