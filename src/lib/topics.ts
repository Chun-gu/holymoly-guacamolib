import axios from 'axios'
import { z } from 'zod'

export const client = axios.create({
  baseURL: process.env.API_URL,
})

export type Topic = {
  id: number
  title: string
  content: string
  author: { id: string; name: string }
  options: Array<Option>
  commentCount: number
  voteCount: number
  votedUsers: { [key: string]: Option['id'] }
  createdAt: string
}

export type Option = { id: number; content: string; count: number }

export const NewTopicSchema = z.object({
  title: z.string(),
  content: z.string(),
  options: z.array(z.string()).length(2),
})

export type NewTopic = z.infer<typeof NewTopicSchema>

type Sort = 'new' | 'hot'

export const topicKeys = {
  all: ['topics'] as const,
  hot: ['topics', 'hot'] as const,
  new: ['topics', 'new'] as const,
  topic: (id: number) => [...topicKeys.all, id] as const,
  sort: (sort: Sort) => ['topics', { sort }] as const,
  lists: () => [...topicKeys.all, 'list'] as const,
  list: (filters: string) => [...topicKeys.lists(), { filters }] as const,
  details: () => [...topicKeys.all, 'detail'] as const,
}

export async function getTopics({
  sort,
  skip = 0,
  take = 5,
}: {
  sort: Sort
  skip?: number
  take?: number
}): Promise<Topic[]> {
  const response = await client.get(
    `/api/topics?sort=${sort}&skip=${skip}&take=${take}`
  )

  return response.data.topics
}

export async function getTopic(topicId: Topic['id']): Promise<Topic> {
  const response = await client.get(`/api/topics/${topicId}`)

  return response.data
}

export async function createTopic(
  newTopic: NewTopic
): Promise<{ createdTopicId: number }> {
  const response = await client.post(`/api/topics`, newTopic)

  return response.data
}

export async function deleteTopic(topicId: Topic['id']) {
  const response = await client.delete(`/api/topics/${topicId}`)

  return response.data
}

export async function vote({
  topicId,
  optionId,
}: {
  topicId: Topic['id']
  optionId: Option['id']
}): Promise<{ votedTopicId: string }> {
  const response = await client.post(`/api/topics/${topicId}/vote/${optionId}`)

  return response.data
}
