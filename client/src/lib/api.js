export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function joinUrl(base, path) {
  if (!path) return base
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const sep = path.startsWith('/') ? '' : '/'
  return `${base}${sep}${path}`
}

export async function apiFetch(path, options = {}) {
  const url = joinUrl(API_BASE_URL, path)
  const opts = { credentials: 'include', ...options }
  return fetch(url, opts)
}
