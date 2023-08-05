import useTopicContext from '../useTopicContext'

import VoteIcon from 'public/vote-icon.svg'
import shortenNumber from '@/lib/utils/shortenNumber'
import { type ComponentProps } from 'react'

export default function VoteCount({ className }: ComponentProps<'div'>) {
  const { voteCount } = useTopicContext()

  return (
    <div className={className}>
      <VoteIcon />
      <span>{shortenNumber(voteCount)}</span>
    </div>
  )
}
