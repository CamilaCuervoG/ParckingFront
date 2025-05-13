import "./ArticleCard.css";

function ArticleCard({ title, image, description, label }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    description
  )}`;

  return (
    <div className="article-card">
      {/* Imagen */}
      <div className="image-placeholder">
        <img src={image} alt={title} className="article-image" />
      </div>

      {/* Etiqueta opcional */}
      {label && <span className="chip">{label}</span>}

      <h4>{title}</h4>
      <p>
        <span role="img" aria-label="location">📍</span> {description}
      </p>

      <div className="card-buttons">
        <button className="more-button">Ver más</button>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-button"
        >
          Ver en mapa
        </a>
      </div>
    </div>
  );
}

export default ArticleCard;
