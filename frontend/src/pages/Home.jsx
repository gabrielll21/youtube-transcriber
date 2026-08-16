import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import TranscriptForm from '../components/TranscriptForm.jsx'
import FeatureList from '../components/FeatureList.jsx'
import TranscriptResult from '../components/TranscriptResult.jsx'

const PROCESSING_DELAY_MS = 1200

function Home() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [transcript, setTranscript] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  function handleExtract() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    setIsProcessing(true)
    setShowResult(false)
    setTranscript('')

    timerRef.current = window.setTimeout(() => {
      setIsProcessing(false)
      setShowResult(true)
    }, PROCESSING_DELAY_MS)
  }

  function handleCopy() {
    if (!transcript) return
  }

  function handleDownload() {
    if (!transcript) return
  }

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

          <TranscriptForm onExtract={handleExtract} isProcessing={isProcessing} />
        </section>

        {showResult ? (
          <TranscriptResult
            transcript={transcript}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        ) : null}

        <FeatureList />
      </main>

      <Footer />
    </div>
  )
}

export default Home
