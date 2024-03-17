import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Random dataset of x and y values --TESTING--
let randomData = [];
// Current x value --TESTING--

// Transistion instance used for animation

// Function for updating the graph
export default class Graph {

    constructor(width, height, marginObj, container, dataset, [xAxisLabel, yAxisLabel], [graphColorBottom, graphColorTop], id) {

        this.id = id;
        this.globX = 0  
        this.globY = 0

        // iinitializes the dataset for this graph
        this.dataset = [];

        this.maxY = d3.max(this.dataset, (d) => { return d.y});

        //console.log(this.dataset)

        // Set the high bound for the domain, based off the highest x value in the dataset
        this.higherDomainBound = d3.max(this.dataset, (d) => { return d.x});

        this.lowerDomainBound = 0;

        this.domainLength = Infinity;

        this.filteredData = this.dataset.filter((d) => { if (d.x >= this.lowerDomainBound) { return d.x}})

        // Defines the margin, width, height, and container for the object
        this.margin = marginObj;
        this.width = width;
        this.height = height;
        this.container = document.querySelector(container);


        // Defines the initial x-scale for the object
        this.xScale = d3.scaleLinear(d3.extent(this.dataset, (d) => { return d.x}), [this.margin.left, width - this.margin.right]);

        // Defines the initial y-scale for the object
        this.yScale = d3.scaleLinear(d3.extent(this.dataset, (d) => { return d.y}), [height - this.margin.bottom, this.margin.top]);

        // Definies the svg for this object
        this.svg = d3.create('svg')
        .attr("width", width)
        .attr("height", height)
        .attr("color", "white")
        .attr("class", "svg");

        this.gradient = this.createGradient([graphColorBottom, graphColorTop]);

        //console.log(this.gradient)

        // Definies and creaates the axes for this object
        this.xAxis = this.createXAxis("xAxis");
        this.yAxis = this.createYAxis("yAxis");

        // Defines the axis labels for the object
        this.xAxisLabel = this.createAxisLabel("x", "axisLabel", xAxisLabel);
        this.yAxisLabel = this.createAxisLabel("y", "axisLabel", yAxisLabel);


        // Defines the line path for this object
        this.linePath = this.createLine();

        // Defines the area path for this object
        this.areaPath = this.createArea();

        // datapoint circles
        this.circles = this.createCircles("white");

    }

    create() {
        // Append the chart to the container
        this.container.append(this.svg.node());


        // Interval that updates the graph every 1 second --USED FOR TESTING--
        setInterval(() => {
            this.update(this.dataset);
        }, 1000);
    }

    update() {

        
        // Global x and y values --USED FOR TESTING--
        this.globX += Math.round(Math.random()*10);
        this.globY += Math.round(Math.random()*10);

        // Pushes the global values to the dataset --USED FOR TESTING--
        this.dataset.push({x: this.globX, y: this.globY});

        this.maxY = d3.max(this.dataset, (d) => { return d.y});
        

        // Set the high bound for the domain, based off the highest x value in the dataset
        this.higherDomainBound = d3.max(this.dataset, (d) => { return d.x});

        // Sets the low bound for the domain, based off (higherDomainBound - domainLength)
        // If the domain Length results in a zero or negative lowerDomainBound, then it will to the full domain;
        // I fthe difference in higherDomainBound - domainLength is < 10, then the lowerDomainBound will = 10;
        this.lowerDomainBound = (() => {
            if ((this.higherDomainBound - this.domainLength) <= 1) {

                return 0;

            } else if ((this.higherDomainBound - this.domainLength) > (this.higherDomainBound - 10)) {

                return this.higherDomainBound - 10;

            } else {

                return this.higherDomainBound - this.domainLength;

            }
        })()

        this.filteredData = this.dataset.filter((d) => { if (d.x >= this.lowerDomainBound) { return d.x}})


        // Re-definies the x and y scales for this object
        this.xScale = d3.scaleLinear([this.lowerDomainBound, this.higherDomainBound], [this.margin.left, this.width - this.margin.right]);
        this.yScale = d3.scaleLinear(d3.extent(this.filteredData, (d) => { return d.y}), [this.height - this.margin.bottom, this.margin.top]);


        // Creates a new line generator
        let lineGen = d3.line()
        .x((d) => this.xScale(d.x))
        .y((d) => this.yScale(d.y))

        // Creates a new area generator
        let areaGen = d3.area()
        .x((d) => this.xScale(d.x))
        .y0(this.yScale(d3.min(this.filteredData, (e) => {return e.y})))
        .y1((d) => this.yScale(d.y));

        // Calls this objects axes using the objects new scales
        // Ticks: 10 if the highest # is <= 100; else, the tick count = 5
        this.xAxis.transition().duration(250).call(d3.axisBottom(this.xScale).ticks((() => {
            if (this.higherDomainBound >= 100) {
                return 5;
            }

            return 10;
        })()));
        this.yAxis.transition().duration(250).call(d3.axisLeft(this.yScale));

        // Resets the datum used for this object's line path and redraws the line
        // Adds transition to the line
        this.linePath.datum(this.filteredData)
        this.linePath.transition().duration(250).attr("d", lineGen);

        // Resets the datum used for this object's area path and redraws the area
        // Adds transition to the area
        this.areaPath.datum(this.filteredData)
        this.areaPath.transition().duration(250).attr("d", areaGen);


        // Adds circles to all the new data points
        this.circles = this.createCircles("white");
        this.circles.transition().duration(250);
    }

