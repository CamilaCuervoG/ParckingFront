import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import styles from './StatsCard.module.css';
import { buildBarChartData, barChartOptions } from './chartConfig';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StatsCard = ({ title, entries, exits, footer }) => {
  const data = buildBarChartData(entries, exits);

  return (
    <div className={styles.statsCard}>
      <div className={styles.statsCardHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.statsCardBody}>
        <div className={styles.chartContainer}>
          <Bar data={data} options={barChartOptions} />
        </div>
      </div>
      <div className={styles.statsCardFooter}>
        <span>{footer}</span>
      </div>
    </div>
  );
};

export default StatsCard;
