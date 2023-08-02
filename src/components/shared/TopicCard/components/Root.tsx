import { TopicResponse } from '@/lib/topics'
import { TopicContext } from '../useTopicContext'

type RootProps = {
  children: React.ReactNode
  topic: TopicResponse
}

export default function Root({ children, topic }: RootProps) {
  return <TopicContext.Provider value={topic}>{children}</TopicContext.Provider>
}
