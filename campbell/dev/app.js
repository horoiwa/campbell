
// Embeded from Python
const width = 430;
const height = 430;
const margin = {top: 20, right: 20, bottom: 60, left: 60};
const fontsize = 12
const fontfamily = "sans-serif"

const chart_width = width - margin.left - margin.right;
const chart_height = height - margin.top - margin.bottom;

const rawData = {"CRIM":{"CRIM":1.0,"ZN":-0.2004692197,"INDUS":0.4065834114,"CHAS":-0.0558915822},"ZN":{"CRIM":-0.2004692197,"ZN":1.0,"INDUS":-0.5338281863,"CHAS":-0.0426967193},"INDUS":{"CRIM":0.4065834114,"ZN":-0.5338281863,"INDUS":1.0,"CHAS":0.0629380275},"CHAS":{"CRIM":-0.0558915822,"ZN":-0.0426967193,"INDUS":0.0629380275,"CHAS":1.0}}
const indices = Object.keys(rawData)
//

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
var size = d3.scaleSqrt()
    .domain([0, 1])
    .range([0, 9]);

var color = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(["#B22222", "#fff", "#000080"]);

var x_scale = d3.scaleBand()
    .domain(indices)
    .range([0, chart_width]);

var y_scale = d3.scaleBand()
    .domain(indices)
    .range([0, chart_height]);


// Create SVG Element
// svg要素直下でtransfromしておけば下位要素にもtransformが適用される
var svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// X-axis
var x_axis = d3.axisBottom(x_scale);
var y_axis = d3.axisLeft(y_scale);

svg.append("g")
   .attr("class", "xaxis")
   .attr("transform", `translate(0, ${chart_height})`)
   .call(x_axis)
   .selectAll('text')
   .attr('transform', "rotate(-45)");

svg.append("g")
   .attr("class", "yaxis")
   .call(y_axis);


svg.selectAll(".fname")
    .data(middleData)
    .enter()
    .append("circle")
    .attr("class", "fname")
    .attr("cx", (d) => {
        return x_scale(d.x) + x_scale.bandwidth()/2;
    })
    .attr("cy", (d)=>{
        return y_scale(d.y) + y_scale.bandwidth()/2;
    })
    .attr("fill", "lightgrey")
    .attr("r", x_scale.bandwidth()/4)

// Create chart2
var svg = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
