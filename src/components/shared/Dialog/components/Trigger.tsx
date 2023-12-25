import useDialogContext from '../hooks/useDialogContext'

export default function Trigger({ children }: { children: React.ReactNode }) {
  const { open } = useDialogContext()

  return <button onClick={open}>{children}</button>
}
