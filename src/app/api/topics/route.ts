import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { prisma } from '@/lib/db'
import { NewTopicSchema } from '@/schemas/topic'
import { getSessionFromServer } from '../auth/getSessionFromServer'

const DEFAULT_SKIP = 0
const DEFAULT_TAKE = 5
const SORT = { new: 'new', hot: 'hot' }

// 주제 목록
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sort = searchParams.get('sort')
    const skip = Number(searchParams.get('skip') || DEFAULT_SKIP)
    const take = Number(searchParams.get('take') || DEFAULT_TAKE)

    let topics = []

    if (sort === SORT.new) {
      topics = await prisma.topic.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true } },
          options: { select: { id: true, content: true } },
          _count: {
            select: { comments: { where: { isDeleted: { equals: false } } } },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      })
    } else if (sort === SORT.hot) {
      // TODO: sort by hotIndex
      topics = await prisma.topic.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true } },
          options: { select: { id: true, content: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { id: 'desc' },
        skip: 0,
        take: 5,
      })
    } else {
      return NextResponse.json(
        { error: 'Bad Request: wrong sort' },
        { status: 400 }
      )
    }

    topics = topics.map(({ _count, ...rest }) => ({
      ...rest,
      commentCount: _count.comments,
    }))

    return NextResponse.json({ topics })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// 주제 작성
export async function POST(req: Request) {
  try {
    const session = await getSessionFromServer()
    const authorId = session?.user.id
    if (!authorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, firstOption, secondOption } =
      NewTopicSchema.parse(body)

    const newTopic = await prisma.topic.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
        options: {
          create: [{ content: firstOption }, { content: secondOption }],
        },
      },
    })

    return NextResponse.json({ createdTopicId: newTopic.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 500 })
    }

    return NextResponse.json({ error }, { status: 500 })
  }
}
