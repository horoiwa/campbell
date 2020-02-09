// Embeded from Python
const width = 400;
const height = 400;
const margin = {top: 40, right: 20, bottom: 20, left: 40};
const fontsize = 10;
const fontfamily = "sans-serif";

const chart_width = width - margin.left - margin.right;
const chart_height = height - margin.top - margin.bottom;

const rawData = {"CRIM":{"CRIM":1.0,"ZN":-0.2004692197,"INDUS":0.4065834114,"CHAS":-0.0558915822},"ZN":{"CRIM":-0.2004692197,"ZN":1.0,"INDUS":-0.5338281863,"CHAS":-0.0426967193},"INDUS":{"CRIM":0.4065834114,"ZN":-0.5338281863,"INDUS":1.0,"CHAS":0.0629380275},"CHAS":{"CRIM":-0.0558915822,"ZN":-0.0426967193,"INDUS":0.0629380275,"CHAS":1.0}}
const scatterData = [{"CRIM": 1,"ZN": 4,"INDUS": 6,"CHAS": 3},{"CRIM": 9,"ZN": 2,"INDUS": 4, "CHAS": 5}, {"CRIM": 7, "ZN": 3, "INDUS": 1, "CHAS": 0}]
const indices = Object.keys(rawData)

var scatterX = indices[0]
var scatterY = indices[1]
var scatterR = 10


var upperData = [];
for (let i=0; i<indices.length; i++){
    for (j=i+1; j<indices.length; j++){
        let d = {};
        d.x = indices[i];
        d.y = indices[j];
        d.corr = rawData[d.x][d.y];
        upperData.push(d);
    }
}

var lowerData= [];
for (let i=0; i<indices.length; i++){
    for (j=i+1; j<indices.length; j++){
        let d = {};
        d.y = indices[i];
        d.x = indices[j];
        d.corr = rawData[d.x][d.y];
        lowerData.push(d);
    }
}

var middleData = [];
for (let i=0; i<indices.length; i++){
        let d = {};
        d.x = indices[i];
        d.y = indices[i];
        d.corr = rawData[d.x][d.y];
        middleData.push(d);
}

// Create Scaler
var x_scale = d3.scaleBand()
    .domain(indices)
    .range([0, chart_width]);

var y_scale = d3.scaleBand()
    .domain(indices)
    .range([0, chart_height]);

var csize = d3.scaleSqrt()
    .domain([0, 1])
    .range([x_scale.bandwidth()/10, x_scale.bandwidth()/4]);

var ccolor = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(["#B22222", "#fff", "#000080"]);

// tooltip
var tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Create SVG Element
// svg要素直下でtransfromしておけば下位要素にもtransformが適用される
var svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// chart title
svg.append("text")
        .attr("x", (width/ 2) - margin.left)
        .attr("y", 0 - (margin.top/4))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "dimgray")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .text("Correlogram");

// Axis Option
//var x_axis = d3.axisBottom(x_scale);
//var y_axis = d3.axisLeft(y_scale);

//svg.append("g")
//   .attr("class", "xaxis")
//   .attr("transform", `translate(0, ${chart_height})`)
//   .call(x_axis)
//   .selectAll('text')
//   .attr('transform', "rotate(-45)")
//   .style("text-anchor", "bottom");
//
//svg.append("g")
//   .attr("class", "yaxis")
//   .call(y_axis);


svg.selectAll(".fname")
    .data(middleData)
    .enter()
    .append("text")
    .attr("class", "fname")
    .text((d) => {
        if (d.x.length < 7){
            return d.x;
            }
        else{
            return d.x.slice(0, 7);
            }
        })
    .attr("x", (d) => {
        return x_scale(d.x) + x_scale.bandwidth()/2;
    })
    .attr("y", (d)=>{
        return y_scale(d.y) + y_scale.bandwidth()/2;
    })
    .style("fill", "dimgrey")
    .style("text-anchor", "middle")
    .style("font-size", fontsize)
    .style('font-weight', 'bold')
    .on("mouseover", function(d) {
      tooltip
        .style("visibility", "visible")
        .html(d.x);
    })
    .on("mousemove", function(d) {
        tooltip
        .style("top", (d3.event.pageY - 20) + "px")
        .style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.style("visibility", "hidden");
    });

