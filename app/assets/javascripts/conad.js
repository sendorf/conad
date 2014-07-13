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

  var data = [
    {name: "Locke",    value:  4},
    {name: "Reyes",    value:  8},
    {name: "Ford",     value: 15},
    {name: "Jarrah",   value: 16},
    {name: "Shephard", value: 23},
    {name: "Kwon",     value: 42}
  ];


  var width = 1122,
      height = 500;

  var y = d3.scale.linear()
      .range([height, 0]);

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", height);

  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1);

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });

});

