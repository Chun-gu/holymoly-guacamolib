import { ComponentProps } from 'react'

export default function Content({
  children,
  ...restProps
}: ComponentProps<'div'>) {
  return <div {...restProps}>{children}</div>
}
