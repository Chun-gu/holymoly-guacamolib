import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { TopicCard } from './shared/TopicCard'
import { queryClient } from './Providers'
import { useMutation } from '@tanstack/react-query'
import { topicKeys, vote } from '@/lib/topics'
import type { Topic } from '@/lib/topics'

type Props = { topic: Topic }

export default function HotTopicItem({ topic }: Props) {
  const session = useSession()
  const userId = session?.data?.user.id || ''

  const isVotedTopic = Object.keys(topic.votedUsers).includes(userId)
  const votedOption = topic.votedUsers[userId]

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries(topicKeys.hot)
    },
  })

  function handleVote(optionId: number) {
    voteMutation.mutate({ topicId: topic.id, optionId })
  }

  return (
    <div className="flex flex-col justify-between w-[300px] h-[226px] bg-white py-[20px] px-[16px] border border-green rounded-[20px]">
      <TopicCard.Root topic={topic}>
        <div>
          <Link href={`/topics/${topic.id}`}>
            <TopicCard.Title className="font-semibold text-[14px] mb-[11px]" />
          </Link>
          <TopicCard.Content className="text-[12px] font-semibold leading-loose mb-[19px] line-clamp-2" />
        </div>
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
  )
}
