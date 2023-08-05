import { client } from './topics'
import type { Comment, NewComment as NewSubComment } from '@/lib/comments'

export type SubComment = {
  id: number
  topicId: null
  author: { id: number; name: string }
  parentCommentId: number
  content: string
  createdAt: string
  isDeleted: boolean
}

export const subCommentKey = {
  all: ['subComment'] as const,
  listOf: (commentId: Comment['id']) =>
    [...subCommentKey.all, commentId] as const,
}

export async function createSubComment({
  commentId,
  newSubComment,
}: {
  commentId: Comment['id']
  newSubComment: NewSubComment
}): Promise<{ createdSubCommentId: number }> {
  const response = await client.post(
    `/api/comments/${commentId}/comments`,
    newSubComment
  )

  return response.data
}

export async function getSubComments({
  commentId,
  skip = 0,
  take = 5,
}: {
  commentId: Comment['id']
  skip?: number
  take?: number
}): Promise<SubComment[]> {
  const response = await client.get(
    `/api/comments/${commentId}/comments?skip=${skip}&take=${take}`
  )

  return response.data
}

export async function updateSubComment() {}

export async function deleteSubComment(
  subCommentId: SubComment['id']
): Promise<{ deletedSubCommentId: number }> {
  const response = await client.delete(`/api/comments/${subCommentId}`)

  return response.data
}
