type Props = {
  visible: boolean
}

const spinnerStyle = `
  w-[200px]
  h-[200px]
  animate-spin
  rounded-[50%]
  border
  border-solid
  border-t-transparent
  border-white-500
  absolute
  bottom-[calc(50vh-100px)]
  right-[calc(50vw-100px)]
`

const Spinner = ({ visible }: Props) =>
  visible && (
    <div className="relative h-screen w-screen">
      <div className={spinnerStyle}></div>
    </div>
  )

export default Spinner
