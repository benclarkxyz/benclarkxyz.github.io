var dataSeries = { type: "line" };
var limit = 48;
var dataPoints = Array(limit).fill(0);


window.onload = function () {
    var caffeine = 130; // default caffeine amount
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
        
//        t_2mg = 8.22336173*Math.log(caffeine) - 5.7   // half-life formula solved for t
//        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + " hours"
        
        chart.render();
    });
    
    // when user adds additional dose
    var newCaffeineButton = document.getElementById('newCaffeineButton');
    newCaffeineButton.addEventListener('click', function() {
        var newDose = document.getElementById('newDose');
        var t = document.getElementById('time');
        
        createCurve(Number(newDose.value), Number(t.value));
        chart.render();
        
//        t_2mg = (8.22336173*Math.log(caffeine) - 5.7) + (8.22336173*Math.log(newDose) - 5.7)   // half-life formula solved for t
//        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + " hours"
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
