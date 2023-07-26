import axios from 'axios'
import { type NewTopic } from '@/schemas/topic'

export const client = axios.create({
  baseURL: process.env.API_URL,
})

export async function createTopic(
  topic: NewTopic
): Promise<{ createdTopicId: string }> {
  const response = await client.post(`/api/topics`, { ...topic })

  return response.data
}
