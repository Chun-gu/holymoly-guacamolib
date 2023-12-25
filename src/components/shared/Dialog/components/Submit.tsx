import useDialogContext from '../hooks/useDialogContext'

type SubmitButtonProps = {
  children: React.ReactNode
  onSubmit?: () => void
}

export default function Submit({ children, onSubmit }: SubmitButtonProps) {
  const { close } = useDialogContext()

  function submit() {
    if (onSubmit) onSubmit()
    close()
  }

  return <button onClick={submit}>{children}</button>
}
