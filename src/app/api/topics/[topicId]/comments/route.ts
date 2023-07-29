import { getSessionFromServer } from '@/app/api/auth/getSessionFromServer'
import { prisma } from '@/lib/db'
import { NewCommentSchema } from '@/schemas/comment'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

type Params = { params: { topicId: string } }

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
