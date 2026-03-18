const SECONDS_PER_DAY = 86_400

export function formatRemainingHms(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const days = Math.floor(total / SECONDS_PER_DAY)
  const hours = Math.floor((total % SECONDS_PER_DAY) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  }

  return `${hours}h ${minutes}m ${secs}s`
}

export function normalizeUnixTimestamp(value: number | string | null | undefined): number | null {
  const total = Math.floor(Number(value))
  if (!Number.isFinite(total) || total <= 0) {
    return null
  }

  return total >= 1_000_000_000_000 ? Math.floor(total / 1000) : total
}

export function remainingFromReceiveTime(
  receiveTime: number | string | null | undefined,
  currentUnix = nowUnix()
): number {
  const normalized = normalizeUnixTimestamp(receiveTime)
  if (!normalized) {
    return 0
  }

  const nextReceiveAt = normalized > currentUnix ? normalized : normalized + SECONDS_PER_DAY
  return Math.max(0, nextReceiveAt - currentUnix)
}

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000)
}
