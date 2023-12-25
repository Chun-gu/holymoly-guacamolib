'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import UserIcon from 'public/user-icon.svg'
import CommentIcon from 'public/comment-icon.svg'
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
      <div className="flex justify-between">
        <div className="flex gap-1">
          <UserIcon />
          <span className="text-[12px] text-green">{comment.author.name}</span>
        </div>
        <div>
          <span className="text-[12px] text-grey-300">
            {formatDate(comment.createdAt, 'absolute')}
          </span>
          {isMyComment && <button onClick={dialog.open}>삭제</button>}
        </div>
      </div>

      <p className="text-[10px] text-grey-800">{comment.content}</p>

      <div className="flex justify-end">
        <button onClick={toggleSubComment} className="justify-end">
          <CommentIcon />
        </button>
      </div>

      {isSubCommentOpen && (
        <section className="my-[6px]">
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
