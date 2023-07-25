import Link from 'next/link'
import Logo from 'public/logo.svg'

export default function Header() {
  return (
    <nav className="flex justify-center items-center h-[52px]">
      <Link href={'/'}>
        <Logo />
      </Link>
    </nav>
  )
}
