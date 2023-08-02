import useTopicContext from '../useTopicContext'

export default function Results() {
  const { options, voteCount } = useTopicContext()

  function calculateRate(option: (typeof options)[0]) {
    return Math.floor((option.count / voteCount || 0) * 100)
  }

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          {option.content}
          <div>
            <div>{`${calculateRate(option)}% (${option.count}표)`}</div>
            <div />
          </div>
        </div>
      ))}
    </div>
  )
}
