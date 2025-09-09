import { key } from 'piqure'
import type { TaskRepositoryPort } from '../domain/ports/TaskRepositoryPort'
import type { FvpRepositoryPort } from '../domain/ports/FvpRepositoryPort'
import type { ExternalTodolistPort } from '../domain/ports/ExternalTodolistPort'

export const TASK_REPOSITORY_KEY = key<TaskRepositoryPort>('TaskRepository')
export const FVP_REPOSITORY_KEY = key<FvpRepositoryPort>('FvpRepository')
export const EXTERNAL_TODOLIST_KEY = key<ExternalTodolistPort>('ExternalTodolist')