function TranscriptResult({ transcript, onCopy, onDownload }) {
  const hasTranscript = Boolean(transcript?.trim())

  return (
    <section className="transcript-result" aria-labelledby="transcript-result-title">
      <div className="transcript-result__header">
        <div>
          <p className="transcript-result__eyebrow">Resultado</p>
          <h2 id="transcript-result-title">Transcrição pronta para uso</h2>
        </div>

        <div className="transcript-result__actions">
          <button type="button" onClick={onCopy} disabled={!hasTranscript}>
            Copiar
          </button>
          <button type="button" onClick={onDownload} disabled={!hasTranscript}>
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
    </section>
  )
}

export default TranscriptResult