    // function for changing the data points that are displayed on the graph
    // Starts from the highest x value
    changeDomain(domainLength) {
        this.domainLength = domainLength;

        this.filteredData = this.dataset.filter((d) => { if (d.x >= this.lowerDomainBound) { return d.x}})
    }

    // Creates a label for one axis of the graph
    // axis = "x" or "y"
    createAxisLabel(axis, className, label){
        let axisLabel = this.svg.append("text")
        .attr("class", className)
        .attr("text-anchor", "middle")
        .attr("y", (axis == 'x') ? (this.height - (this.margin.bottom + 8)) : this.margin.left + this.height/6)
        .attr("x", (axis == 'x') ? ((this.width)/2) : (this.height - this.margin.bottom - this.margin.top)/2)
        .text(label);

        if (axis !== 'x'){
            axisLabel
                .attr("transform-origin", "center")
                .attr("transform", "rotate(-90)");
        }

        return axisLabel;
    }

    // creates a line of specified color using this graph's data
    createLine(){
        
        //line generator
        let lineGen = d3.line()
        .x((d) => this.xScale(d.x))
        .y((d) => this.yScale(d.y))

        // line path generator
        let lineSVG = this.svg.append("path")
        .datum(this.dataset)
        .attr("d", lineGen)
        .style("stroke", `url(#${this.id}-lineGradient)`)
        .attr('stroke-width', '2px')
        .attr("fill", "none")
        .attr("class", "line");

        return lineSVG;

    }

    // creates an area of specified color using this graph's data
    createArea(){
        let areaGen = d3.area()
        .x((d) => this.xScale(d.x))
        .y0(this.yScale(d3.min(this.dataset, (e) => {return e.y})))
        .y1((d) => this.yScale(d.y));

        // area path generator
        let areaSVG = this.svg.append("path")
            .datum(this.dataset)
            .attr("d", areaGen)
            .attr("stroke", "none")
            .attr('fill', `url(#${this.id}-lineGradient)`)
            .attr("fill-opacity", "0.3")
            .attr("class", "area");

        return areaSVG;
    }

    // creates circles at each of the data points using this graph's data
    createCircles(color){
        let circle = this.svg.selectAll("circle")
        .data(this.filteredData)
        .join("circle")
        .attr("r", 2.5)
        .attr("cx", (d) => {return this.xScale(d.x)})
        .attr("cy", (d) => {return this.yScale(d.y)})
        .attr("fill", color)
        .attr('fill-opacity', '0.8');

        return circle;
    }

    // creates the x-axis using this.xScale
    createXAxis(className){
        let xAxis = this.svg.append("g")
        .attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
        .attr("class", className)
        .call(d3.axisBottom(this.xScale));

        return xAxis;
    }

    // creates the y-axis using this.yScale
    createYAxis(className){
        let yAxis = this.svg.append("g")
        .attr("transform", `translate(${this.margin.left}, 0)`)
        .attr("class", className)
        .call(d3.axisLeft(this.yScale));

        return yAxis;
    }

    // Creates gradient tag to be applied to line and area paths
    createGradient([bottomColor, topColor]){
        let gradient = this.svg.append('defs').append(`linearGradient`)
        .attr('id', `${this.id}-lineGradient`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
        
        gradient.append('stop')
        .attr('offset', '0%')
        .style('stop-color', topColor)
        .style('stop-opacity', 1);
        
        gradient.append('stop')
        .attr('offset', '100%')
        .style('stop-color', bottomColor)
        .style('stop-opacity', 1);

        return gradient;
    }

    resize(width, height){
        this.svg
        .attr('width', width)
        .attr('height', height);


        this.width = width;
        this.height = height;



        console.log(this.width/2);
        this.xAxisLabel.attr("x", this.width/2);
        this.xAxisLabel.attr("y", (this.height - (this.margin.bottom + 8)))
        
        console.log(this.width/2);
        this.yAxisLabel.attr("x", (this.height - this.margin.bottom - this.margin.top)/2);
        this.yAxisLabel.attr("y", this.margin.left + this.height/6)


        this.xAxis.attr("transform", `translate(0, ${this.height - this.margin.bottom})`);

        
        this.yAxis.attr("transform", `translate(${this.margin.left}, 0)`);

        this.update();

        
        
    }
}