import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import useDialogContext from '../hooks/useDialogContext'

export default function Portal({ children }: { children: React.ReactNode }) {
  const { isOpen } = useDialogContext()
  const dialogRoot = document.getElementById('dialog-root') as HTMLElement

  useEffect(() => {
    const hasScroll = window.innerHeight < document.body.scrollHeight
    if (isOpen) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: ${hasScroll ? 'scroll' : 'auto'};
      width: 100%;`
    }

    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [isOpen])

  if (isOpen) return createPortal(children, dialogRoot)
  else return null
}
