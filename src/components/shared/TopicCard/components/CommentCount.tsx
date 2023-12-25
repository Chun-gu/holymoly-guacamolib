import useTopicContext from '../useTopicContext'

import CommentIcon from 'public/comment-icon.svg'
import shortenNumber from '@/lib/utils/shortenNumber'
import { type ComponentProps } from 'react'

export default function CommentCount({ className }: ComponentProps<'div'>) {
  const { commentCount } = useTopicContext()

  return (
    <div className={className}>
      <CommentIcon />
      <span>{shortenNumber(commentCount || 0)}</span>
    </div>
  )
}
