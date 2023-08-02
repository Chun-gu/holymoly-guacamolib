import { TopicResponse } from '@/lib/topics'
import { createContext, useContext } from 'react'

export const TopicContext = createContext<TopicResponse>({
  id: '',
  title: '',
  content: '',
  author: { id: '', name: '' },
  options: [
    { id: '', content: '', count: 0 },
    { id: '', content: '', count: 0 },
  ],
  voteCount: 0,
  commentCount: 0,
  createdAt: '',
  votedUsers: [''],
})

export default function useTopicContext() {
  const topicContext = useContext(TopicContext)

  if (topicContext === undefined) {
    throw new Error('useTopicContext must be inside a Provider')
  }

  return topicContext
}
