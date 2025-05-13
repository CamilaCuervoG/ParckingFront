export const buildBarChartData = (entries, exits) => ({
  labels: ['Entradas', 'Salidas'],
  datasets: [
    {
      label: 'Cantidad',
      data: [entries, exits],
      backgroundColor: ['#082F49', '#BAE6FD'],
      borderRadius: 10,
      borderWidth: 0,
    },
  ],
});

export const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};