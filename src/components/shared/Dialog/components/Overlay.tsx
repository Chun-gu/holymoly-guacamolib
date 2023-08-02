import { ComponentProps } from 'react'

import useDialogContext from '../hooks/useDialogContext'

export default function Overlay(props: ComponentProps<'div'>) {
  const { close } = useDialogContext()

  return <div onClick={close} {...props} />
}
