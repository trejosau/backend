export function formatRemainingHms(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60

  return `${hours}h ${minutes}m ${secs}s`
}

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000)
}
