import { z } from 'zod'
import { client } from './topics'
import type { Topic } from './topics'

export type Comment = {
  id: number
  author: { id: string; name: string }
  topicId: number
  content: string
  createdAt: string
  isDeleted: boolean
}

export const NewCommentSchema = z.object({ content: z.string() })

export type NewComment = z.infer<typeof NewCommentSchema>

export const commentKey = {
  all: ['comments'] as const,
  list: (topicId: Topic['id']) => [...commentKey.all, topicId],
}

export async function createComment({
  topicId,
  newComment,
}: {
  topicId?: Topic['id']
  newComment: NewComment
}): Promise<{ createdCommentId: string }> {
  const response = await client.post(
    `/api/topics/${topicId}/comments`,
    newComment
  )

  return response.data
}

export async function getComments({
  topicId,
  pageParam = 1,
}: {
  topicId: Topic['id']
  pageParam: number
}): Promise<{ comments: Comment[]; nextPage: number | undefined }> {
  const TAKE = 10
  const skip = (pageParam - 1) * TAKE

  const { data } = await client.get(
    `/api/topics/${topicId}/comments?skip=${skip}&take=${TAKE}`
  )
  const nextPage = data.length === TAKE ? pageParam + 1 : undefined

  return { comments: data, nextPage }
}

export async function updateComment() {}

export async function deleteComment(
  commentId: Comment['id']
): Promise<{ deletedCommentId: number }> {
  const response = await client.delete(`/api/comments/${commentId}`)

  return response.data
}
