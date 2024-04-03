'use client'

import {
  selectStatus,
  addDraftNote,
  selectNotes,
} from '@/lib/features/notes/notes.slice'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'

const NewNoteButton = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const status = useAppSelector(selectStatus)
  const notes = useAppSelector(selectNotes)

  const handleClick = () => {
    router.push('/notepad/new')
    dispatch(addDraftNote())
  }

  return (
    <div className="w-full flex justify-center pt-[15px]">
      {status === 'loading' ? (
        <div className="w-[50px] h-[50px] animate-spin rounded-[50%] border border-solid border-t-transparent border-white-500"></div>
      ) : (
        <button
          id="new-note-button"
          onClick={handleClick}
          disabled={notes[0]?.id === 'new'}
          className="bg-purple-500 text-white p-2 w-[50px] h-[50px] rounded-[50%] text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      )}
      <Tooltip id="new-note" anchorSelect="#new-note-button" place="top">
        {notes[0]?.id === 'new' &&
          'A draft note already exists for you to edit.'}
      </Tooltip>
    </div>
  )
}

export default NewNoteButton
