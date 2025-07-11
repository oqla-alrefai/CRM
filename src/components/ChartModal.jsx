import { useMemo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import styles from '../styles/ChartModal.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function ChartModal({ field, data, chartType, setChartType, onClose }) {
  const counts = useMemo(() => {
    const counter = {};
    data.forEach((item) => {
      const value = item[field] || 'Unknown';
      counter[value] = (counter[value] || 0) + 1;
    });
    return counter;
  }, [field, data]);

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: field,
        data: Object.values(counts),
        backgroundColor: [
          '#3f51b5', '#f44336', '#4caf50', '#ff9800', '#00bcd4',
          '#8e24aa', '#cddc39', '#9e9e9e', '#795548', '#ff5722',
        ],
      },
    ],
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Chart for: {field}</h3>

        {!chartType && (
          <div className={styles.options}>
            <button onClick={() => setChartType('pie')}>Pie Chart</button>
            <button onClick={() => setChartType('bar')}>Bar Chart</button>
          </div>
        )}

        {chartType === 'pie' && <Pie data={chartData} />}
        {chartType === 'bar' && <Bar data={chartData} />}

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
