import { useState } from 'react'

function TranscriptForm() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!url.trim()) {
      setError('Cole a URL de um vídeo do YouTube para continuar.')
      return
    }

    setError('')
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
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'youtube-url-error' : undefined}
        />
        <button type="submit">Extrair legenda</button>
      </div>

      {error ? (
        <p className="transcript-form__error" id="youtube-url-error" role="alert">{error}</p>
      ) : (
        <p className="transcript-form__hint">A integração com o backend será conectada nesta etapa posterior.</p>
      )}
    </form>
  )
}

export default TranscriptForm
