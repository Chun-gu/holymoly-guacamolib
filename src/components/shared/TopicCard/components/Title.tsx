import useTopicContext from '../useTopicContext'
import { type ComponentProps } from 'react'

export default function Title(props: ComponentProps<'h3'>) {
  const { title } = useTopicContext()

  return <h3 {...props}>Q. {title}</h3>
}
