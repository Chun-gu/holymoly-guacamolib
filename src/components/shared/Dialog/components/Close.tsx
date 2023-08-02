import { ComponentProps } from 'react'

import useDialogContext from '../hooks/useDialogContext'

interface CloseProps extends ComponentProps<'button'> {
  onClose?: () => void
}

export default function Close({ children, onClose, ...restProps }: CloseProps) {
  const { close } = useDialogContext()

  function onClickClose() {
    if (onClose) onClose()
    close()
  }

  return (
    <button onClick={onClickClose} {...restProps}>
      {children}
    </button>
  )
}
