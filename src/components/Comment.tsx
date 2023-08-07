'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import UserIcon from 'public/user-icon.svg'
import CommentDeleteDialog from '@/components/CommentDeleteDialog'
import { useDialog } from '@/components/shared/Dialog'
import formatDate from '@/lib/utils/formatDate'
import SubCommentInput from './SubCommentInput'
import SubCommentList from './SubCommentList'
import { type Topic } from '@/lib/topics'
import { type Comment } from '@/lib/comments'

type Props = { topicId: Topic['id']; comment: Comment }

export default function Comment({ comment, topicId }: Props) {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  const isMyComment = userId === comment.author.id

  const [isSubCommentOpen, setIsSubCommentOpen] = useState(false)

  function toggleSubComment() {
    setIsSubCommentOpen((prev) => !prev)
  }

  const dialog = useDialog()

  return (
    <>
      <div>
        <div>
          <UserIcon />
          {comment.author.name}
        </div>
        <div>
          <span>{formatDate(comment.createdAt, 'absolute')}</span>
          {isMyComment && <button onClick={dialog.open}>삭제</button>}
          <button onClick={toggleSubComment}>
            {isSubCommentOpen ? '"대댓글 닫기"' : '"대댓글 열기"'}
          </button>
        </div>
      </div>
      <p>{comment.content}</p>

      {isSubCommentOpen && (
        <section>
          <SubCommentInput commentId={comment.id} />
          <SubCommentList commentId={comment.id} />
        </section>
      )}

      <CommentDeleteDialog
        dialog={dialog}
        topicId={topicId}
        commentId={comment.id}
      />
    </>
  )
}
