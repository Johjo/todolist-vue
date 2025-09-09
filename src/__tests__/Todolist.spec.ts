import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import type { RenderOptions } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTodolistStore } from '@/stores/todolist'
import Todolist from '@/components/Todolist.vue'
import type { ControllerPort } from '@/types/ControllerPort'


type History = { name: string }

class ControllerForTest implements ControllerPort {
  _history: History[] = []

  history() {
    return this._history
  }

  refresh() {
    this._history.push({ name: 'refresh' })
  }
}

describe('Todolist', () => {
  let controller: ControllerForTest
  let store: ReturnType<typeof useTodolistStore>
  let options: RenderOptions<typeof Todolist>;

  beforeEach(() => {
    cleanup()
    setActivePinia(createPinia())
    controller = new ControllerForTest()
    store = useTodolistStore()

    options = {
      global: {
        provide: {
          controller: controller
        }
      }
    }
  })

  it('should display nothing to do message when state is Nothing', () => {
    render(Todolist, options)

    expect(screen.getByText('Il n\'y a rien à faire')).toBeTruthy()
  })

  it('should refresh final version perfected when clicking on refresh button', () => {
    render(Todolist, options)

    const refreshButton = screen.getByText('Refresh')
    refreshButton.click()

    expect(controller.history()).toEqual([{ name: 'refresh' }])
  })

  it('should display task when state is DoTask', () => {
    store.setState({ type: 'DoTask', task: 'Faire quelque chose' })
    render(Todolist, options)

    expect(screen.getByText('Faire quelque chose')).toBeTruthy()
  })

  it('should display choice between two tasks when state is ChooseTaskBetween', () => {
    store.setState({ 
      type: 'ChooseTaskBetween', 
      task1: 'Tâche A', 
      task2: 'Tâche B' 
    })
    render(Todolist, options)

    expect(screen.getByText('Tâche A')).toBeTruthy()
    expect(screen.getByText('Tâche B')).toBeTruthy()
  })


})
