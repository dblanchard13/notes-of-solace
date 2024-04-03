import { createAppSlice } from '@/lib/createAppSlice'

export interface NotesSliceState {
  userId?: string | null
}

const initialState: NotesSliceState = {
  userId: null,
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,

  reducers: (create) => ({
    determineUserId: create.reducer((state) => {
      let userId = localStorage.getItem('NOTES_OF_SOLACE__userId')
      if (!userId) {
        userId = crypto.randomUUID()
        localStorage.setItem('NOTES_OF_SOLACE__userId', userId)
      }
      state.userId = userId
    }),
  }),

  selectors: {
    selectUserId: (state) => state.userId,
  },
})

export const { determineUserId } = authSlice.actions

export const { selectUserId } = authSlice.selectors
