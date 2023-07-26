'use client'

import { getTopics } from '@/lib/topics'
import NewTopicItem from './NewTopicItem'
import { useQuery } from '@tanstack/react-query'

export default function HotTopicList() {
  const {
    data: topics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics({ sort: 'new' }),
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <span>Error</span>

  return (
    <ul className="flex flex-col h-[221px] gap-[12px]">
      {topics.map((topic) => (
        <li key={topic.id} className=" w-full">
          <NewTopicItem topic={topic} />
        </li>
      ))}
    </ul>
  )
}
