function graphChart(data) {
    var colors = d3.scale.category10();
    var width = 420,
        barHeight = 30;
    var maxCount = d3.max(data, function(d, i) {
        return d.value;
    });

    var x = d3.scale.linear()
        .domain([0, maxCount])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1)
        .style('fill', function(d, i) { return colors(i) });

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });

    bar.append("text")
        .attr("x", 1)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .style('text-anchor', 'start')
        .text(function(d) { return d.name; });
}

function graphLanguages(data, elmClass, pointsScale) {
    var margin = {top: 20, right: 30, bottom: 100, left: 40},
        chartWidth = 920 - margin.left - margin.right,
        chartHeight = 500 - margin.top - margin.bottom;

    var colors = d3.scale.category10();

    var maxCount = d3.max(data, function(d) { return d.value; });
    var x = d3.scale.ordinal().rangeBands([0, chartWidth], .1).domain(data.map(function(d){ return d.name; }));
    var y = d3.scale.linear().range([chartHeight, 0]).domain([0, maxCount]);

    var chart = d3.select('.'+elmClass)
        .attr('width', chartWidth + margin.left + margin.right)
        .attr('height', chartHeight + margin.top + margin.bottom)
        .append('g')
        .attr('transform', "translate(" + margin.left + ',' + margin.top + ")");

    var xAxis = d3.svg.axis().scale(x).orient('bottom');
    var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10, '%');


    chart.selectAll('.bar').data(data).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {return x(d.name);})
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return chartHeight - y(d.value); })
        .attr('width', x.rangeBand())
        .style('fill', function(d, i) { return colors(i); });

    chart.selectAll('.text').data(data).enter()
        .append('text')
        .attr('x', function(d) { return x(d.name)+x.rangeBand()/2;})
        .attr("y", function(d) { return y(d.value) +5; })
        .attr("dx", ".71em")
        .attr("dy", ".71em")
        .style('fill', '#fff')
        .style('text-anchor', 'end')
        .style('font-size', function(d) { return (x.rangeBand()/pointsScale)+'px';})
        .text(function(d) { return d.value; });

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("y", -10)
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .text('Level');

    chart.append('g')
        .attr('class', 'x axis')
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(xAxis)
        .selectAll('text')
        .attr('x', -9)
        .attr('y', 0)
        .attr('dy', ".35em")
        .attr('transform', "rotate(-90)")
        .style('text-anchor', 'end');

}

function graph(id, val, colors) {

    var config = liquidFillGaugeDefaultSettings();
    config.circleColor = colors[2];
    config.textColor = colors[1];
    config.waveTextColor = colors[0];
    config.waveColor = colors[3];
    config.waveAnimateTime = 3000;
    var gauge = loadLiquidFillGauge(id, val, config);
}

function fromSeconds(seconds, showHours) {
    if(showHours) {
        var hours = Math.floor(seconds / 3600);
        seconds = seconds - hours * 3600;
    }
    var minutes = (Math.floor(seconds/60) < 10) ? "0" + Math.floor(seconds/60) : Math.floor(seconds/60);
    var seconds = (seconds % 60 > 9) ? seconds % 60 : "0" + seconds % 60;
    if(showHours) {
        var timestring = hours+":"+minutes+":"+seconds;
    } else {
        var timestring = minutes+":"+seconds;
    }
    return timestring;
}

function compare(a, b) {
    if (a.value < b.value)
        return 1;
    if (a.value > b.value)
        return -1;
    return 0;
}
