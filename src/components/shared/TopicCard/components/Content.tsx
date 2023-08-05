import useTopicContext from '../useTopicContext'
import { type ComponentProps } from 'react'

export default function Content(props: ComponentProps<'p'>) {
  const { content } = useTopicContext()

  return <p {...props}>{content}</p>
}
