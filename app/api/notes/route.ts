import { db } from '@/db/client'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const userId = searchParams.get('userId')

  const findArgs: Prisma.NoteFindManyArgs = {
    orderBy: [{ createdAt: 'desc' }],
    where: { userId: userId!, deletedAt: null },
  }

  if (search) {
    findArgs.where!.OR = search
      .split(' ')
      .reduce((orConditions: Prisma.NoteWhereInput[], term) => {
        if (!!term.trim()) {
          orConditions.push({
            content: { contains: term, mode: 'insensitive' },
          })
        }
        return orConditions
      }, [])
  }

  const notes = await db.note.findMany(findArgs)

  return NextResponse.json({ data: notes })
}

export const POST = async (request: Request) => {
  const body = await request.json()
  const createArgs: Prisma.NoteCreateArgs = {
    data: {
      ...body,
    },
  }

  const note = await db.note.create(createArgs)

  return NextResponse.json({ data: note })
}
