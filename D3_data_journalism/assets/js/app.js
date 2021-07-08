// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var X_Axis = "smokesHigh";
var Y_Axis = "obesity";

//Import data
d3.csv("assets/data/data.csv").then(function(smokeH_data){
   smokeH_data.forEach(function(data){
        data.obesity = +data.obesity;
        data.smokesHigh = +data.smokesHigh;
        console.log(data);
   });

    let xLinearScale = d3.scaleLinear()
        .domain(d3.extent(smokeH_data, d => d.obesity))
        .range([0, width]);
    let yLinearScale = d3.scaleLinear()
        .domain([6, d3.max(smokeH_data, d => d.smokesHigh)])
        .range([height, 0]);

    var bAxis= d3.axisBottom(xLinearScale);
    var lAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bAxis);

    chartGroup.append("g")
        .call(lAxis);
        
    chartGroup.selectAll("circle")
        .data(smokeH_data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.obesity))
        .attr("cy", d => yLinearScale(d.smokesHigh))
        .attr("r","20")
        .classed("stateCircle", true)
        .attr("fill", "green")
        .attr("opacity", ".3")
      
    chartGroup.append("g")
        .selectAll('text')
        .data(smokeH_data)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x",d=>xLinearScale(d.obesity))
        .attr("y",d=>yLinearScale(d.smokesHigh))
        .classed(".stateText", true)
        .attr("font-family", "calibri")
        .attr("text-anchor", "middle")
        .attr("fill", "darkblue")
        .attr("font-size", "10px")
        .style("font-weight", "bold")
        .attr("alignment-baseline", "central");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Heavy Smoker (%)");
  });