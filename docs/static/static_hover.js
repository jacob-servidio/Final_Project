// Set Parms
var svgWidth = 10000;
var svgHeight = 10000;


// The svg
var svg = d3.select(".map")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(150)
  .center([0,20]);

// Data and color scale
var data = d3.map();


// Load external data and boot
worldData = d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  
  .await(ready);

medalData = d3.csv("country_medal_data.csv")
  var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.region}<br>Bronze: ${d.Bronze} <br>Silver:${d.Silver} <br>Gold:${d.Gold}`);
      });
console.log()
svg.call(toolTip);
console.log();

groupData = [medalData, worldData]

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
    toolTip.show(data, this)
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
    toolTip.hide(data)
  }
  

  

  
  // Draw the map
  groups = svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", "green")
      
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    }


    //Opensourced code sourced fromfrom d3-graph-gallery