import "./ProgressCard.css";

function ProgressCard({ title, current, total, color }) {
  const progress = (current / total) * 100; // Calcula el porcentaje

  return (
    <div className={`progress-card ${color}`}>
      <h3>{title}</h3>
      <p>Progreso</p>
      <div className="progress-bar">
        {/* La clase 'progress' se mantiene y se ajusta su width */}
        <div 
          className="progress" 
          style={{
            width: `${progress}%`, // Cambia dinámicamente el ancho según el progreso
          }}
        ></div>
      </div>
      <p className="percentage">{`${current}/${total}`}</p>
    </div>
  );
}

export default ProgressCard;
