import { ComponentProps } from 'react'

import useTopicContext from '../useTopicContext'

import formatDate from '@/lib/utils/formatDate'

export default function CreatedAt(props: ComponentProps<'span'>) {
  const { createdAt } = useTopicContext()

  return <span {...props}>{formatDate(createdAt, 'relative')}</span>
}
