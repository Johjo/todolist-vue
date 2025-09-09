/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, beforeEach} from 'vitest'
import { TaskRepositoryLocalStorage } from '../../adapters/TaskRepositoryLocalStorage'
import type { TaskInformation } from '../../domain/entities/TaskInformation'

describe('TaskRepositoryLocalStorage', () => {
  let sut: TaskRepositoryLocalStorage

  beforeEach(() => {
    localStorage.clear()
    sut = new TaskRepositoryLocalStorage()
  })

  it('should save a task to localStorage', async () => {
    const task: TaskInformation = { key: 'task-1', title: 'Test task' }

    await sut.save(task)

    const storedData = localStorage.getItem('tasks')
    expect(storedData).toBeTruthy()
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(1)
    expect(parsedTasks[0]).toEqual(task)
  })

  it('should append tasks to existing tasks in localStorage', async () => {
    const task1: TaskInformation = { key: 'task-1', title: 'First task' }
    const task2: TaskInformation = { key: 'task-2', title: 'Second task' }

    await sut.save(task1)
    await sut.save(task2)

    const storedData = localStorage.getItem('tasks')
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(2)
    expect(parsedTasks).toContainEqual(task1)
    expect(parsedTasks).toContainEqual(task2)
  })

  it('should initialize empty array when localStorage is empty', async () => {
    const task: TaskInformation = { key: 'task-1', title: 'Test task' }

    await sut.save(task)

    const storedData = localStorage.getItem('tasks')
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(1)
    expect(parsedTasks[0]).toEqual(task)
  })
})
