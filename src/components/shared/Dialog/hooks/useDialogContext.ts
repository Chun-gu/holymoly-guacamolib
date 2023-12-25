import { createContext, useContext } from 'react'

type DialogContextProps = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const DialogContext = createContext<DialogContextProps>({
  isOpen: false,
  open: () => undefined,
  close: () => undefined,
})

export default function useDialogContext() {
  const dialogContext = useContext(DialogContext)

  if (dialogContext === undefined) {
    throw new Error('useDialogContext must be inside a Provider')
  }

  return dialogContext
}
