var BinarySearchTree = function(value){
  this.name = value;
  this.children = [{name: "null"}, {name:"null"}];
}

BinarySearchTree.prototype.push = function(value){
  var child = new BinarySearchTree(value);
  var compare = function(node){
    if(value < parseInt(node.name)){
      if(node.children[0].name === "null"){
        child.parent = node.name;
        node.children[0] = child;
      } else {
        compare(node.children[0]);
      }
    } else if (value > parseInt(node.name)){
        if(node.children[1].name === "null"){
          child.parent = node.name;
          node.children[1] = child;
       } else {
          compare(node.children[1]);
        }
      }
  }
  compare(this);
}
