'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  selectNotes,
  fetchNotes,
  removeNote,
  Note,
  selectSearch,
} from '@/lib/features/notes/notes.slice'
import NewNoteButton from '@/components/NewNoteButton'
import { determineUserId } from '@/lib/features/auth/auth.slice'
import { selectUserId } from '@/lib/features/auth/auth.slice'
import UnsavedChangesIndicator from './UnsavedChangesIndicator'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const NoteList = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const notes = useAppSelector(selectNotes)
  const search = useAppSelector(selectSearch)
  const userId = useAppSelector(selectUserId)
  const { id: selectedNoteId } = useParams()

  useEffect(() => {
    if (!userId) {
      dispatch(determineUserId())
    } else {
      dispatch(fetchNotes({ userId }))
    }
  }, [dispatch, userId])

  const deleteNote = (note: Note) => {
    dispatch(removeNote(note))
  }

  const handleListItemClick = (id: string) => {
    router.push(`/notepad/${id}`)
  }

  const listItemStyles = `text-xl my-4 flex flex-row justify-between p-4 border rounded-2xl pointer relative cursor-pointer`

  return (
    <div className="border-r border-white/10">
      <NewNoteButton />

      {search && !notes.length && <p className="p-5 py-8">No notes found...</p>}

      <ul className="overflow-y-scroll h-[calc(100vh-125px)] px-4 hide-scrollbar">
        {notes.map((note: Note) => (
          <li
            key={note.id}
            className={`${listItemStyles} ${
              selectedNoteId === note.id
                ? 'border-purple-500 border-2'
                : 'border-white/10'
            }`}
            onClick={handleListItemClick.bind(null, note.id!)}
          >
            <UnsavedChangesIndicator note={note} />
            <Link className="w-4/5 pr-1" href={`/notepad/${note.id}`}>
              <div className="text-ellipsis text-nowrap overflow-hidden">
                {typeof note.editedContent === 'string'
                  ? note.editedContent
                  : note.content}
                {'\u00A0'}
              </div>
              {note.id !== 'new' && (
                <div className="text-xs text-ellipsis text-nowrap overflow-hidden">
                  saved {dayjs(note.updatedAt).fromNow()}
                </div>
              )}
            </Link>

            <button
              disabled={note.id === 'new'}
              className="border-l-2 border-white pl-4 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={deleteNote.bind(null, note)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList
