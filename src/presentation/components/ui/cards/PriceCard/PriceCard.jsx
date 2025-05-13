import "./PriceCard.css";

function PriceCard({ autoPrice, motoPrice, title }) {
  const formatPrice = (price) => {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  return (
    <div className="price-card">
      <h2 className="price-title">{title}</h2> {/* Título recibido desde Dashboard */}
      <div className="price-columns">
        <div className="left-column">
          <h3>Automóviles</h3>
          <p>{formatPrice(autoPrice)}</p>
        </div>
        <div className="right-column">
          <h3>Motocicletas</h3>
          <p>{formatPrice(motoPrice)}</p>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
