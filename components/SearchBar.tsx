'use client'

import {
  useState,
  useCallback,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react'
import useDebounce from '@/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchNotes,
  setSearch,
  selectSearch,
} from '@/lib/features/notes/notes.slice'
import { selectUserId, determineUserId } from '@/lib/features/auth/auth.slice'

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)
  const search = useAppSelector(selectSearch)

  useEffect(() => {
    if (!userId) {
      dispatch(determineUserId())
    }
  }, [dispatch, userId])

  const searchNotes = (search: string) => {
    if (!userId) return
    dispatch(fetchNotes({ search, userId: userId! }))
  }
  useDebounce(() => searchNotes(search), [search], 300)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchNotes(search)
    }
  }

  return (
    <div className="absolute left-[15px] top-[15px] w-[300px]">
      <input
        id="search-bar"
        className="w-full p-1 outline-none bg-black border-b-2 border-white/10 text-xl"
        type="text"
        value={search}
        placeholder="Search your notes..."
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar
