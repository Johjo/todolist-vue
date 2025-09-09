/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import dotenv from 'dotenv'
import { ExternalTodolistFromTodoist } from '../../adapters/ExternalTodolistFromTodoist'

dotenv.config()

describe('externalTodolistFromTodoist', () => {
  it('should return a todoist todolist', async () => {
    const apiToken = process.env.TODOIST_API_TOKEN || 'no-token'
    const sut = new ExternalTodolistFromTodoist(apiToken)

    const actual = await sut.allActiveTasks()

    expect(actual).toMatchSnapshot()
  })
})