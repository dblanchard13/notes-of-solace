import { Note } from './notes.slice'

export const getNotes = async ({ search = '', userId = '' }) => {
  const response = await fetch(`/api/notes?search=${search}&userId=${userId}`)
  const result: { data: Note[] } = await response.json()
  return { notes: result.data, search }
}

export const saveNoteToApi = async (note: Note) => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  const result: { data: Note } = await response.json()
  return result.data
}

export const patchNote = async (note: Note) => {
  const response = await fetch(`/api/notes/${note.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates: note }),
  })

  const result: { data: Note } = await response.json()
  return result.data
}

export const deleteNote = async (note: Note) => {
  const response = await fetch(`/api/notes/${note.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ delete: note }),
  })

  const result: { data: { id: string } } = await response.json()
  return result.data.id
}
