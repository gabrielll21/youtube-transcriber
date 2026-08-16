const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export function buildUrl(path) {
  return `${API_BASE_URL}${path}`
}

export async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export default {
  buildUrl,
  request,
}
