import useTopicContext from '../useTopicContext'

type OptionsProps = {
  handleVote: (option: string) => void
  isVotedTopic: boolean
}

export default function Options({ handleVote, isVotedTopic }: OptionsProps) {
  const { options } = useTopicContext()

  return (
    <div>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleVote(option.id)}
          disabled={isVotedTopic}
        >
          {option.content}
        </button>
      ))}
    </div>
  )
}
