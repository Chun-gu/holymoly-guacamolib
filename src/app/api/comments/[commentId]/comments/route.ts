import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/db'
import { NewSubCommentSchema } from '@/schemas/subComment'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Params } from '../route'

const DEFAULT_SKIP = 0
const DEFAULT_TAKE = 5

// 댓글의 대댓글 목록
export async function GET(req: Request, { params: { commentId } }: Params) {
  try {
    const { searchParams } = new URL(req.url)
    const skip = Number(searchParams.get('skip') || DEFAULT_SKIP)
    const take = Number(searchParams.get('take') || DEFAULT_TAKE)

    const subComments = await prisma.comment.findMany({
      where: { parentCommentId: Number(commentId) },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })

    return NextResponse.json(subComments)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

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
