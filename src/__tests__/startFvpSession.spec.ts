import { beforeEach, describe, expect, it } from 'vitest'
import type {
  ExternalTask,
  ExternalTodolistPort,
  FvpRepositoryPort,
  NewTask,
  TaskFvp,
  TaskInformation,
  TaskRepositoryPort
} from './startFvpSession'
import { StartFvpSession } from './startFvpSession'


class TaskRepositoryForTest implements TaskRepositoryPort {
  _tasks: TaskInformation[] = []

  async save(task: TaskInformation): Promise<void> {
    this._tasks.push(task)
  }
}


class ExternalTodolistForTest implements ExternalTodolistPort {
  _tasks: ExternalTask[] = []

  feed(tasks: ExternalTask[]) {
    for (const task of tasks) {
      this._tasks.push(task)
    }
  }

  async allActiveTasks() {
    return this._tasks
  }
}


type TaskDetail = { key: string, title: string }

class TaskBuilder {
  private readonly _taskDetail: TaskDetail = { key: 'key 1', title: 'buy the milk' }

  constructor(taskDetail: Partial<TaskDetail>) {
    this._taskDetail = { ...this._taskDetail, ...taskDetail }
  }

  toExternal(): ExternalTask {
    return {
      key: this._taskDetail.key,
      title: this._taskDetail.title
    }
  }

  toInformation(): TaskInformation {
    return {
      key: this._taskDetail.key,
      title: this._taskDetail.title
    }

  }

  toNew(): NewTask {
    return {
      key: this._taskDetail.key,
      status: 'new'
    }
  }
}

function aTask(taskDetail: Partial<TaskDetail>) {
  return new TaskBuilder(taskDetail)
}

class FvpRepositoryForTest implements FvpRepositoryPort {
  _tasks: TaskFvp[] = []

  async save(taskFvp: TaskFvp) {
    this._tasks.push(taskFvp)
  }
}

describe('initialize fvp session', () => {
  let task_repository: TaskRepositoryForTest
  let externalTodolist: ExternalTodolistForTest
  let fvpRepository: FvpRepositoryForTest
  let sut: StartFvpSession

  let taskOne: TaskBuilder
  let taskTwo: TaskBuilder

  beforeEach(() => {
    task_repository = new TaskRepositoryForTest()
    externalTodolist = new ExternalTodolistForTest()
    fvpRepository = new FvpRepositoryForTest()
    sut = new StartFvpSession(task_repository, externalTodolist, fvpRepository)

    taskOne = aTask({ key: 'key 1', title: 'buy the milk' })
    taskTwo = aTask({ key: 'key 2', title: 'buy the eggs' })
  })


  describe('synchronize task information', () => {
    it('do nothing when no task in external todolist', async () => {
      await sut.execute()

      expect([...task_repository._tasks]).toEqual([])
    })

    it('synchronize many tasks', async () => {
      externalTodolist.feed([taskOne.toExternal(), taskTwo.toExternal()])

      await sut.execute()

      expect([...task_repository._tasks]).toEqual([taskOne.toInformation(), taskTwo.toInformation()])
    })
  })

  describe('start fvp session', () => {
    it('do nothing when no task in external todolist', async () => {
      await sut.execute()

      const fvpRepository = new FvpRepositoryForTest()

      expect([...fvpRepository._tasks]).toEqual([])
    })

    it('create fvp task for each task', async () => {
      externalTodolist.feed([taskOne.toExternal(), taskTwo.toExternal()])

      await sut.execute()

      expect([...fvpRepository._tasks]).toEqual([taskOne.toNew(), taskTwo.toNew()])
    })

  })
})
