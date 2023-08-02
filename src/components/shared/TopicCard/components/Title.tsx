import { ComponentProps } from 'react'

import useTopicContext from '../useTopicContext'

export default function Title(props: ComponentProps<'h3'>) {
  const { title } = useTopicContext()

  return <h3 {...props}>Q. {title}</h3>
}
