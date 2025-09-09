import type { ExternalTask } from '@/domain/entities/ExternalTask.ts'
import type { TaskInformation } from '@/domain/entities/TaskInformation.ts'
import type { NewTask } from '@/domain/entities/TaskFvp.ts'

type taskDetail = { key: string, title: string }

export class TaskBuilder {
  private detail: taskDetail = { key: 'key1', title: 'title1' }

  constructor({ key }: { key: string }) {
    this.detail = { key: key, title: `title ${key}` }
  }

  toExternal(): ExternalTask {
    return { key: this.detail.key, title: this.detail.title }
  }

  toTaskInformation(): TaskInformation {
    return { key: this.detail.key, title: this.detail.title }
  }

  toNewTask(): NewTask {
    return { key: this.detail.key, status: 'new' }
  }
}

export function aTask({ key }: { key: string }) {
  return new TaskBuilder({ key })
}
