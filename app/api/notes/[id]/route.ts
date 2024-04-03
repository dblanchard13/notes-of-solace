import { NextResponse } from 'next/server'
import { db } from '@/db/client'

type Context = {
  params: { id: string }
}

export const DELETE = async (request: Request, { params }: Context) => {
  const { delete: note } = await request.json()
  await db.note.update({
    data: { deletedAt: new Date() },
    where: { id: params.id, userId: note.userId },
  })
  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request: Request, { params }: Context) => {
  const { updates } = await request.json()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const updatedNote = await db.note.update({
    where: { id: params.id, userId: updates.userId },
    data: { ...updates, updatedAt: new Date() },
  })

  return NextResponse.json({ data: updatedNote })
}
