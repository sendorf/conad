$(function(){

  $('#calendar').on('click', "[data-link]", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var href = $(this).data('link');
    window.location.href = href;
  });

  // Hide alerts after a while
  $(".alert").delay(500).fadeIn().delay(4000).fadeOut();

  /*$('#button').on('click', function(event){
    event.stopPropagation();
    event.preventDefault();
    var svg = $('svg')
    if svg.hasClass('lines-chart'){
      svg.removeClass('lines-chart')
      svg.addClass('stacked-bar-chart')
    }else{
      svg.removeClass('stacked-bar-chart')
      svg.addClass('lines-chart')
    }
  });*/
});

$(function(){

    
  var data = $('.chart').data('chart')

    if(data){
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
    }
});

$(function(){

  var data = $('.stacked-bar-chart').data('chart')

  if(data){

    var margin = {top: 20, right: 20, bottom: 50, left: 40},
                 width = 1122 - margin.left - margin.right,
                 height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([10, (width - 120)], .1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var parseDate = d3.time.format("%Y%m%d").parse;

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%a %d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select('.stacked-bar-chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    data.forEach(function(d) {
        d.date = parseDate(d.date.toString());
    });

    data.forEach(function(d) {
      var y0 = 0;
      d.servers = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.servers[d.servers.length - 1].y1;
    });

    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Connections");

    var date = svg.selectAll(".date")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; });

    date.selectAll("rect")
        .data(function(d) { return d.servers; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  }
});

$(function(){


  var data = $('.lines-chart').data('chart')

  if(data){

    var margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = 1122 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.connections); });

    var chart = d3.select(".lines-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

      data.forEach(function(d) {
        d.date = parseDate(d.date.toString());
      });

      var servers = color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {date: d.date, connections: +d[name]};
          })
        };
      });

      x.domain(d3.extent(data, function(d) { return d.date; }));

      y.domain([
        d3.min(servers, function(c) { return d3.min(c.values, function(v) { return v.connections; }); }),
        d3.max(servers, function(c) { return d3.max(c.values, function(v) { return v.connections; }); })
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

      var server = chart.selectAll(".server")
          .data(servers)
        .enter().append("g")
          .attr("class", "server");

      server.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

      server.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.connections) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

    }
});

$(function(){


  var data = $('.donut').data('chart')

  if(data){

    var w = 1122,
        h = 500,
        radius = Math.min(w, h) / 2;

    var color = d3.scale.category20();

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 100);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.connections; });

    var svg = d3.select(".donut")
        .attr("width", w)
        .attr("height", h)
      .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

      var servers = color.domain().map(function(name) {
        total = 0;
        data.map(function(d) {
            return +d[name];
        }).forEach(function(c) { 
            total += c;
        })
        return {
          server: name,
          connections: total
        };
      });

      var g = svg.selectAll(".arc")
          .data(pie(servers))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.server); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.server; });

  }
});


