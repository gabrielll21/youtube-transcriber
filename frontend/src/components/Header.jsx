function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo" aria-hidden="true">YT</span>
        <div>
          <p className="app-header__eyebrow">YouTube Transcriber</p>
          <h1 className="app-header__title">Transcrição de vídeos em um fluxo simples</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
