import { getSessionFromServer } from '@/app/api/auth/getSessionFromServer'
import { prisma } from '@/lib/db'
import { NewCommentSchema } from '@/lib/comments'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

type Params = { params: { topicId: string } }

const DEFAULT_SKIP = 0
const DEFAULT_TAKE = 5

// 주제의 댓글 목록
export async function GET(req: Request, { params: { topicId } }: Params) {
  try {
    const { searchParams } = new URL(req.url)
    const skip = Number(searchParams.get('skip') || DEFAULT_SKIP)
    const take = Number(searchParams.get('take') || DEFAULT_TAKE)

    const comments = await prisma.comment.findMany({
      where: { topicId: Number(topicId), isDeleted: { equals: false } },
      select: {
        id: true,
        author: { select: { id: true, name: true } },
        topicId: true,
        content: true,
        isDeleted: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// 댓글 작성
export async function POST(req: Request, { params: { topicId } }: Params) {
  try {
    const session = await getSessionFromServer()
    const authorId = session?.user.id
    if (!authorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { content } = NewCommentSchema.parse(body)

    const newComment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: { id: authorId },
        },
        topic: {
          connect: { id: Number(topicId) },
        },
      },
    })

    return NextResponse.json({ createdCommentId: newComment.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 500 })
    }

    return NextResponse.json({ error }, { status: 500 })
  }
}
