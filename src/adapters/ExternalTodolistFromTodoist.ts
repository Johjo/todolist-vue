import type { ExternalTask } from '../domain/entities/ExternalTask'
import type { ExternalTodolistPort } from '../domain/ports/ExternalTodolistPort'
import axios from 'axios'

export class ExternalTodolistFromTodoist implements ExternalTodolistPort {
  constructor(private apiToken: string) {
  }

  async allActiveTasks(): Promise<ExternalTask[]> {
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

    return response.data.items.map((item: { id: string, content: string }) => ({
      key: item.id,
      title: item.content
    }))
  }
}