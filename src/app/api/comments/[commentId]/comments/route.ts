import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/db'
import { NewSubCommentSchema } from '@/schemas/subComment'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Params } from '../route'

// 대댓글 작성
export async function POST(req: Request, { params: { commentId } }: Params) {
  try {
    const session = await getServerSession(authOptions)
    const authorId = session?.user.id
    if (!authorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { content } = NewSubCommentSchema.parse(body)

    const newSubComment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: { id: authorId },
        },
        parentComment: {
          connect: { id: Number(commentId) },
        },
      },
    })

    return NextResponse.json({ createdSubCommentId: newSubComment.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 500 })
    }

    return NextResponse.json({ error }, { status: 500 })
  }
}
