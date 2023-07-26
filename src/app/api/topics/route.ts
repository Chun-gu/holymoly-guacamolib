import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/db'
import { NewTopicSchema } from '@/schemas/topic'

export async function GET() {}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const authorId = session?.user.id
    if (!authorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content } = NewTopicSchema.parse(body)

    const newTopic = await prisma.topic.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
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
