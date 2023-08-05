import { createContext, useContext } from 'react'
import { type Topic } from '@/lib/topics'

export const TopicContext = createContext<Topic | undefined>(undefined)

export default function useTopicContext() {
  const topicContext = useContext(TopicContext)

  if (topicContext === undefined) {
    throw new Error('useTopicContext must be inside a Provider')
  }

  return topicContext
}
