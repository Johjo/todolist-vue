import { beforeEach, describe, expect, it } from 'vitest'
import { StartFvpSession } from '../../../domain/usecases/StartFvpSession'
import type { TaskRepositoryPort } from '../../../domain/ports/TaskRepositoryPort'
import type { ExternalTodolistPort } from '../../../domain/ports/ExternalTodolistPort'
import type { FvpRepositoryPort } from '../../../domain/ports/FvpRepositoryPort'
import type { TaskInformation } from '../../../domain/entities/TaskInformation'
import type { TaskFvp } from '../../../domain/entities/TaskFvp'
import type { ExternalTask } from '../../../domain/entities/ExternalTask'

class FakeTaskRepository implements TaskRepositoryPort {
  private _saved: TaskInformation[] = []

  async save(task: TaskInformation): Promise<void> {
    this._saved.push(task)
  }

  saved() {
    return this._saved
  }
}

class FakeFvpRepository implements FvpRepositoryPort {
  private _saved: TaskFvp[] = []

  async save(taskFvp: TaskFvp): Promise<void> {
    this._saved.push(taskFvp)
  }

  saved() {
    return this._saved
  }
}

class FakeExternalTodolist implements ExternalTodolistPort {
  private _tasks: ExternalTask[] = []

  setTasks(tasks: ExternalTask[]) {
    this._tasks = tasks
  }

  async allActiveTasks() {
    return this._tasks
  }
}

describe('StartFvpSession', () => {
  let fakeTaskRepository: FakeTaskRepository
  let fakeFvpRepository: FakeFvpRepository
  let fakeExternalTodolist: FakeExternalTodolist

  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository()
    fakeFvpRepository = new FakeFvpRepository()
    fakeExternalTodolist = new FakeExternalTodolist()
  })

  it('should save external tasks', async () => {
    const sut = new StartFvpSession(fakeTaskRepository, fakeExternalTodolist, fakeFvpRepository)
    fakeExternalTodolist.setTasks([{ key: 'key1', title: 'title1' }])

    await sut.execute()

    expect(fakeTaskRepository.saved()).toEqual([{ key: 'key1', title: 'title1' }])
  })

  it('should save fvp task', async () => {
    const sut = new StartFvpSession(fakeTaskRepository, fakeExternalTodolist, fakeFvpRepository)
    fakeExternalTodolist.setTasks([{ key: 'key1', title: 'title1' }])

    await sut.execute()

    expect(fakeFvpRepository.saved()).toEqual([{ key: 'key1', status: 'new' }])
  })

  it('should not save external task when no tasks', async () => {
    const sut = new StartFvpSession(fakeTaskRepository, fakeExternalTodolist, fakeFvpRepository)

    await sut.execute()

    expect(fakeTaskRepository.saved()).toEqual([])
  })

  it('should save external tasks when multiple tasks', async () => {
    const sut = new StartFvpSession(fakeTaskRepository, fakeExternalTodolist, fakeFvpRepository)
    fakeExternalTodolist.setTasks([
      { key: 'key1', title: 'title1' },
      { key: 'key2', title: 'title2' }
    ])

    await sut.execute()

    expect(fakeTaskRepository.saved()).toEqual([
      { key: 'key1', title: 'title1' },
      { key: 'key2', title: 'title2' }
    ])
  })
})