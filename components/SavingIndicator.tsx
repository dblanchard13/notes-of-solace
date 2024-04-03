type Props = {
  isSaving: boolean
}

const SavingIndicator = ({ isSaving }: Props) => {
  return (
    <div className="absolute left-0 top-0 p-2">
      {isSaving ? (
        <div className="w-[16px] h-[16px] rounded-full animate-spin border border-solid border-purple-500 border-t-transparent"></div>
      ) : // <div className="w-[16px] h-[16px] rounded-full bg-purple-500"></div>
      null}
    </div>
  )
}

export default SavingIndicator
