import Link from 'next/link'
import FlameIcon from 'public/flame-icon.svg'
import NewIcon from 'public/new-icon.svg'
import PencilIcon from 'public/pencil-icon.svg'
import HotTopicList from '@/components/HotTopicList'
import NewTopicList from '@/components/NewTopicList'

export default function Home() {
  return (
    <main className="w-[375px] min-h-[calc(100vh-52px)]">
      <section className="mb-[49px]">
        <h2 className="flex items-end mb-[10px] h-[37px]">
          <FlameIcon />
          <span className="ml-[8px] mb-[6px] text-[20px] font-bold">
            뜨거운 주제
          </span>
        </h2>
        <HotTopicList />
      </section>
      <section>
        <h2 className="flex items-end mb-[10px] h-[37px]">
          <NewIcon className="flex items-end mb-[10px] h-[37px]" />
          <span className="ml-[8px] mb-[6px] text-[20px] font-bold">
            새로운 주제
          </span>
        </h2>
        <NewTopicList />
      </section>
      <Link
        href={'/newTopic'}
        className="flex justify-center items-center w-[115px] text-[16px] text-white bg-green p-[8px] rounded-full fixed right-[50%] bottom-[30px] translate-x-[50%]"
      >
        <PencilIcon className="mr-[4px]" />
        글쓰기
      </Link>
    </main>
  )
}
