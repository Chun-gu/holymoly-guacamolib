import TopicDetail from '@/components/TopicDetail'
import CommentList from '@/components/CommentList'
import CommentInput from '@/components/CommentInput'

type Params = { params: { topicId: string } }

// TODO: change to SSR or SSG for metadata
// async function getTopic(topicId: string): Promise<Topic> {
//   const res = await fetch(`${process.env.API_URL}/api/topics/${topicId}`, {
//     cache: 'no-store',
//   })
//   if (!res.ok) {
//     throw new Error('Failed to fetch')
//   }
//   const data: Topic = await res.json()
//   return data
// }

export default async function TopicDetailPage({ params: { topicId } }: Params) {
  const numericTopicId = Number(topicId)

  return (
    <main className="w-[375px] min-h-[calc(100vh-52px)] p-[20px]">
      <section className="mb-[54px]">
        <TopicDetail topicId={numericTopicId} />
      </section>
      <section>
        <h2 className="text-[18px] text-grey-800 font-semibold mb-[16px]">
          댓글
        </h2>
        <CommentInput topicId={numericTopicId} />
        <CommentList topicId={numericTopicId} />
      </section>
    </main>
  )
}
