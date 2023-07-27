import { prisma } from '@/lib/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

type Params = { params: { topicId: string } }

const NOT_FOUND_ERROR_CODE_FROM_PRISMA = 'P2025'

export async function GET(req: Request, { params: { topicId } }: Params) {
  try {
    const topic = await prisma.topic.findUniqueOrThrow({
      where: { id: Number(topicId) },
    })

    return NextResponse.json({ topic }, { status: 200 })
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
