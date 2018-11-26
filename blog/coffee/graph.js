var dataSeries = { type: "line" };
var limit = 48;
var dataPoints = Array(limit).fill(0);
var additionalDose = [];
var additionalTime = [];


window.onload = function () {
    var caffeine = 180; // default caffeine amount
    var data = createCurve(caffeine, 0);
    var two_mg;
    
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
        
        chart.options.data = createCurve(caffeine, 0);
        
        t_2mg = 8.22336173*Math.log(caffeine) - 5.7;   // half-life formula in terms of caffeine
        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + " hours";
        
        chart.render();
        
        additionalDose = [];
        additionalTime = [];
    });
    
    // when user adds additional dose
    var newCaffeineButton = document.getElementById('newCaffeineButton');
    newCaffeineButton.addEventListener('click', function() {
        var newDose = Number(document.getElementById('newDose').value);
        var newTime = Number(document.getElementById('time').value);
        
        createCurve(newDose, newTime);
        chart.render();
        
        additionalDose.push(newDose);
        additionalTime.push(newTime);
        var i;
        t_2mg = 0
        for (i = 0; i < additionalDose.length; i++) {
            t_2mg += 5.7*Math.log2(0.5*(caffeine + additionalDose[i]*Math.pow(2, additionalTime[i]/5.7)));
        }
        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + " hours";
    });
}

// given initial caffeine amount, great 'limit' amount of data points along that
// amount of caffeine's half-life curve
function createCurve(caffeine, time) {
    var data = [];
    var y = 0;
    
    if (time == 0) {    // initial caffeine dose
        for ( ; time < limit; time += 1) {
            y = caffeine * Math.pow(0.5, time/5.7)  // caffeine half-life equation
            dataPoints[time] = {x: time, y: y};
        }
    } else {    // additional dose
        var j;
        for (j = 0; j < limit - time; j += 1) {
            y = dataPoints[time + j]["y"] + caffeine * Math.pow(0.5, j/5.7)  // caffeine half-life equation
            dataPoints[time + j] = {x: time + j, y: y};
        }
    }
    
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    return data;
}
