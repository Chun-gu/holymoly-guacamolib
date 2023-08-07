'use client'

import { getTopics, topicKeys } from '@/lib/topics'
import HotTopicItem from './HotTopicItem'
import { useQuery } from '@tanstack/react-query'

export default function HotTopicList() {
  const {
    data: topics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: topicKeys.hot,
    queryFn: () => getTopics({ sort: 'hot' }),
    suspense: true,
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
    <ul className="flex h-[221px] gap-[12px] overflow-x-scroll hide-scrollbar">
      {topics.length === 0 && <li>뜨거운 주제가 없어요.</li>}
      {topics.map((topic) => (
        <li key={topic.id} className="flex justify-center items-center w-full">
          <HotTopicItem topic={topic} />
        </li>
      ))}
    </ul>
  )
}
