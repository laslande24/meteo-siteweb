document.addEventListener('DOMContentLoaded', function() {
    function waitForApexCharts(callback) {
        if (typeof ApexCharts !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForApexCharts(callback), 100);
        }
    }

    waitForApexCharts(() => {
        const data = generateRandomData(10);

        const chartOptions = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [{
                name: 'Values',
                data: data
            }],
            xaxis: {
                categories: Array.from({length: data.length}, (_, i) => i + 1)
            }
        };

        const chart = new ApexCharts(document.querySelector("#line-chart"), chartOptions);
        chart.render();

        const tableBody = document.querySelector('#data-table tbody');
        updateTable(data);

        document.querySelectorAll('.weather-dot').forEach(button => {
            button.addEventListener('click', function() {
                const newData = generateRandomData(10);
                chart.updateSeries([{ data: newData }]);
                updateTable(newData);
            });
        });

        function generateRandomData(length) {
            return Array.from({ length: length }, () => Math.floor(Math.random() * 100));
        }

        function updateTable(data) {
            tableBody.innerHTML = '';
            data.forEach((value, index) => {
                const row = document.createElement('tr');
                const cellIndex = document.createElement('td');
                const cellValue = document.createElement('td');
                cellIndex.textContent = index + 1;
                cellValue.textContent = value;
                row.appendChild(cellIndex);
                row.appendChild(cellValue);
                tableBody.appendChild(row);
            });
        }
		
		document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('cameroon-map');
    let viewBox = svg.getAttribute('viewBox').split(' ').map(parseFloat);

    function zoom(scale) {
        const newViewBoxWidth = viewBox[2] / scale;
        const newViewBoxHeight = viewBox[3] / scale;

        const centerX = viewBox[0] + viewBox[2] / 2;
        const centerY = viewBox[1] + viewBox[3] / 2;

        viewBox[0] = centerX - newViewBoxWidth / 2;
        viewBox[1] = centerY - newViewBoxHeight / 2;
        viewBox[2] = newViewBoxWidth;
        viewBox[3] = newViewBoxHeight;

        svg.setAttribute('viewBox', viewBox.join(' '));
    }

    document.getElementById('zoom-in-btn').addEventListener('click', function() {
        zoom(1.2); // Increase scale factor for more zoom
    });

    document.getElementById('zoom-out-btn').addEventListener('click', function() {
        zoom(0.8); // Decrease scale factor for less zoom
    });
});

    });
});
