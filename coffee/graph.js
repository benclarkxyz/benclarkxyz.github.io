window.onload = function () {
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
        data: data  // generated below
    });

    chart.render();
}

var limit = 48;

var y = 0;
var data = []; var dataSeries = { type: "line" };
var dataPoints = [];
for (var i = 0; i < limit; i += 1) {
    y = 120*Math.pow(0.5, i/6)  // caffine half-life
    dataPoints.push({
        x: i,
        y: y
    });
}
dataSeries.dataPoints = dataPoints;
data.push(dataSeries);
