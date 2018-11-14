function generateData(caffeine) {
    var data = [];
    var limit = 48;
    var y = 0;
    var dataSeries = { type: "line" };
    var dataPoints = [];
    for (var i = 0; i < limit; i += 1) {
        y = caffeine*Math.pow(0.5, i/5.7)  // caffeine half-life
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
    var caffeine = 130;
    var data = generateData(caffeine);
    
    var chart = new CanvasJS.Chart("chartContainer",
    {
        title: {
            text: "Caffeine Half-life"
        },
        axisX: {
            title: "Hours after dose"
        },
        axisY: {
            title: "Caffeine (mg)",
            stripLines: [{
                value: caffeine/20,
                color: "#ff0000",
                label: "5%",
//                labelPlacement: "outside"
            }]
        },
        data: data
    });
    
    chart.render();
    
    function addDataPointsAndRender() {
        caffeine = Number(document.getElementById('caffeine').value);
        chart.options.data = generateData(caffeine);
        chart.options.axisY.stripLines[0].value = caffeine/20;
//        document.getElementById('fivePercent').innerHTML = caffeine   // 5% is ~25 hrs always
        chart.render();
    }
    
    var renderButton = document.getElementById('renderButton');
    renderButton.addEventListener('click', addDataPointsAndRender);
}
