import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NOT_FOUND_ERROR_CODE_FROM_PRISMA } from '../../constants'

export type Params = { params: { commentId: string } }

// 댓글 수정
export async function PUT(req: Request, { params: { commentId } }: Params) {}

// 댓글 삭제
export async function DELETE(req: Request, { params: { commentId } }: Params) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    })

    return NextResponse.json({ deletedCommentId: deletedComment.id })
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === NOT_FOUND_ERROR_CODE_FROM_PRISMA
    ) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json({ error }, { status: 500 })
  }
}
