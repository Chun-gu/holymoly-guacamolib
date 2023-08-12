'use client'

import { useDialog } from '@/components/shared/Dialog'
import formatDate from '@/lib/utils/formatDate'
import IndentIcon from 'public/indent-icon.svg'
import UserIcon from 'public/user-icon.svg'
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
      <div className="flex">
        <IndentIcon />
        <div className="flex-grow ml-2">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <UserIcon />
              <span className="text-[12px] text-green">
                {subComment.author.name}
              </span>
            </div>
            <div>
              <span className="text-[12px] text-grey-300">
                {formatDate(subComment.createdAt, 'absolute')}
              </span>
              {isMyComment && <button onClick={dialog.open}>삭제</button>}
            </div>
          </div>

          <p className="text-[10px] text-grey-800">{subComment.content}</p>
        </div>
      </div>

      <SubCommentDeleteDialog
        dialog={dialog}
        subCommentId={subComment.id}
        parentCommentId={subComment.parentCommentId}
      />
    </>
  )
}
