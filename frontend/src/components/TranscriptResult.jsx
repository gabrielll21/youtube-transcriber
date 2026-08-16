import { useMemo, useState } from 'react'

function TranscriptResult({ title, transcript }) {
  const [feedback, setFeedback] = useState('')
  const hasTranscript = Boolean(transcript?.trim())
  const canAct = hasTranscript

  const downloadFileName = useMemo(() => {
    const safeTitle = (title || 'transcricao')
      .replace(/[\\/:*?"<>|]/g, '')
      .trim()
      .slice(0, 120)

    return `${safeTitle || 'transcricao'}.txt`
  }, [title])

  async function handleCopy() {
    if (!canAct || !navigator.clipboard) {
      setFeedback('Não foi possível copiar neste navegador.')
      return
    }

    try {
      await navigator.clipboard.writeText(transcript)
      setFeedback('Transcrição copiada para a área de transferência.')
    } catch {
      setFeedback('Não foi possível copiar a transcrição.')
    }
  }

  function handleDownload() {
    if (!canAct) return

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = downloadFileName
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
    setFeedback('Arquivo .txt preparado para download.')
  }

  return (
    <section className="transcript-result" aria-labelledby="transcript-result-title">
      <div className="transcript-result__header">
        <div>
          <p className="transcript-result__eyebrow">Resultado</p>
          <h2 id="transcript-result-title">{title || 'Transcrição pronta para uso'}</h2>
        </div>

        <div className="transcript-result__actions">
          <button type="button" onClick={handleCopy} disabled={!canAct}>
            Copiar
          </button>
          <button type="button" onClick={handleDownload} disabled={!canAct}>
            Baixar .txt
          </button>
        </div>
      </div>

      <div className="transcript-result__body" aria-live="polite">
        {hasTranscript ? (
          <p>{transcript}</p>
        ) : (
          <p className="transcript-result__empty">Espaço reservado para a transcrição.</p>
        )}
      </div>

      {feedback ? (
        <p className="transcript-result__feedback" role="status">
          {feedback}
        </p>
      ) : null}
    </section>
  )
}

export default TranscriptResult
