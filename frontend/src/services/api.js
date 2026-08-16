const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

function buildUrl(path) {
  return `${API_BASE_URL}${path}`
}

async function parseErrorResponse(response) {
  try {
    const data = await response.json()
    if (typeof data?.detail === 'string') {
      return data.detail
    }
    return 'Falha ao processar a solicitação.'
  } catch {
    return 'Falha ao processar a solicitação.'
  }
}

export async function extractTranscript(url) {
  let response

  try {
    response = await fetch(buildUrl('/api/transcript'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
  } catch {
    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique se a API está em execução.',
      0,
    )
  }

  if (!response.ok) {
    const detail = await parseErrorResponse(response)
    throw new ApiError(detail, response.status, detail)
  }

  const data = await response.json()

  if (typeof data?.title !== 'string' || typeof data?.transcript !== 'string') {
    throw new ApiError('Resposta inválida recebida do servidor.', 500)
  }

  return data
}

export default {
  extractTranscript,
}
