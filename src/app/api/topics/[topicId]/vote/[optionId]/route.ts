import { getSessionFromServer } from '@/app/api/auth/getSessionFromServer'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

type Params = { params: { topicId: string; optionId: string } }

export async function POST(
  req: Request,
  { params: { topicId, optionId } }: Params
) {
  try {
    const session = await getSessionFromServer()
    const userId = session?.user.id
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const targetTopic = await prisma.selection.findFirst({
      where: { AND: [{ userId }, { topicId: Number(topicId) }] },
    })

    const votedTopic = await prisma.selection.upsert({
      where: { id: targetTopic?.id || 0 },
      update: { optionId: Number(optionId) },
      create: {
        user: { connect: { id: userId } },
        topic: { connect: { id: Number(topicId) } },
        option: { connect: { id: Number(optionId) } },
      },
    })

    return NextResponse.json({ votedTopicId: votedTopic.id })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
