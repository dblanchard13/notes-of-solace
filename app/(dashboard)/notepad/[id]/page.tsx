'use client'

import { useAppSelector } from '@/lib/hooks'
import { selectNotes, Note } from '@/lib/features/notes/notes.slice'

import { redirect } from 'next/navigation'
import _get from 'lodash/get'
import NoteForm from '@/components/NoteForm'

type Props = {
  params: { id: string }
}

const NoteDetailPage = ({ params }: Props) => {
  const notes = useAppSelector(selectNotes)

  const note = notes.find((n: Note) => n.id === params.id)
  if (!note) redirect(`/notepad/${_get(notes, '[0].id', '')}`)

  return <NoteForm note={note} />
}

export default NoteDetailPage
