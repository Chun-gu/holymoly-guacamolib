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

  const isVotedTopic = topic.votedUsers.includes(userId)

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
    <div className="flex flex-col justify-between w-[301px] h-[221px] bg-white py-[18px] px-[17px] border border-green rounded-[20px]">
      <TopicCard.Root topic={topic}>
        <Link href={`/topics/${topic.id}`}>
          <TopicCard.Title className="font-bold" />
        </Link>
        <TopicCard.Content />
        {isVotedTopic ? (
          <TopicCard.Results />
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