svg.selectAll(".corCircle")
    .data(lowerData)
    .enter()
    .append("circle")
    .attr("class", "corCircle")
    .attr("cx", (d) => {
        return x_scale(d.x) + x_scale.bandwidth()/2;
    })
    .attr("cy", (d)=>{
        return y_scale(d.y) + y_scale.bandwidth()/2;
    })
    .attr("fill", (d) => {
        return ccolor(d.corr);
    })
    .attr("r", (d) => {
        return csize(Math.abs(d.corr));
    })
    .on("mouseover", function(d){
        d3.select(this)
            .style("r", (d) =>{
                return csize(Math.abs(d.corr)*3);
            });
        tooltip
          .style("visibility", "visible")
          .html(`x: ${d.x}<br> y:${d.y} <br> r: ${d.corr.toFixed(2)}`);
        })
    .on("mousemove", function(d) {
        tooltip
        .style("top", (d3.event.pageY - 20) + "px")
        .style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function(d){
        d3.select(this)
            .style("r", (d) => {
                return csize(Math.abs(d.corr));
            });
        tooltip.style("visibility", "hidden");
    })
    .on("click", function(d){
        console.log(d.x);
    });


svg.selectAll(".corstr")
    .data(upperData)
    .enter()
    .append("text")
    .attr("class", "corstr")
    .text((d) => {
        return d.corr.toFixed(2);
    })
    .attr("x", (d) => {
        return x_scale(d.x) + x_scale.bandwidth()/2;
    })
    .attr("y", (d)=>{
        return y_scale(d.y) + y_scale.bandwidth()/2;
    })
    .style("fill", (d) => {
        if (d.corr >= 0){
            return "red";
        } else {
            return "royalblue";
        }
    })
    .style("text-anchor", "middle")
    .style("font-size", fontsize)
    .style('font-weight', 'bold');


// Create chart2
var svg2 = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// chart title
svg2.append("text")
        .attr("x", (width/ 2) - margin.left)
        .attr("y", 0 - (margin.top/4))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "dimgray")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .text("Scatter Plot");

svg2.append("clipPath")
    .attr("id", "plot-area-scatter")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", chart_width)
    .attr("height", chart_height)

var x_scale2 = d3.scaleLinear()
    .domain([d3.min(scatterData.map((o)=>{return o[scatterX]})),
             d3.max(scatterData.map((o)=>{return o[scatterX]})),
             ])
    .range([0, chart_width]);

var y_scale2 = d3.scaleLinear()
    .domain([d3.min(scatterData.map((o)=>{return o[scatterY]})),
             d3.max(scatterData.map((o)=>{return o[scatterY]})),
             ])
    .range([0, chart_height]);

var x_axis2 = d3.axisBottom(x_scale2);
var y_axis2 = d3.axisLeft(y_scale2);

svg2.append("g")
    .attr("class", "xaxis2")
    .attr("transform", `translate(0, ${chart_height})`)
    .call(x_axis2)

svg2.append("g")
    .attr("class", "yaxis2")
    .call(y_axis2)

svg2.append("g")
    .attr("id", "plot-area-scatter")
    .attr("clip-path", "url(#plot-area-scatter)")
    .selectAll(".points")
    .data(scatterData)
    .enter(j)
    .append("circle")
    .attr("class", "points")
    .attr("cx", (d) => {
        return x_scale2(d[scatterX]);
    })
    .attr("cy", (d) => {
        return y_scale2(d[scatterY]);
    })
    .attr("fill", "steelblue")
    .attr("r", scatterR);
