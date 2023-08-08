'use client'

import { getInfiniteTopics, topicKeys } from '@/lib/topics'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import NewTopicItem from './NewTopicItem'

export default function NewTopicList() {
  const [observingTargetRef, inView] = useInView()

  const {
    isLoading,
    isError,
    data: topics,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: topicKeys.new,
    queryFn: ({ pageParam }) => getInfiniteTopics({ sort: 'new', pageParam }),
    getNextPageParam: ({ nextPage }) => nextPage,
    keepPreviousData: true,
  })

  if (inView && hasNextPage) fetchNextPage()

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

  return topics.pages[0].topics.length !== 0 ? (
    <ul className="flex flex-col h-[221px] gap-[12px]">
      {topics.pages.length === 0 && <li>새로운 주제가 없어요.</li>}
      {topics.pages.map(({ topics }) => {
        console.log(topics)
        return [...topics].map((topic) => (
          <li key={topic.id} className="w-full">
            <NewTopicItem topic={topic} />
          </li>
        ))
      })}
      <li ref={observingTargetRef} />
    </ul>
  ) : null
}
