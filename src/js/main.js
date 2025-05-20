document.addEventListener('DOMContentLoaded', () => {
    const months = [
        'jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];
    const monthLabels = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get all input elements
    const getData = () => ({
        income: months.map(m => Number(document.querySelector(`input[name='income_${m}']`)?.value) || 0),
        expenses: months.map(m => Number(document.querySelector(`input[name='expenses_${m}']`)?.value) || 0)
    });

    let barChart = null;
    const renderChart = () => {
        const ctx = document.getElementById('barChart').getContext('2d');
        const { income, expenses } = getData();
        if (barChart) barChart.destroy();
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [
                    {
                        label: 'Income',
                        data: income,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Expenses',
                        data: expenses,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Monthly Income vs Expenses' },
                    datalabels: {
                        anchor: 'center',
                        align: 'center',
                        color: '#222',
                        font: { weight: 'bold' },
                        rotation: -90,
                        formatter: value => value
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            },
            plugins: [ChartDataLabels]
        });
    };

    // Show chart when Chart tab is clicked
    document.getElementById('chart-tab').addEventListener('shown.bs.tab', renderChart);

    // Update chart if data changes while on Chart tab
    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener('input', () => {
            if (document.getElementById('chart').classList.contains('active')) {
                renderChart();
            }
        });
    });

    // Download chart as image
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const canvas = document.getElementById('barChart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bucks2bar_chart.png';
        link.click();
    });

    // Input with id 'username' on change
    document.getElementById('username').addEventListener('change', function () {
        const username = this.value;
        // regex to check if username has at least 1 capital letter, 1 special character, 1 numeber, and is at least 8 characters long
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (regex.test(username)) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });
});