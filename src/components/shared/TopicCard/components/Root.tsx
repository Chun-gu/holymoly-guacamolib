import { TopicContext } from '../useTopicContext'
import { type Topic } from '@/lib/topics'

type RootProps = {
  children: React.ReactNode
  topic: Topic
}

export default function Root({ children, topic }: RootProps) {
  return <TopicContext.Provider value={topic}>{children}</TopicContext.Provider>
}
