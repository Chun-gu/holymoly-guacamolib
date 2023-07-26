'use client'

import { getTopics } from '@/lib/topics'
import HotTopicItem from './HotTopicItem'
import { useQuery } from '@tanstack/react-query'

export default function HotTopicList() {
  const {
    data: topics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics({ sort: 'hot' }),
    suspense: true,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <span>Error</span>

  return (
    <ul className="flex h-[221px] gap-[12px] overflow-x-scroll hide-scrollbar">
      {topics.map((topic) => (
        <li key={topic.id} className="flex justify-center items-center w-full">
          <HotTopicItem topic={topic} />
        </li>
      ))}
    </ul>
  )
}
