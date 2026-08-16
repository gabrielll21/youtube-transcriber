import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <section className="hero">
          <h2>Base inicial do produto</h2>
          <p>
            Estrutura mínima criada para evoluir a interface do YouTube Transcriber com
            componentes, páginas e serviços organizados.
          </p>

          <div className="hero__card">
            <h3>Próximos passos</h3>
            <ul>
              <li>Formulário de envio de URL</li>
              <li>Estado de processamento</li>
              <li>Lista de transcrições geradas</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
