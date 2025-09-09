import { beforeEach, describe, expect, it } from 'vitest'
import { StartFvpSession } from '../../../domain/usecases/StartFvpSession'
import type { TaskRepositoryPort } from '../../../domain/ports/TaskRepositoryPort'
import type { ExternalTodolistPort } from '../../../domain/ports/ExternalTodolistPort'
import type { FvpRepositoryPort } from '../../../domain/ports/FvpRepositoryPort'
import type { TaskInformation } from '../../../domain/entities/TaskInformation'
import type { TaskFvp } from '../../../domain/entities/TaskFvp'
import type { ExternalTask } from '../../../domain/entities/ExternalTask'
import type { TaskBuilder } from '../../fixtures.ts'
import { aTask } from '../../fixtures'

class TaskRepositoryForTest implements TaskRepositoryPort {
  private _tasks: TaskInformation[] = []

  async save(task: TaskInformation): Promise<void> {
    this._tasks.push(task)
  }

  allTasks() {
    return this._tasks
  }
}

class FvpRepositoryForTest implements FvpRepositoryPort {
  private _tasks: TaskFvp[] = []

  async save(taskFvp: TaskFvp): Promise<void> {
    this._tasks.push(taskFvp)
  }

  allTasks(): TaskFvp[] {
    return this._tasks
  }
}

class ExternalTodolistForTest implements ExternalTodolistPort {
  private _tasks: ExternalTask[] = []

  feed(tasks: ExternalTask[]) {
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
  let sut: StartFvpSession
  let taskOne: TaskBuilder
  let taskTwo: TaskBuilder

  beforeEach(() => {
    taskRepository = new TaskRepositoryForTest()
    fvpRepository = new FvpRepositoryForTest()
    externalTodolist = new ExternalTodolistForTest()
    sut = new StartFvpSession(taskRepository, externalTodolist, fvpRepository)
    taskOne = aTask({ key: '1' })
    taskTwo = aTask({ key: '2' })
  })

  it('should save external tasks', async () => {
    externalTodolist.feed([taskOne.toExternal()])

    await sut.execute()

    expect(taskRepository.allTasks()).toEqual([taskOne.toTaskInformation()])
  })

  it('should save fvp task', async () => {
    externalTodolist.feed([taskOne.toExternal()])

    await sut.execute()

    expect(fvpRepository.allTasks()).toEqual([taskOne.toNewTask()])
  })

  it('should not save external task when no tasks', async () => {
    await sut.execute()

    expect(taskRepository.allTasks()).toEqual([])
  })

  it('should save external tasks when multiple tasks', async () => {
    externalTodolist.feed([
      taskOne.toExternal(),
      taskTwo.toExternal()
    ])

    await sut.execute()

    expect(taskRepository.allTasks()).toEqual([
      taskOne.toTaskInformation(),
      taskTwo.toTaskInformation()
    ])

  })
})
