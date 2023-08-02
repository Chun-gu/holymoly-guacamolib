import { DialogContext } from '../hooks/useDialogContext'

type RootProps = {
  children: React.ReactNode
  isOpen: boolean
  open: () => void
  close: () => void
}

export default function Root({ children, isOpen, open, close }: RootProps) {
  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  )
}
