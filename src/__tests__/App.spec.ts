import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import type { ControllerPort } from '@/types/ControllerPort'

type History = { name: string }

class ControllerForTest implements ControllerPort {
  _history : History[] = []

  history()  {
    return this._history
  }

  refresh() {
    this._history.push({name: "refresh"})
  }
}

describe('App', () => {
  it('mounts renders properly', () => {
    setActivePinia(createPinia())
    const controller = new ControllerForTest();
    const wrapper = mount(App, {
      global: {
        provide: {
          controller: controller
        }
      }
    })
    expect(wrapper.text()).toContain('Il n\'y a rien à faire')
  })
})
