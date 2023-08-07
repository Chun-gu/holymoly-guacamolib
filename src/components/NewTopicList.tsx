'use client'

import { getTopics } from '@/lib/topics'
import { useQuery } from '@tanstack/react-query'
import NewTopicItem from './NewTopicItem'

export default function NewTopicList() {
  const {
    data: topics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics({ sort: 'new' }),
  })

  if (isLoading)
    return (
      <ul>
        <div>로딩 중...</div>
      </ul>
    )
  if (isError)
    return (
      <ul>
        <span>Error</span>
      </ul>
    )

  return (
    <ul className="flex flex-col h-[221px] gap-[12px]">
      {topics.length === 0 && <li>새로운 주제가 없어요.</li>}
      {topics.map((topic) => (
        <li key={topic.id} className=" w-full">
          <NewTopicItem topic={topic} />
        </li>
      ))}
    </ul>
  )
}
