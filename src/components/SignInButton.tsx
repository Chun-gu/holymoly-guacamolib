'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton() {
  return <button onClick={() => signIn('google')}>구글로 시작하기</button>
}
