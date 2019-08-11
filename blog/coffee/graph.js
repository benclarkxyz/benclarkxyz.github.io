var dataSeries = { type: 'line' };
var limit = 48; // amount of hours to graph after original dose
var dataPoints = Array(limit).fill(0);
var additionalDose = [];
var additionalTime = [];


window.onload = function () {
    var caffeine = 180; // default caffeine amount
    var t_2mg = 8.22336173*Math.log(caffeine) - 5.7;   // half-life formula in terms of caffeine
    var data = createCurve(caffeine, 0);

    var chart = new CanvasJS.Chart('chartContainer',
    {
        title: {
            text: 'Caffeine Half-life'
        },
        axisX: {
            title: 'Hours after dose'
        },
        axisY: {
            title: 'Caffeine (mg)'
        },
        data: data
    });

    chart.render(); // render default chart

    // when user changes initial caffeine amount
    var renderButton = document.getElementById('renderButton');
    renderButton.addEventListener('click', function () {
        caffeine = Number(document.getElementById('caffeine').value);
        t_2mg = 8.22336173*Math.log(caffeine) - 5.7;

        chart.options.data = createCurve(caffeine, 0);

        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + ' hours (' + Math.floor(t_2mg/24) + ' days ' +
                                                      Math.round(t_2mg % 24) + ' hours)';

        chart.render();

        additionalDose = [];
        additionalTime = [];
    });

    // when user adds additional dose
    var newCaffeineButton = document.getElementById('newCaffeineButton');
    newCaffeineButton.addEventListener('click', function() {
        var newDose = Number(document.getElementById('newDose').value);
        var newTime = Number(document.getElementById('time').value);
        if (newTime == 0) {
            additionalDose = [];
            additionalTime = [];
            t_2mg = 8.22336173*Math.log(newDose) - 5.7;   // half-life formula in terms of caffeine
        } else {
            additionalDose.push(newDose);
            additionalTime.push(newTime);
            var i;
            var sum = caffeine;
            t_2mg = 0
            for (i = 0; i < additionalDose.length; i++) {
                sum += additionalDose[i]*Math.pow(2, additionalTime[i]/5.7);
            }
            t_2mg = 5.7*Math.log2(sum) - 5.7;
        }
        document.getElementById('two_mg').innerHTML = t_2mg.toFixed(2) + ' hours (' + Math.floor(t_2mg/24) + ' days ' +
                                                      Math.round(t_2mg % 24) + ' hours)';

        createCurve(newDose, newTime);
        chart.render();
    });
}

// given initial caffeine amount, great 'limit' amount of data points along that
// amount of caffeine's half-life curve
function createCurve(caffeine, time) {
    var data = [];
    var y = 0;
    var step;

    if (time == 0) {    // initial caffeine dose
        step = 0;
        for ( ; step < limit; step += 1) {
            y = caffeine * Math.pow(0.5, step/5.7)  // caffeine half-life equation
            dataPoints[step] = {x: step, y: y};
        }
    } else {    // additional dose
        var j;
        step = Math.ceil(time);
        var cTime = Math.ceil(time);
        var decTime = time % 1;
        for (j = 0; j < limit - cTime; j += 1) {
            y = dataPoints[cTime + j]['y'] + caffeine * Math.pow(0.5, (j + decTime)/5.7)  // caffeine half-life equation
            dataPoints[cTime + j] = {x: cTime + j, y: y};
        }
    }

    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    return data;
}
