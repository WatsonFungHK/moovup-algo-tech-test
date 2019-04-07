function Graph() { 
  this.adjacent = new Map();
  this.possiblePaths = [];
  this.visited = {};
} 

Graph.prototype.addNode = function(node) {
  this.adjacent.set(node, []);
}

Graph.prototype.addEdge = function(fromNode, toNode) {
  this.adjacent.get(fromNode).push(toNode);
  this.adjacent.get(toNode).push(fromNode);
}

Graph.prototype.printGraph = function() {
  var keys = this.adjacent.keys(); 

  for (var i of keys) { 
    var values = this.adjacent.get(i); 
    console.log(`${i} is connected with ${values}.`);
  }
}

Graph.prototype.findAllPaths = function(starting, destination) {
  this._findAllPathsUtil(starting, destination);
  return this.possiblePaths;
}

Graph.prototype._findAllPathsUtil = function(starting, destination, path = []) {
  if (!this.visited[starting]) {
    this.visited[starting] = true;
    path.push(starting);
    if (starting === destination) {
      this.possiblePaths.push([...path])
    } else {
      var neighbours = this.adjacent.get(starting);
      for (var neighbour of neighbours) { 
        if (!this.visited[neighbour]) {
          this._findAllPathsUtil(neighbour, destination, path); 
        }
      } 
    }
  }
  path.pop();
  this.visited[starting] = false;
}

Graph.prototype.findShortestPath = function() {
  var shortest = this.possiblePaths.reduce((p, c) => p.length > c.length ? c : p)
  return shortest;
}

var graph = new Graph();

graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addNode('F');
graph.addNode('G');
graph.addNode('H');

graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'H');
graph.addEdge('B', 'D');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('C', 'F');
graph.addEdge('D', 'E');
graph.addEdge('E', 'H');
graph.addEdge('F', 'E');
graph.addEdge('F', 'G');
graph.addEdge('G', 'H');

// graph.printGraph(); // for checking node connection

console.log('All possible paths between A to H: \n', graph.findAllPaths('A', 'H'));

console.log('The shortest path between A to H: \n', graph.findShortestPath());