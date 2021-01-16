// set the dimensions and margins of the graph
d3.csv("../csv_data/total_medals_data.csv").then(d => chart(d))
function chart(csv) {
    var keys = csv.columns.slice(2);
    var olympic = [...new Set(csv.map(d => d.Olympic))]
    var noc = [...new Set(csv.map(d => d.NOC))]
    var options = d3.select("#olympic").selectAll("option")
        .data(olympic)
        .enter().append("option")
        .text(d => d)
    var svg = d3.select("#chart"),
        margin = { top: 20, left: 50, bottom: 30, right: 10 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([margin.top, height - margin.bottom])
        .padding(0.1)
        .paddingOuter(0.2)
        .paddingInner(0.2)

    var x = d3.scaleLinear()
        .range([margin.left, width - margin.right])

    var yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis")



    var xAxis = svg.append("g")
        .attr("transform", `translate(0,${margin.top})`)
        .attr("class", "x-axis")

    var z = d3.scaleOrdinal()
        .range(["#FF9900", "#C0C0C0", "#FFD700"])
        .domain(keys);
    //////////////////////////
    var tooltip = d3.select("chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "1px")
        .style("padding", "1px")
    /////////////////////////////////
    var mouseover = function (d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("Medal Type: " + subgroupName + "<br>" + "Total Medals: " + subgroupValue)
            .style("opacity", 1)
    }
    ///////////////////////////////////////////
    var mousemove = function (d) {
        tooltip
            .style("left", (d3.mouse(this)[1] + 120) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.mouse(this)[2]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }
    update(d3.select("#olympic").property("value"), 0)
    function update(input, speed) {
        var data = csv.filter(f => f.Olympic == input)
        data.forEach(function (d) {
            d.total = d3.sum(keys, k => +d[k])
            return d
        })
        x.domain([0, d3.max(data, d => d.total)]).nice();
        svg.selectAll(".x-axis").transition().duration(speed)
            .call(d3.axisTop(x).ticks(null, "s"))
        data.sort(d3.select("#sort").property("checked")
            ? (a, b) => b.total - a.total
            : (a, b) => noc.indexOf(a.NOC) - noc.indexOf(b.State))
        y.domain(data.map(d => d.NOC));

        svg.selectAll(".y-axis").transition().duration(speed)
            .call(d3.axisLeft(y).tickSizeOuter(0))
        var group = svg.selectAll("g.layer")
            .data(d3.stack().keys(keys)(data), d => d.key)
        group.exit().remove()
        group.enter().insert("g", ".y-axis").append("g")
            .classed("layer", true)
            .attr("fill", d => z(d.key));
        var bars = svg.selectAll("g.layer").selectAll("rect")
            .data(d => d, e => e.data.NOC);
        bars.exit().remove()

        bars.enter().append("rect")
            .attr("height", y.bandwidth())
            .merge(bars)
            .transition().duration(speed)
            .attr("y", d => y(d.data.NOC))
            .attr("x", d => x(d[0]))
            .attr("width", d => x(d[1]) - x(d[0]))
        var text = svg.selectAll(".text")
            .data(data, d => d.NOC);
        text.exit().remove()

        text.enter().append("text")
            .attr("class", "text")
            .attr("text-anchor", "start")
            .merge(text)
            .transition().duration(speed)
            .attr("y", d => y(d.NOC) + y.bandwidth() / 2)
            .attr("x", d => x(d.total) + 5)
            .text(d => d.total)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        //
        /////////////////
        
    }



    var select = d3.select("#olympic")
        .on("change", function () {
            update(this.value, 750)
        })
    var checkbox = d3.select("#sort")
        .on("click", function () {
            update(select.property("value"), 750)
        })

}