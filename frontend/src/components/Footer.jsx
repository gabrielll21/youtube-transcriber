function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>YouTube Transcriber</span>
        <span>© {year}</span>
      </div>
    </footer>
  )
}

export default Footer
