import { describe, expect, it } from 'vitest'
import { ExternalTask, ExternalTodolistPort } from './startFvpSession'
import axios from 'axios'

class ExternalTodolistFromTodoist implements ExternalTodolistPort {
  constructor(private apiToken: string) {}

  async allActiveTasks(): Promise<ExternalTask[]> {
    try {
      const response = await axios.post('https://api.todoist.com/api/v1/sync', 
        new URLSearchParams({
          sync_token: '*',
          resource_types: '["items"]'
        }),
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      
      return response.data.items.map((item: any) => ({
        key: item.id,
        title: item.content
      }))
    } catch (error) {
      console.log('Erreur API Todoist:', error)
      return []
    }
  }
}

describe('externalTodolistFromTodoist', () => {
  it('should return a todoist todolist', async () => {
    const apiToken = process.env.TODOIST_API_TOKEN || 'test-token'
    const sut = new ExternalTodolistFromTodoist(apiToken)

    const actual = await sut.allActiveTasks()

    expect(actual).toMatchSnapshot()
  })
})
