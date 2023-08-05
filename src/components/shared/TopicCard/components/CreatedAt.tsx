import useTopicContext from '../useTopicContext'
import formatDate from '@/lib/utils/formatDate'
import { type ComponentProps } from 'react'

export default function CreatedAt(props: ComponentProps<'span'>) {
  const { createdAt } = useTopicContext()

  return <span {...props}>{formatDate(createdAt, 'relative')}</span>
}
