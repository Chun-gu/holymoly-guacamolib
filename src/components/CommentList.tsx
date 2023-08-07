'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Comment from './Comment'
import { commentKey, getComments } from '@/lib/comments'

export default function CommentList({ topicId }: { topicId: number }) {
  const [observingTargetRef, inView] = useInView()

  const {
    isLoading,
    isError,
    data: comments,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: commentKey.list(topicId),
    queryFn: ({ pageParam }) => getComments({ topicId, pageParam }),
    getNextPageParam: ({ nextPage }) => nextPage,
    keepPreviousData: true,
  })

  if (inView && hasNextPage) fetchNextPage()

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러!</div>

  return comments.pages[0].comments.length !== 0 ? (
    <ul>
      {comments.pages.map(({ comments }) =>
        comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} topicId={topicId} />
          </li>
        ))
      )}
      <li ref={observingTargetRef} />
    </ul>
  ) : null
}
