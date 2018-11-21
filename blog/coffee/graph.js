window.onload = function () {
    var caffeine = 130; // default caffeine amount
    var data = createCurve(caffeine);
    
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
        },
        data: data
    });
    
    chart.render(); // render default chart
    
    // when user changes initial caffeine amount
    var renderButton = document.getElementById('renderButton');
    renderButton.addEventListener('click', function () {
        caffeine = Number(document.getElementById('caffeine').value);
        
        chart.options.data = createCurve(caffeine);
        
        var t_2mg = 8.22336173*Math.log(caffeine) - 5.7   // half-life formula solved for t
        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + " hours"
        
        chart.render();
    });
    
//    // when user adds additional dose
//    var newCaffeineButton = document.getElementById('newCaffeineButton');
//    newCaffeineButton.addEventListener('click', function() {
//        var x = document.getElementsByTagName("div")[0];
//
//        if (x.id == "newCaffeineDose") {
//            x.in
//        }
//    }
}

// given initial caffeine amount, great 'limit' amount of data points along that amount of caffeine's half-life curve
function createCurve(caffeine) {
    var data = [];
    var limit = 48;
    var y = 0;
    var dataSeries = { type: "line" };
    var dataPoints = [];
    var t;
    for (t = 0; t < limit; t += 1) {
        y = caffeine * Math.pow(0.5, t/5.7)  // caffeine half-life equation
        dataPoints.push({
                        x: t,
                        y: y
                        });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    return data;
}
