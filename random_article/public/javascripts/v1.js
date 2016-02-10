function renderBarGraph(data, id) {
    // Set the x and y scales. X is category because it's getting strings as values.
    var xScale = new Plottable.Scales.Category();
    var yScale = new Plottable.Scales.Linear();

    // Set the type of axes. X axis is categorical again because it is a bar chart.
    var xAxis = new Plottable.Axes.Category(xScale, "bottom");
    var yAxis = new Plottable.Axes.Numeric(yScale, "left");

    // Creating the plot, this will be a bar plot.
    var plot = new Plottable.Plots.Bar();

    // This is how we'll map each piece of data. The 'x' in the pair will be the x value and 'y' will be the y value.
    // The data should look like a list of {'x': x value, 'y': y value} objects
    plot.x(function(d) { return d.x; }, xScale);
    plot.y(function(d) { return d.y; }, yScale);

    // Get and convert the data. Add the data to the plot.
    var dataset = new Plottable.Dataset(data);
    plot.addDataset(dataset);

    // Creating the chart (this is important for the layout of the chart when they get more complicated).
    var chart = new Plottable.Components.Table([
        [yAxis, plot],
        [null, xAxis]
    ]);

    // Render the chart to the svg.
    chart.renderTo("svg#" + id);
}

function renderPieChart(data, id) {
    var scale = new Plottable.Scales.Linear();
    var colorScale = new Plottable.Scales.InterpolatedColor();
    colorScale.range(["#BDCEF0", "#5279C7"]);

    var plot = new Plottable.Plots.Pie()
        .addDataset(new Plottable.Dataset(data))
        .sectorValue(function(d) { return d.val; }, scale)
        .attr("fill", function(d) { return d.val; }, colorScale)
        .labelsEnabled(true)
        .renderTo("svg#" + id);
}

function getShooterGenderGraph() {
    $.getJSON('./aggregated-data.json', function(aggregatedData) {

        // TODO Set up MongoDB call

        // Get number of victims per age.
        var data = {};
        for (var i = 0; i < aggregatedData.length; i++) {
            var article = aggregatedData[i];
            var shooter = article['shooter-details'];
            if (shooter != null) {
                for (var m = 0; m < shooter.length; m++) {
                    var gender = shooter[m]['gender']
                    if (gender != null) {
                        if (data[gender] == null) data[gender] = 1;
                        else data[gender] = data[gender] + 1;
                    }
                }
            }
        }

        // Convert the object to an array of {age, number of victims} pairs.
        var list = [];
        for (var gender in data) {
            list.push({'val': data[gender]});
        }
        renderPieChart(list, "v3");
    });
}

function getVictimAgeGraph() {
    $.getJSON('./aggregated-data.json', function(aggregatedData) {

        // TODO Set up MongoDB call

        // Get number of victims per age.
        var data = {};
        for (var i = 0; i < aggregatedData.length; i++) {
            var article = aggregatedData[i];
            var victim = article['victim-details'];
            if (victim != null) {
                for (var m = 0; m < victim.length; m++) {
                    var age = victim[m]['age']
                    // none, '' and unknown should all mean the same thing.
                    if (age == 'none' || age == '') age = 'unknown';
                    if (age != null) {
                        if (data[age] == null) data[age] = 1;
                        else data[age] = data[age] + 1;
                    }
                }
            }
        }

        // Convert the object to an array of {age, number of victims} pairs.
        var list = [];
        for (var age in data) {
            list.push({'x': age, 'y': data[age]});
        }
        renderBarGraph(list, "v1");
    });
}

function getNumShotsGraph() {
    $.getJSON('./aggregated-data.json', function(aggregatedData) {

        // TODO Set up MongoDB call

        // Get number of victims per age.
        var data = {};
        for (var i = 0; i < aggregatedData.length; i++) {
            var article = aggregatedData[i];
            var details = article['shooting-details'];
            if (details != null) {
                var numShots = details['number_of_shots'];
                if (numShots != null) {
                    if (data[numShots] == null) data[numShots] = 1;
                    else data[numShots] = data[numShots] + 1;
                }
            }
        }

        // Convert the object to an array of {age, number of victims} pairs.
        var list = [];
        for (var numShots in data) {
            list.push({'x': numShots, 'y': data[numShots]});
        }
        renderBarGraph(list, "v2");
    });
}

function getMonthGraph() {
    $.getJSON('./aggregated-data.json', function(aggregatedData) {
        // Get number of victims per age.
        var data = {};
        for (var i = 0; i < aggregatedData.length; i++) {
            var article = aggregatedData[i];
            var details = article['shooting-details'];
            if (details != null) {
                var time = details['time'];
                if(time != null){
                    var date = time['date'];
                    var myDate = new Date(date);
                    var month = myDate.getMonth() + 1;

                    if (month != null) {
                        if (data[month] == null) data[month] = 1;
                        else data[month] = data[month] + 1;
                    }
                }
            }
        }
        // Convert the object to an array of {age, number of victims} pairs.
        var list = [];
        for (var coarse in data) {
            list.push({'x': coarse, 'y': data[coarse]});
        }
        renderBarGraph(list, "v4");
    });
}

$(document).ready( function () {
    getVictimAgeGraph();
    getNumShotsGraph();
    getShooterGenderGraph();
    getMonthGraph();
});