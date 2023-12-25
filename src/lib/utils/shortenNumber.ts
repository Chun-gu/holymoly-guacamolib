export default function shortenNumber(number: number) {
  return Intl.NumberFormat('kr', { notation: 'compact' }).format(number)
}
