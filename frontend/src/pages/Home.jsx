import { useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import TranscriptForm from '../components/TranscriptForm.jsx'
import FeatureList from '../components/FeatureList.jsx'
import TranscriptResult from '../components/TranscriptResult.jsx'
import { ApiError, extractTranscript } from '../services/api.js'

function Home() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  async function handleExtract(url) {
    setStatus('loading')
    setErrorMessage('')
    setResult(null)

    try {
      const data = await extractTranscript(url)
      setResult(data)
      setStatus('success')
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : 'Não foi possível extrair a legenda agora. Tente novamente.'

      setErrorMessage(message)
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'
  const hasResult = status === 'success' && result

  return (
    <div className="page-shell">
      <Header />

      <main className="page-main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="hero__eyebrow">Extrair legenda de vídeos do YouTube</p>
            <h1 id="hero-title">Cole a URL do vídeo e prepare a transcrição em segundos.</h1>
            <p className="hero__subtitle">
              Um ponto de entrada simples para obter a legenda de vídeos do YouTube sem ruído visual.
            </p>
          </div>

          <TranscriptForm onExtract={handleExtract} isLoading={isLoading} />

          {status === 'loading' ? (
            <div className="transcript-status" aria-live="polite" role="status">
              <span className="transcript-status__spinner" aria-hidden="true" />
              <span>Buscando legenda no servidor...</span>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="transcript-status transcript-status--error" role="alert">
              {errorMessage}
            </div>
          ) : null}
        </section>

        {hasResult ? (
          <TranscriptResult title={result.title} transcript={result.transcript} />
        ) : null}

        <FeatureList />
      </main>

      <Footer />
    </div>
  )
}

export default Home
