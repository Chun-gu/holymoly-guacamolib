import useTopicContext from '../useTopicContext'

import VoteIcon from 'public/vote-icon.svg'
import shortenNumber from '@/lib/utils/shortenNumber'
import { ComponentProps } from 'react'

export default function VoteCount({ className }: ComponentProps<'div'>) {
  const { voteCount } = useTopicContext()

  return (
    <div {...{ className }}>
      <VoteIcon />
      <span>{shortenNumber(voteCount)}</span>
    </div>
  )
}
