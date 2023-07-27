import axios from 'axios'
import { type NewTopic } from '@/schemas/topic'
import { type Topic } from '@prisma/client'

export const client = axios.create({
  baseURL: process.env.API_URL,
})

export async function getTopics({
  sort,
  skip = 0,
  take = 5,
}: {
  sort: string
  skip?: number
  take?: number
}): Promise<Topic[]> {
  const response = await client.get(
    `/api/topics?sort=${sort}&skip=${skip}&take=${take}`
  )

  return response.data.topics
}

export async function getTopic(topicId: string): Promise<Topic> {
  const response = await client.get(`/api/topics/${topicId}`)

  return response.data.topic
}

export async function createTopic(
  topic: NewTopic
): Promise<{ createdTopicId: string }> {
  const response = await client.post(`/api/topics`, { ...topic })

  return response.data
}
