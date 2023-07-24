import Link from 'next/link'
import Logo from 'public/logo.svg'

export default function Header() {
  return (
    <nav className="flex justify-center">
      <Link href={'/'}>
        <Logo />
      </Link>
    </nav>
  )
}
