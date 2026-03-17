const railwayPublicDomain = process.env.RAILWAY_PUBLIC_DOMAIN?.trim()
const railwayServiceName = process.env.RAILWAY_SERVICE_NAME?.trim()

export function inferAppName() {
  return process.env.APP_NAME || railwayServiceName || 'backend'
}

export function inferAppUrl() {
  if (process.env.APP_URL) {
    return process.env.APP_URL
  }

  if (railwayPublicDomain) {
    return `https://${railwayPublicDomain}`
  }

  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || '3333'
  return `http://${host}:${port}`
}

export function inferAppKey() {
  return process.env.APP_KEY || process.env.INTERNAL_API_TOKEN || 'hmc-backend-fallback-app-key'
}
