
// margin setting
const width = 430;
const height = 430;
const margin = {top: 20, right: 20, bottom: 20, left: 20};

const chart_width = width - margin.left - margin.right;
const chart_height = height - margin.top - margin.bottom;


//const data = {pd.DataFrame.to_json(orient="records", force_ascii=True)}
//const data = [{"CRIM":1.0,"ZN":-0.2004692197,"INDUS":0.4065834114,"CHAS":-0.0558915822},{"CRIM":-0.2004692197,"ZN":1.0,"INDUS":-0.5338281863,"CHAS":-0.0426967193},{"CRIM":0.4065834114,"ZN":-0.5338281863,"INDUS":1.0,"CHAS":0.0629380275},{"CRIM":-0.0558915822,"ZN":-0.0426967193,"INDUS":0.0629380275,"CHAS":1.0}]
const rawdata = {"CRIM":{"CRIM":1.0,"ZN":-0.2004692197,"INDUS":0.4065834114,"CHAS":-0.0558915822},"ZN":{"CRIM":-0.2004692197,"ZN":1.0,"INDUS":-0.5338281863,"CHAS":-0.0426967193},"INDUS":{"CRIM":0.4065834114,"ZN":-0.5338281863,"INDUS":1.0,"CHAS":0.0629380275},"CHAS":{"CRIM":-0.0558915822,"ZN":-0.0426967193,"INDUS":0.0629380275,"CHAS":1.0}}
const indices = Object.keys(rawdata)

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

var data = [{"idx": 1, "col": 1, "corr": 0.7}]

// Create SVG Element
// svg要素直下でtransfromしておけば下位要素にもtransformが適用される
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// X-axis
var x_axis = d3.axisBottom(x_scale);

svg.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0, ${chart_height})`) // 左上が(0,0)。 X軸をグラフの下部に表示するには、描画領域の高さ分下げる
   .call(x_axis); // scaleBandを設定

svg.selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("x", 33)
    .attr("y", 66)

