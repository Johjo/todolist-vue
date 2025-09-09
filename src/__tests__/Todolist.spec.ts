import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import type { RenderOptions } from '@testing-library/vue'
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
  let options: RenderOptions<typeof Todolist>;

  beforeEach(() => {
    cleanup()
    controller = new ControllerForTest()

    options = {
      global: {
        provide: {
          controller: controller
        }
      }
    }
  })

  it('should display nothing to do message', () => {
    render(Todolist, options)

    expect(screen.getByText('Il n\'y a rien à faire')).toBeTruthy()
  })

  it('should refresh final version perfected when clicking on refresh button', () => {
    render(Todolist, options)

    const refreshButton = screen.getByText('Refresh')
    refreshButton.click()

    expect(controller.history()).toEqual([{ name: 'refresh' }])
  })


})
