'use client'

import { useSession } from 'next-auth/react'
import ShareIcon from 'public/share-icon.svg'
import { queryClient } from './Providers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDialog } from '@/components/shared/Dialog'
import { TopicCard } from '@/components/shared/TopicCard'
import TopicDeleteDialog from '@/components/TopicDeleteDialog'
import { topicKeys, getTopic, vote } from '@/lib/topics'
import type { Topic } from '@/lib/topics'

type Props = { topicId: Topic['id'] }

export default function TopicDetail({ topicId }: Props) {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  const dialog = useDialog()

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries(topicKeys.topic(topicId))
    },
  })

  function handleVote(optionId: number) {
    voteMutation.mutate({ topicId, optionId })
  }

  const {
    isLoading,
    isError,
    data: topic,
  } = useQuery({
    queryKey: topicKeys.topic(topicId),
    queryFn: () => getTopic(topicId),
  })

  if (isLoading) return <div>로딩 중..</div>
  if (isError) return <div>에러 발생</div>

  const isMyTopic = userId === topic.author.id
  const isVotedTopic = Object.keys(topic.votedUsers || {}).includes(userId)
  const votedOption = topic.votedUsers[userId]

  return (
    <>
      <div className="py-[14px] px-[20px] bg-white border-[1px] border-green rounded-[20px]">
        <TopicCard.Root topic={topic}>
          <TopicCard.Title className="text-[18px] font-semibold" />
          <div className="flex justify-between mb-[14px]">
            <TopicCard.CreatedAt className="text-[13px] text-grey-700" />
            <div>
              {isMyTopic && <button onClick={dialog.open}>삭제</button>}
              <button>
                <ShareIcon />
              </button>
            </div>
          </div>
          <TopicCard.Content className="text-[12px] text-grey-800 leading-loose mb-[28px]" />

          {isVotedTopic ? (
            <TopicCard.Results votedOption={votedOption} />
          ) : (
            <TopicCard.Options
              isVotedTopic={isVotedTopic}
              handleVote={handleVote}
            />
          )}
        </TopicCard.Root>
      </div>

      <TopicDeleteDialog dialog={dialog} topicId={topicId} />
    </>
  )
}