$(function(){

  var data = $('.transition').data('chart')

  if(data){

    var m = [20, 20, 40, 50],
        w = 1122 - m[1] - m[3],
        h = 500 - m[0] - m[2];

    var parseDate = d3.time.format("%Y%m%d").parse;

    var x,
        y,
        duration = 30000,
        delay = 500;

    var color = d3.scale.category20();

    var svg = d3.select(".transition")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
      .append("g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    var stocks,
        servers;

    // A line generator, for the dark stroke.
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.connections); });

    // A line generator, for the dark stroke.
    var axis = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(h);

    // A area generator, for the dark stroke.
    var area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y1(function(d) { return y(d.connections); });


    color.domain(d3.keys(data[data.length-1]).filter(function(key) { return key !== "date"; }));

    var server_keys = d3.keys(data[data.length-1]).filter(function(key) { return key !== "date"; });

    data.forEach(function(d) {
      d.date = parseDate(d.date.toString());
    });

    var servers = server_keys.map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {date: d.date, connections: +d[name]};
        })
      };
    });

    // Parse dates and numbers. We assume values are sorted by date.
    // Also compute the maximum connections per server, needed for the y-domain.
    servers.forEach(function(s) {
      s.values.forEach(function(d) { d.date = d.date; d.connections = +d.connections; });
      s.maxConnections = d3.max(s.values, function(d) { return d.connections; });
      s.sumConnections = d3.sum(s.values, function(d) { return d.connections; });
    });

    // Sort by maximum connections, descending.
    servers.sort(function(a, b) { return b.maxConnections - a.maxConnections; });

    var g = svg.selectAll("g")
        .data(servers)
      .enter().append("g")
        .attr("class", "server");

    donut();


    function lines() {

      svg.selectAll("*").remove();

      servers = server_keys.map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {date: d.date, connections: +d[name]};
          })
        };
      });

      // Parse dates and numbers. We assume values are sorted by date.
      // Also compute the maximum connections per server, needed for the y-domain.
      servers.forEach(function(s) {
        s.values.forEach(function(d) { d.date = d.date; d.connections = +d.connections; });
        s.maxConnections = d3.max(s.values, function(d) { return d.connections; });
        s.sumConnections = d3.sum(s.values, function(d) { return d.connections; });
      });

      x = d3.time.scale().range([0, w - 60]);
      y = d3.scale.linear().range([h , 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");


      // Compute the minimum and maximum date across servers.
      x.domain(d3.extent(data, function(d) { return d.date; }));

      y.domain([
        d3.min(servers, function(c) { return d3.min(c.values, function(v) { return v.connections; }); }),
        d3.max(servers, function(c) { return d3.max(c.values, function(v) { return v.connections; }); })
      ]);

      g = svg.selectAll("g")
          .data(servers)
        .enter().append("g")
          .attr("class", "server");

      g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);

      g.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Connections");

      var server = svg.selectAll(".server")

      server.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

      server.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.connections) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

      setTimeout(donut, duration + delay);
    }

    function horizons() {
      svg.insert("defs", ".server")
        .append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", w)
          .attr("height", h);

      var color = d3.scale.ordinal()
          .range(["#c6dbef", "#9ecae1", "#6baed6"]);

      var g = svg.selectAll(".server")
          .attr("clip-path", "url(#clip)");

      area
          .y0(h / 4 - 20);

      g.select("circle").transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + (w - 60) + "," + (-h / 4) + ")"; })
          .remove();

      g.select("text").transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + (w - 60) + "," + (h / 4 - 20) + ")"; })
          .attr("dy", "0em");

      g.each(function(d) {
        y.domain([0, d.maxConnections]);

        d3.select(this).selectAll(".area")
            .data(d3.range(3))
          .enter().insert("path", ".line")
            .attr("class", "area")
            .attr("transform", function(d) { return "translate(0," + (d * (h / 4 - 20)) + ")"; })
            .attr("d", area(d.values))
            .style("fill", function(d, i) { return color(i); })
            .style("fill-opacity", 1e-6);

        y.domain([0, d.maxConnections / 3]);

        d3.select(this).selectAll(".line").transition()
            .duration(duration)
            .attr("d", line(d.values))
            .style("stroke-opacity", 1e-6);

        d3.select(this).selectAll(".area").transition()
            .duration(duration)
            .style("fill-opacity", 1)
            .attr("d", area(d.values))
            .each("end", function() { d3.select(this).style("fill-opacity", null); });
      });

      //setTimeout(areas, duration + delay);
    }

    function areas() {
      var g = svg.selectAll(".server");

      axis
          .y(h / 4 - 21);

      g.select(".line")
          .attr("d", function(d) { return axis(d.values); });

      g.each(function(d) {
        y.domain([0, d.maxConnections]);

        d3.select(this).select(".line").transition()
            .duration(duration)
            .style("stroke-opacity", 1)
            .each("end", function() { d3.select(this).style("stroke-opacity", null); });

        d3.select(this).selectAll(".area")
            .filter(function(d, i) { return i; })
          .transition()
            .duration(duration)
            .style("fill-opacity", 1e-6)
            .attr("d", area(d.values))
            .remove();

        d3.select(this).selectAll(".area")
            .filter(function(d, i) { return !i; })
          .transition()
            .duration(duration)
            .style("fill", color(d.key))
            .attr("d", area(d.values));
      });

      svg.select("defs").transition()
          .duration(duration)
          .remove();

      g.transition()
          .duration(duration)
          .each("end", function() { d3.select(this).attr("clip-path", null); });

      setTimeout(stackedArea, duration + delay);
    }

    function stackedArea() {


      x = d3.scale.ordinal()
        .rangeRoundBands([10, (w - 120)], .1);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var stack = d3.layout.stack()
          .values(function(d) { return d.values; })
          .x(function(d) { return d.date; })
          .y(function(d) { return d.connections; })
          .out(function(d, y0, y) { d.connections0 = y0; })
          .order("reverse");

      stack(servers);

      y
          .domain([0, d3.max(servers[0].values.map(function(d) { return d.connections + d.connections0; }))])
          .range([h, 0]);

      line
          .y(function(d) { return y(d.connections0); });

      area
          .y0(function(d) { return y(d.connections0); })
          .y1(function(d) { return y(d.connections0 + d.connections); });

      var t = svg.selectAll(".server").transition()
          .duration(duration)
          .attr("transform", "translate(0,0)")
          .each("end", function() { d3.select(this).attr("transform", null); });

      t.select("path.area")
          .attr("d", function(d) { return area(d.values); });

      t.select("path.line")
          .style("stroke-opacity", function(d, i) { return i < 3 ? 1e-6 : 1; })
          .attr("d", function(d) { return line(d.values); });

      t.select("text")
          .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d.connections / 2 + d.connections0) + ")"; });

      setTimeout(line, duration + delay);
    }

    function streamgraph() {
      var stack = d3.layout.stack()
          .values(function(d) { return d.values; })
          .x(function(d) { return d.date; })
          .y(function(d) { return d.connections; })
          .out(function(d, y0, y) { d.connections0 = y0; })
          .order("reverse")
          .offset("wiggle");

      stack(servers);

      line
          .y(function(d) { return y(d.connections0); });

      var t = svg.selectAll(".server").transition()
          .duration(duration);

      t.select("path.area")
          .attr("d", function(d) { return area(d.values); });

      t.select("path.line")
          .style("stroke-opacity", 1e-6)
          .attr("d", function(d) { return line(d.values); });

      t.select("text")
          .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d.connections / 2 + d.connections0) + ")"; });

      setTimeout(overlappingArea, duration + delay);
    }

    function overlappingArea() {
      var g = svg.selectAll(".server");

      line
          .y(function(d) { return y(d.connections0 + d.connections); });

      g.select(".line")
          .attr("d", function(d) { return line(d.values); });

      y
          .domain([0, d3.max(servers.map(function(d) { return d.maxConnections; }))])
          .range([h, 0]);

      area
          .y0(h)
          .y1(function(d) { return y(d.connections); });

      line
          .y(function(d) { return y(d.connections); });

      var t = g.transition()
          .duration(duration);

      t.select(".line")
          .style("stroke-opacity", 1)
          .attr("d", function(d) { return line(d.values); });

      t.select(".area")
          .style("fill-opacity", .5)
          .attr("d", function(d) { return area(d.values); });

      t.select("text")
          .attr("dy", ".31em")
          .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d.connections) + ")"; });

      svg.append("line")
          .attr("class", "line")
          .attr("x1", 0)
          .attr("x2", w - 60)
          .attr("y1", h)
          .attr("y2", h)
          .style("stroke-opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("stroke-opacity", 1);

      setTimeout(groupedBar, duration + delay);
    }

    function groupedBar() {
      x = d3.scale.ordinal()
          .domain(servers[0].values.map(function(d) { return d.date; }))
          .rangeBands([0, w - 60], .1);

      var x1 = d3.scale.ordinal()
          .domain(servers.map(function(d) { return d.key; }))
          .rangeBands([0, x.rangeBand()]);

      var g = svg.selectAll(".server");

      var t = g.transition()
          .duration(duration);

      t.select(".line")
          .style("stroke-opacity", 1e-6)
          .remove();

      t.select(".area")
          .style("fill-opacity", 1e-6)
          .remove();

      g.each(function(p, j) {
        d3.select(this).selectAll("rect")
            .data(function(d) { return d.values; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.date) + x1(p.key); })
            .attr("y", function(d) { return y(d.connections); })
            .attr("width", x1.rangeBand())
            .attr("height", function(d) { return h - y(d.connections); })
            .style("fill", color(p.key))
            .style("fill-opacity", 1e-6)
          .transition()
            .duration(duration)
            .style("fill-opacity", 1);
      });

      setTimeout(stackedBar, duration + delay);
    }

    function stackedBar() {

      svg.selectAll("*").remove();

      x = d3.scale.ordinal()
          .rangeRoundBands([10, (w - 120)], .1);

      y = d3.scale.linear()
          .rangeRound([h, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.time.format("%a %d"));

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));


      var stacked_servers = $('.transition').data('chart');

      stacked_servers.forEach(function(d) {
        var y0 = 0;
        d.servers = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.servers[d.servers.length - 1].y1;
      });

      x.domain(stacked_servers.map(function(s) { return s.date; }));
      y.domain([0, d3.max(stacked_servers, function(s) { return s.total; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis)
        .selectAll("text")  
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", function(d) {
                  return "rotate(-65)" 
                  });

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Connections");

      var date = svg.selectAll(".date")
          .data(stacked_servers)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; });

      date.selectAll("rect")
          .data(function(d) { return d.servers; })
        .enter().append("rect")
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
          .style("fill", function(d) { return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(color.domain().slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", w - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", w - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });



      setTimeout(lines, duration + delay);
    }

    function transposeBar() {
      x
          .domain(servers.map(function(d) { return d.key; }))
          .rangeRoundBands([0, w], .2);

      y
          .domain([0, d3.max(servers.map(function(d) { return d3.sum(d.values.map(function(d) { return d.connections; })); }))]);

      var stack = d3.layout.stack()
          .x(function(d, i) { return i; })
          .y(function(d) { return d.connections; })
          .out(function(d, y0, y) { d.connections0 = y0; });

      stack(d3.zip.apply(null, servers.map(function(d) { return d.values; }))); // transpose!

      var g = svg.selectAll(".server");

      var t = g.transition()
          .duration(duration / 2);

      t.selectAll("rect")
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.connections0 + d.connections) - 1; })
          .attr("height", function(d) { return h - y(d.connections) + 1; })
          .attr("x", function(d) { return x(d.symbol); })
          .attr("width", x.rangeBand())
          .style("stroke-opacity", 1e-6);

      t.select("text")
          .attr("x", 0)
          .attr("transform", function(d) { return "translate(" + (x(d.key) + x.rangeBand() / 2) + "," + h + ")"; })
          .attr("dy", "1.31em")
          .each("end", function() { d3.select(this).attr("x", null).attr("text-anchor", "middle"); });

      svg.select("line").transition()
          .duration(duration)
          .attr("x2", w);

      setTimeout(donut,  duration / 2 + servers[0].values.length * 10 + delay);
    }

    function donut() {

      svg.selectAll("*").remove();


      var radius = Math.min(w, h) / 2;

      var color = d3.scale.category20();

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 100);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.connections; });

      var grouped_servers = server_keys.map(function(name) {
        total = 0;
        data.map(function(d) {
            return +d[name];
        }).forEach(function(c) { 
            total += c;
        })
        return {
          server: name,
          connections: total
        };
      });

      g = svg.selectAll(".arc")
          .data(pie(grouped_servers))
        .enter().append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + ((w / 2)-40) + "," + (h / 2) + ")");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.server); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.server; });

      setTimeout(stackedBar, duration + delay);
    }

    function donutExplode() {
      var r0a = h / 2 - x.rangeBand() / 2,
          r1a = h / 2,
          r0b = 2 * h - x.rangeBand() / 2,
          r1b = 2 * h,
          arc = d3.svg.arc();

      svg.selectAll(".server path")
          .each(transitionExplode);

      function transitionExplode(d, i) {
        d.innerRadius = r0a;
        d.outerRadius = r1a;
        d3.select(this).transition()
            .duration(duration / 2)
            .tween("arc", tweenArc({
              innerRadius: r0b,
              outerRadius: r1b
            }));
      }

      function tweenArc(b) {
        return function(a) {
          var path = d3.select(this),
              text = d3.select(this.nextSibling),
              i = d3.interpolate(a, b);
          for (var key in b) a[key] = b[key]; // update data
          return function(t) {
            var a = i(t);
            path.attr("d", arc(a));
            text.attr("transform", "translate(" + arc.centroid(a) + ")translate(" + w / 2 + "," + h / 2 +")rotate(" + ((a.startAngle + a.endAngle) / 2 + 3 * Math.PI / 2) * 180 / Math.PI + ")");
          };
        }
      }

      setTimeout(function() {
        svg.selectAll("*").remove();
        svg.selectAll("g").data(servers).enter().append("g").attr("class", "server");
        lines();
      }, duration);
    }

  }
});