'use client'

import {
  addDraftNote,
  selectNotes,
  selectRedirect,
  setRedirectTo,
} from '@/lib/features/notes/notes.slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const NotePadPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const notes = useAppSelector(selectNotes)
  const redirectTo = useAppSelector(selectRedirect)

  useEffect(() => {
    if (redirectTo) {
      dispatch(setRedirectTo(''))
      router.push(redirectTo)
    } else if (notes.length) {
      router.push(`/notepad/${notes[0].id}`)
    }
  }, [redirectTo, notes, router, dispatch])
}

export default NotePadPage
