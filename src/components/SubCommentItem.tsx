'use client'

import { useDialog } from '@/components/shared/Dialog'
import formatDate from '@/lib/utils/formatDate'
import IndentIcon from 'public/indent-icon.svg'
import SubCommentDeleteDialog from './SubCommentDeleteDialog'
import type { SubComment } from '@/lib/subComments'
import { useSession } from 'next-auth/react'

type Props = { subComment: SubComment }

export default function SubCommentItem({ subComment }: Props) {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  const isMyComment = userId === subComment.author.id

  const dialog = useDialog()

  return (
    <>
      <div>
        <IndentIcon />
        <span>{subComment.author.name}</span>
        <div>
          <span>{formatDate(subComment.createdAt, 'absolute')}</span>
          {isMyComment && <button onClick={dialog.open}>삭제</button>}
        </div>
      </div>
      <p>{subComment.content}</p>

      <SubCommentDeleteDialog
        dialog={dialog}
        subCommentId={subComment.id}
        parentCommentId={subComment.parentCommentId}
      />
    </>
  )
}
