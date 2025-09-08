import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Todolist from '@/components/Todolist.vue'

describe('Todolist', () => {
  it('should display hello world', () => {
    render(Todolist)

    expect(screen.getByText('hello world')).toBeTruthy()
  })
})
