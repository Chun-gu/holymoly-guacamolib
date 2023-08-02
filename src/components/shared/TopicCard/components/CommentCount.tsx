import useTopicContext from '../useTopicContext'

import CommentIcon from 'public/comment-icon.svg'
import shortenNumber from '@/lib/utils/shortenNumber'
import { ComponentProps } from 'react'

export default function CommentCount({ className }: ComponentProps<'div'>) {
  const topic = useTopicContext()

  return (
    <div {...{ className }}>
      <CommentIcon />
      <span>{shortenNumber(topic?.commentCount || 0)}</span>
    </div>
  )
}
