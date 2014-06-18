//Needs refactor.  Minimum viable product indeed!
var aTree;


//enter d3 stage left
var margin = {top: 20, right: 120, bottom: 20, left: 120},
 width = 1600 - margin.right - margin.left,
 height = 700 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tree = d3.layout.tree()
 .size([height, width]);

/*var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });*/

var i = 0;


function update() {

  // Makes d3 tree using mysterious d3 blackbox
  var nodes = tree.nodes(aTree),
  links = tree.links(nodes);

  // Normalize for fixed-depth
  nodes.forEach(function(d) { d.y = d.depth * 200; });

  // attach data to nodes
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("g")
   .attr("class", "node");

  nodeEnter.append("circle")
   .attr("r", 10)
   .style("fill", "#fff")
   .style("opacity", 0)
   .transition().style("opacity", 1);

  nodeEnter.append("text")
   .attr("x", function(d) { 
    return d.children || d._children ? -13 : 13; })
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { 
    return d.children || d._children ? "end" : "start"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 0)
   .transition().style("fill-opacity", 1);

  node.attr("transform", function(d) { 
    return "translate(" + d.y + "," + d.x + ")"; });

  // start work on links
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  link.enter().append("path", "g")
   .attr("class", "link");

  link.attr("d", elbow);

  node.exit().transition()
      .duration(100)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .remove();

  link.exit().transition()
      .duration(100)
      .remove();

  // M, H and V are mystery letters
  function elbow(d, i) {
    return "M" + d.source.y + "," + d.source.x
         + "H" + d.target.y + "V" + d.target.x
         + (d.target.children ? "" : "h" + margin.right);
  }

}

//activates on enter
$("#pusher").on("keypress", function(event) {
    if(event.which == 13) {
        event.preventDefault();
        val = $(this).val();
        if (parseInt(val) == val){
          if (aTree === undefined){
            aTree = new BinarySearchTree(val);
          }
          aTree.push(val);
          update();
        }
        $(this).val("")
    }
});
