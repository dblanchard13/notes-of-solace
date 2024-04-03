import { Note, selectStatus } from '@/lib/features/notes/notes.slice'
import { useAppSelector } from '@/lib/hooks'

type Props = {
  note: Note
}

const UnsavedChangesIndicator = ({ note }: Props) => {
  const status = useAppSelector(selectStatus)

  const { id, content, editedContent } = note
  const isSaving = status === `saving::${id}`
  const hasChanges = content !== editedContent && editedContent !== undefined

  return (
    <div className="absolute left-0 top-0 p-2">
      {isSaving ? (
        <div className="w-[8px] h-[8px] rounded-full animate-spin border border-solid border-purple-500 border-t-transparent"></div>
      ) : hasChanges ? (
        <div className="w-[8px] h-[8px] rounded-full bg-purple-500"></div>
      ) : null}
    </div>
  )
}

export default UnsavedChangesIndicator
