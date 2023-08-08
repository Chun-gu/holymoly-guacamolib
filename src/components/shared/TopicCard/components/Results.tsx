import useTopicContext from '../useTopicContext'
import { type Option } from '@/lib/topics'

type Props = { votedOption: Option['id'] }

export default function Results({ votedOption }: Props) {
  const { options, voteCount } = useTopicContext()

  function calculateRate(count: Option['count']) {
    return Math.floor((count / voteCount || 0) * 100)
  }

  return (
    <div className="flex justify-between">
      {options.map((option) => (
        <div
          key={option.id}
          className="flex items-center justify-center w-[128px] h-[84px] text-white bg-green rounded-[16px] text-[14px] relative overflow-hidden text-center"
        >
          {option.content}
          <div
            className={`w-full h-full bg-black/60 absolute top-0 rounded-[16px]`}
          >
            <div
              className={`absolute bottom-0 flex justify-center items-end w-full min-h-[30px] max-h-full font-semibold text-[14px] bg-green rounded-[16px] py-1`}
              style={{ height: `${(option.count / voteCount) * 100}%` }}
            >{`${calculateRate(option.count)}% (${option.count}표)`}</div>
            {votedOption === option.id && (
              <div
                className={
                  'absolute bottom-0 w-full h-full border-[3px] border-green-light rounded-[16px]'
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
