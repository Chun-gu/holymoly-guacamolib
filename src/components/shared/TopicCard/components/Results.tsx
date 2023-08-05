import useTopicContext from '../useTopicContext'
import { type Option } from '@/lib/topics'

export default function Results() {
  const { options, voteCount } = useTopicContext()

  function calculateRate(count: Option['count']) {
    return Math.floor((count / voteCount || 0) * 100)
  }

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          {option.content}
          <div>
            <div>{`${calculateRate(option.count)}% (${option.count}표)`}</div>
            <div />
          </div>
        </div>
      ))}
    </div>
  )
}
