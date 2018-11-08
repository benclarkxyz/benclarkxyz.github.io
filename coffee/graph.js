function generateData(caffine) {
    var data = [];
    var limit = 48;
    var y = 0;
    var dataSeries = { type: "line" };
    var dataPoints = [];
    for (var i = 0; i < limit; i += 1) {
        y = caffine*Math.pow(0.5, i/6)  // caffine half-life
        dataPoints.push({
                        x: i,
                        y: y
                        });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    return data;
}

window.onload = function () {
    
    var data = generateData(120);
    
    var chart = new CanvasJS.Chart("chartContainer",
    {
        title: {
            text: "Caffine Half-life"
        },
        axisX: {
            title: "Hours after dose"
        },
        axisY: {
            title: "Caffine (mm)"
        },
        data: data
    });
    
    chart.render();
    
    function addDataPointsAndRender() {
        caffine = Number(document.getElementById('caffine').value);
        chart.options.data = generateData(caffine);
        chart.render();
    }
    
    var renderButton = document.getElementById('renderButton');
    renderButton.addEventListener('click', addDataPointsAndRender);
}
