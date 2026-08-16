function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-brand" href="/" aria-label="YouTube Transcriber">
          <span className="site-brand__mark" aria-hidden="true">YT</span>
          <span className="site-brand__text">YouTube Transcriber</span>
        </a>

        <nav className="site-nav" aria-label="Navegação">
          <a href="#extrair">Extrair legenda</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
