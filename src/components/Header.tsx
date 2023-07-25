import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import Logo from 'public/logo.svg'
import SignInButton from './SignInButton'

export default async function Header() {
  const session = await getServerSession()

  return (
    <nav className="flex justify-center items-center h-[52px]">
      <Link href={'/'}>
        <Logo />
      </Link>
      {session?.user ? (
        <div className="relative aspect-square h-full w-full">
          <Image fill src={session.user.image || ''} alt="사용자 이미지" />
        </div>
      ) : (
        <SignInButton />
      )}
    </nav>
  )
}
