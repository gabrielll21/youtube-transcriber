import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import TranscriptForm from '../components/TranscriptForm.jsx'
import FeatureList from '../components/FeatureList.jsx'

function Home() {
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

          <TranscriptForm />
        </section>

        <FeatureList />
      </main>

      <Footer />
    </div>
  )
}

export default Home
