import { prisma } from '@/lib/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'
import { NOT_FOUND_ERROR_CODE_FROM_PRISMA } from '../../constants'

type Params = { params: { topicId: string } }

// 주제 상세 정보
export async function GET(req: Request, { params: { topicId } }: Params) {
  try {
    const foundTopic = await prisma.topic.findUniqueOrThrow({
      where: { id: Number(topicId) },
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
    })

    const optionsWithCounts = foundTopic.options.map((option) => ({
      id: option.id,
      content: option.content,
      count: option.selection.length,
    }))

    const { _count, selection, ...rest } = foundTopic
    const topic = {
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

    return NextResponse.json(topic, { status: 200 })
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

// 주제 삭제
export async function DELETE(req: Request, { params: { topicId } }: Params) {
  try {
    const deletedTopic = await prisma.topic.update({
      where: { id: Number(topicId) },
      data: { isDeleted: true },
    })

    return NextResponse.json(
      { deletedTopicId: deletedTopic.id },
      { status: 200 }
    )
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
