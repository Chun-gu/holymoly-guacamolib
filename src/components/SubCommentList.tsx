'use client'

import { useQuery } from '@tanstack/react-query'
import SubCommentItem from './SubCommentItem'
import { getSubComments, subCommentKey } from '@/lib/subComments'
import type { Comment } from '@/lib/comments'

type Props = { commentId: Comment['id'] }

export default function SubCommentList({ commentId }: Props) {
  const {
    isLoading,
    isError,
    data: subComments,
  } = useQuery({
    queryKey: subCommentKey.listOf(commentId),
    queryFn: () => getSubComments({ commentId }),
  })

  if (isLoading) return <div>로딩 중입니다...</div>
  if (isError) return <div>에러!</div>

  return (
    <ul>
      {subComments.map((subComment) => (
        <li key={subComment.id}>
          <SubCommentItem subComment={subComment} />
        </li>
      ))}
    </ul>
  )
}
