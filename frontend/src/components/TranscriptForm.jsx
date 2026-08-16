import { useState } from 'react'

function TranscriptForm({ onExtract, isLoading }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError('Cole a URL de um vídeo do YouTube para continuar.')
      return
    }

    setError('')
    await onExtract(trimmedUrl)
  }

  function handleChange(event) {
    setUrl(event.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <form className="transcript-form" onSubmit={handleSubmit} id="extrair">
      <div className="transcript-form__field">
        <label className="sr-only" htmlFor="youtube-url">
          URL do vídeo do YouTube
        </label>
        <input
          id="youtube-url"
          name="youtube-url"
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="Cole a URL do vídeo do YouTube"
          value={url}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'youtube-url-error' : undefined}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? (
            <span className="transcript-form__loading">
              <span className="transcript-form__spinner" aria-hidden="true" />
              Extraindo legenda...
            </span>
          ) : (
            'Extrair legenda'
          )}
        </button>
      </div>

      {error ? (
        <p className="transcript-form__error" id="youtube-url-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}

export default TranscriptForm
