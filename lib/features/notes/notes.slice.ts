import { createAppSlice } from '@/lib/createAppSlice'

import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteNote, getNotes, patchNote, saveNoteToApi } from './notes.api'

export interface NotesSliceState {
  notes: Note[]
  status: 'idle' | 'loading' | 'failed' | `saving::${string}`
  search: string
  redirectTo?: string
}

export interface Note {
  id?: string
  content: string
  editedContent?: string
  createdAt?: number
  updatedAt?: number
  userId?: string
}

const initialState: NotesSliceState = {
  notes: [],
  status: 'idle',
  search: '',
}

const loading = (state: NotesSliceState) => {
  state.status = 'loading'
}
const saving = (state: NotesSliceState, action: { meta: { arg: Note } }) => {
  state.status = `saving::${action.meta.arg.id}`
}
const rejected = (state: NotesSliceState) => {
  state.status = 'failed'
}

export const notesSlice = createAppSlice({
  name: 'notes',
  initialState,

  reducers: (create) => ({
    fetchNotes: create.asyncThunk(getNotes, {
      pending: loading,
      rejected,
      fulfilled: (state, action) => {
        state.status = 'idle'
        state.notes = action.payload.notes
        state.search = action.payload.search
      },
    }),

    createNote: create.asyncThunk(
      async ({ userId, content }) => {
        const note = await saveNoteToApi({
          content,
          userId,
        })
        return note
      },
      {
        pending: loading,
        rejected,
        fulfilled: (state, { payload }) => {
          state.status = 'idle'
          if (state.notes[0].id === 'new') {
            state.notes.shift()
          }
          state.notes.unshift(payload)
          state.redirectTo = `/notepad/${payload.id}`
        },
      }
    ),

    saveNote: create.asyncThunk(patchNote, {
      pending: saving,
      rejected,
      fulfilled: (state, { payload }) => {
        state.status = 'idle'
        const index = state.notes.findIndex((note) => note.id === payload.id)
        state.notes[index] = payload
      },
    }),

    removeNote: create.asyncThunk(deleteNote, {
      pending: loading,
      rejected,
      fulfilled: (state, { payload }) => {
        state.status = 'idle'
        state.notes = state.notes.filter((note) => note.id !== payload)
      },
    }),

    addDraftNote: create.reducer((state) => {
      if (state.notes[0]?.id === 'new') return
      state.notes.unshift({ content: '', id: 'new' })
    }),

    updateNote: create.reducer((state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      )
      state.notes[index] = action.payload
    }),

    setRedirectTo: create.reducer((state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload
    }),

    setSearch: create.reducer((state, action: PayloadAction<string>) => {
      state.search = action.payload
    }),
  }),

  selectors: {
    selectNotes: (state) => state.notes,
    selectStatus: (state) => state.status,
    selectRedirect: (state) => state.redirectTo,
    selectSearch: (state) => state.search,
  },
})

export const {
  updateNote,
  createNote,
  saveNote,
  removeNote,
  fetchNotes,
  setRedirectTo,
  addDraftNote,
  setSearch,
} = notesSlice.actions

export const { selectNotes, selectStatus, selectRedirect, selectSearch } =
  notesSlice.selectors
