const features = [
  {
    title: 'Rápido',
    description: 'Fluxo direto para iniciar a extração com o mínimo de fricção.',
  },
  {
    title: 'Simples',
    description: 'Uma única ação principal, sem distrações visuais desnecessárias.',
  },
  {
    title: 'Gratuito',
    description: 'Experiência inicial leve para validar o produto antes da integração.',
  },
]

function FeatureList() {
  return (
    <section className="feature-list" aria-label="Benefícios">
      {features.map((feature) => (
        <article className="feature-list__item" key={feature.title}>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  )
}

export default FeatureList
