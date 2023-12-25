import Link from 'next/link'
import { TopicCard } from './shared/TopicCard'
import type { Topic } from '@/lib/topics'

type Props = { topic: Topic }

export default function NewTopicItem({ topic }: Props) {
  return (
    <div className="flex justify-between items-center w-full h-[58px] bg-white py-[16px] px-[21px] border border-green rounded-[20px]">
      <TopicCard.Root topic={topic}>
        <Link href={`/topics/${topic.id}`}>
          <TopicCard.Title className="font-semibold text-[14px]" />
        </Link>
        <div className="flex gap-3">
          <TopicCard.VoteCount className="flex items-center gap-1 font-semibold text-[14px]" />
          <TopicCard.CommentCount className="flex items-center gap-1 font-semibold text-[14px]" />
        </div>
      </TopicCard.Root>
    </div>
  )
}
