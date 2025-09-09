/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, beforeEach} from 'vitest'
import { FvpRepositoryLocalStorage } from '../../adapters/FvpRepositoryLocalStorage'
import type { TaskFvp } from '../../domain/entities/TaskFvp'

describe('FvpRepositoryLocalStorage', () => {
  let sut: FvpRepositoryLocalStorage

  beforeEach(() => {
    localStorage.clear()
    sut = new FvpRepositoryLocalStorage()
  })

  it('should save a TaskFvp to localStorage', async () => {
    const taskFvp: TaskFvp = { key: 'task-1', status: 'new' }

    await sut.save(taskFvp)

    const storedData = localStorage.getItem('fvpTasks')
    expect(storedData).toBeTruthy()
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(1)
    expect(parsedTasks[0]).toEqual(taskFvp)
  })

  it('should append TaskFvp to existing tasks in localStorage', async () => {
    const task1: TaskFvp = { key: 'task-1', status: 'new' }
    const task2: TaskFvp = { key: 'task-2', status: 'new' }

    await sut.save(task1)
    await sut.save(task2)

    const storedData = localStorage.getItem('fvpTasks')
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(2)
    expect(parsedTasks).toContainEqual(task1)
    expect(parsedTasks).toContainEqual(task2)
  })

  it('should initialize empty array when localStorage is empty', async () => {
    const taskFvp: TaskFvp = { key: 'task-1', status: 'new' }

    await sut.save(taskFvp)

    const storedData = localStorage.getItem('fvpTasks')
    const parsedTasks = JSON.parse(storedData!)
    expect(parsedTasks).toHaveLength(1)
    expect(parsedTasks[0]).toEqual(taskFvp)
  })
})