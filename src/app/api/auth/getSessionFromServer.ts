import { getServerSession } from 'next-auth'
import { authOptions } from './[...nextauth]/authOptions'

export async function getSessionFromServer() {
  return await getServerSession(authOptions)
}
