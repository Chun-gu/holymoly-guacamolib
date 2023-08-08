import useTopicContext from '../useTopicContext'
import { type Option } from '@/lib/topics'

type OptionsProps = {
  handleVote: (optionId: Option['id']) => void
  isVotedTopic: boolean
}

export default function Options({ handleVote, isVotedTopic }: OptionsProps) {
  const { options } = useTopicContext()

  return (
    <div className="flex justify-between">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleVote(option.id)}
          disabled={isVotedTopic}
          className="w-[128px] h-[84px] text-white bg-green rounded-[16px] text-[14px]"
        >
          {option.content}
        </button>
      ))}
    </div>
  )
}
