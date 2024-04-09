'use client'

import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  saveNote,
  createNote,
  selectStatus,
  Note,
  selectRedirect,
  setRedirectTo,
  updateNote,
  selectSearch,
} from '@/lib/features/notes/notes.slice'
import { selectUserId } from '@/lib/features/auth/auth.slice'
import { useRouter } from 'next/navigation'
import SavingIndicator from '@/components/SavingIndicator'
import _get from 'lodash/get'
import { Tooltip } from 'react-tooltip'

type Props = {
  note: Note
}

const NoteForm = ({ note }: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const status = useAppSelector(selectStatus)
  const userId = useAppSelector(selectUserId)
  const search = useAppSelector(selectSearch)
  const redirectTo = useAppSelector(selectRedirect)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (redirectTo) {
      dispatch(setRedirectTo(''))
      router.push(redirectTo)
    }
  }, [redirectTo, dispatch, router])

  const [error, setError] = useState('')
  const content =
    typeof note.editedContent === 'string' ? note.editedContent : note.content

  useEffect(() => {
    checkForErrors(content)

    if (
      !['search-bar', 'notepad-textarea'].includes(
        document.activeElement?.id || ''
      )
    ) {
      textareaRef.current?.focus()
      textareaRef.current?.setSelectionRange(content.length, content.length)
    }
  })

  const checkForErrors = (content: string) => {
    if (content.length < 20) {
      return setError(
        `Note must be at least 20 characters long (currently ${content.length})`
      )
    } else if (content.length > 300) {
      return setError(
        `Note must be less than 300 characters long (currently ${content.length})`
      )
    } else {
      setError('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    checkForErrors(content)
    dispatch(updateNote({ ...note, editedContent: content }))
  }

  const handleSave = () => {
    const { editedContent: content = note.content } = note
    checkForErrors(content)

    if (status !== `saving::${note.id}` && !error) {
      let action = createNote
      const payload: Note = { content, userId: userId! }

      if (note.id !== 'new') {
        payload.id = note.id
        action = saveNote
      }

      dispatch(action(payload))
    }
  }

  return (
    <div className="w-full h-full relative grid grid-cols-3 gap-0">
      <SavingIndicator isSaving={status === `saving::${note?.id ?? ''}`} />
      <div className="col-span-2">
        <textarea
          value={content}
          name="content"
          onChange={handleChange}
          className="w-full h-full text-xl p-8 pt-4 bg-black outline-none"
          placeholder="Type your note here.."
          ref={textareaRef}
          id="notepad-textarea"
        />
      </div>
      <div className="border-l border-white/10">
        <div className="m-4">
          <div className="flex justify-center">
            <button
              className="bg-purple-500 p-2.5 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              id="save-note-button"
              disabled={!!(error || status === `saving::${note.id}`)}
              onClick={handleSave}
            >
              Save Note
            </button>
          </div>
        </div>
        <Tooltip id="note-form" anchorSelect="#save-note-button" place="top">
          {error}
        </Tooltip>
      </div>
    </div>
  )
}

export default NoteForm
