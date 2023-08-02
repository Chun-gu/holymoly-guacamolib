import { ComponentProps } from 'react'

import useTopicContext from '../useTopicContext'

export default function Content(props: ComponentProps<'p'>) {
  const { content } = useTopicContext()

  return <p {...props}>{content}</p>
}
