export default function generateRandomUsername() {
  const prefix = '논객'
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const randomStringLength = 8
  let suffix = ''

  for (let i = 0; i < randomStringLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    suffix += characters.charAt(randomIndex)
  }

  const username = prefix + suffix

  return username
}
