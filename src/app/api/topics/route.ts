import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { prisma } from '@/lib/db'
import { NewTopicSchema } from '@/lib/topics'
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
        where: { isDeleted: { equals: false } },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true } },
          options: {
            select: {
              id: true,
              content: true,
              selection: { select: { id: true } },
            },
          },
          selection: { select: { userId: true, optionId: true } },
          _count: {
            select: {
              comments: { where: { isDeleted: { equals: false } } },
              selection: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      })
    } else if (sort === SORT.hot) {
      // TODO: sort by hotIndex
      topics = await prisma.topic.findMany({
        where: { isDeleted: { equals: false } },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true } },
          options: {
            select: {
              id: true,
              content: true,
              selection: { select: { id: true } },
            },
          },
          selection: { select: { userId: true, optionId: true } },
          _count: {
            select: {
              comments: { where: { isDeleted: { equals: false } } },
              selection: true,
            },
          },
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

    topics = topics.map(({ options, _count, selection, ...rest }) => {
      const optionsWithCounts = options.map(({ id, content, selection }) => ({
        id: id,
        content: content,
        count: selection.length,
      }))

      return {
        ...rest,
        options: optionsWithCounts,
        commentCount: _count.comments,
        voteCount: _count.selection,
        votedUsers: selection.reduce<{ [index: string]: number }>(
          (obj, { userId, optionId }) => {
            obj[userId] = optionId
            return obj
          },
          {}
        ),
      }
    })

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
    const { title, content, options } = NewTopicSchema.parse(body)

    const newTopic = await prisma.topic.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
        options: {
          create: [
            ...options.map((option) => ({
              content: option,
            })),
          ],
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
