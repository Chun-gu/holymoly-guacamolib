import SignInButton from '@/components/SignInButton'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession()
  if (session?.user) return redirect('/')

  return <SignInButton />
}
