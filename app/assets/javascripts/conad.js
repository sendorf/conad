$(function(){

  $('#calendar').on('click', "[data-link]", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var href = $(this).data('link');
    window.location.href = href;
  });

  // Hide alerts after a while
  $(".alert").delay(500).fadeIn().delay(4000).fadeOut();

});

$(function(){

  var data = $('.chart').data('chart')

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1122 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d.day; }));
  y.domain([0, d3.max(data, function(d) { return d.connections; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Connections");

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.day); })
      .attr("y", function(d) { return y(d.connections); })
      .attr("height", function(d) { return height - y(d.connections); })
      .attr("width", x.rangeBand());

});

$(function(){


  var data = $('.chart-lines').data('chart')
  /*
  var data = [
   {date: 20111001, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111002, 'New York': 58.0, 'San Francisco': 59.9, 'Austin': 67.7},
   {date: 20111003, 'New York': 53.3, 'San Francisco': 59.1, 'Austin': 69.4},
   {date: 20111004, 'New York': 55.7, 'San Francisco': 58.8, 'Austin': 68.0},
   {date: 20111005, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111006, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111007, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111008, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111009, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111010, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111011, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111012, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111013, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111014, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111015, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111016, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111017, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111018, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111019, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111020, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111021, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111022, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111023, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111024, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111025, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111026, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111027, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111028, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111029, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111030, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111031, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111101, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111102, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111103, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111104, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111105, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111106, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111107, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111108, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111109, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111110, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111111, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111112, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111113, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111114, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2},
   {date: 20111115, 'New York': 63.4, 'San Francisco': 62.7, 'Austin': 72.2}
  ]*/

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = 1122 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y%m%d").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.temperature); });

  var chart = d3.select(".chart-lines")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    data.forEach(function(d) {
      d.date = parseDate(d.date.toString());
    });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {date: d.date, temperature: +d[name]};
        })
      };
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain([
      d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
      d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
    ]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Connections");

    var city = chart.selectAll(".city")
        .data(cities)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });

    city.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

});