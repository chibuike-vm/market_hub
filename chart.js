const canvas = document.getElementById("canvas");

myChartConfig = {
    type: 'bar',
    data: {
        labels: ["Users", "Orders", "Deliveries"],
        datasets: [{
            label: " Total Amount",
            data: [500, 700, 690],
            backgroundColor:["#05a015", "#a15b0f", "#c9070a"],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 15,
                        family: "Arial, Helvetica, sans-serif",
                        weight: "bold"
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 15,
                        family: "Arial, Helvetica, sans-serif",
                        weight: "bold"
                    }
                }
            }
        },

        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15,
                        family: "Arial, Helvetica, sans-serif",
                        weight: "bold"
                    }
                }
            }
        }
    }
};

var myChart = new Chart(canvas.getContext("2d"), myChartConfig);

window.addEventListener("click", function() {
    for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
        localStorage.setItem(`datapoint${i}`, `${myChart.data.datasets[0].data[i] += 200}`)
    }
});

function mySetInterval() {
    for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
        myChart.data.datasets[0].data[i] = Number(localStorage.getItem(`datapoint${i}`));
    }

    myChart.update();
}

setInterval(mySetInterval, 3000);