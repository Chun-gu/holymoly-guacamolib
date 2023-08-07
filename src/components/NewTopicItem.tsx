import Link from 'next/link'
import { TopicCard } from './shared/TopicCard'
import type { Topic } from '@/lib/topics'

type Props = { topic: Topic }

export default function NewTopicItem({ topic }: Props) {
  return (
    <div className="flex justify-between items-center w-full h-[100px] bg-white py-[18px] px-[17px] border border-green rounded-[20px]">
      <TopicCard.Root topic={topic}>
        <Link href={`/topics/${topic.id}`}>
          <TopicCard.Title className="font-bold" />
        </Link>
        <div className="flex gap-2">
          <TopicCard.VoteCount className="flex items-center gap-1" />
          <TopicCard.CommentCount className="flex items-center gap-1" />
        </div>
      </TopicCard.Root>
    </div>
  )
}
