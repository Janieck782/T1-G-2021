var nodes, edges, network, matrix;

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}




function addNode() {
  try {
    nodes.add({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value,
    });
  } catch (err) {
    alert(err);
  }
}

function updateNode() {
  try {
    nodes.update({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value,
    });
  } catch (err) {
    alert(err);
  }
}
function removeNode() {
  try {
    nodes.remove({ id: document.getElementById("node-id").value });
  } catch (err) {
    alert(err);
  }
}

function addEdge() {
  try {
    edges.add({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
    });
  } catch (err) {
    alert(err);
  }
}

function updateEdge() {
  try {
    edges.update({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
    });
  } catch (err) {
    alert(err);
    }
}

function removeEdge() {
  try {
    edges.remove({ id: document.getElementById("edge-id").value });
  } catch (err) {
    alert(err);
  }
}

function draw() {
  // create an array with nodes
  nodes = new vis.DataSet();
  nodes.on("*", function () {
    document.getElementById("nodes").innerText = JSON.stringify(
      nodes.get(),
      null,
      4
    );
  });

  nodes.add([
    { id: "1", label: "Nodo 1" },
    { id: "2", label: "Nodo 2" },
    { id: "3", label: "Nodo 3" },
    { id: "4", label: "Nodo 4" },
    { id: "5", label: "Nodo 5" },
  ]);

  // create an array with edges
  edges = new vis.DataSet();
  edges.on("*", function () {
    document.getElementById("edges").innerText = JSON.stringify(
      edges.get(),
      null,
      4
    );
  });

  edges.add([
    { id: "1", from: "1", to: "2" },
    { id: "2", from: "1", to: "3" },
    { id: "3", from: "2", to: "4" },
    { id: "4", from: "2", to: "5" },
  ]);

  // create a network
  var container = document.getElementById("mynetwork");

  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    "nodes": {
      
      "shape": "circle",
      
    },
    edges:{
      arrows:{
        to:{
          enabled: false,
        }
      }
    },
    configure:{
      enabled: false,
      container: document.getElementById("parametross"),
      showButton: true,
    },
    //permite interactuar con el grafo
    "manipulation": {
      "enabled": false,
      "initiallyActive": false
  },
  
};
  network = new vis.Network(container, data, options);
  }

  function direv(){
    var nodir = document.getElementById("nodir");
    var dirigido = document.getElementById("dirigido");
    if (nodir.checked == true) {
      try {
        options = {
          edges:{
            arrows:{
              to:{
                enabled: false,
              }
            }
          },
        
      };
      network.setOptions(options);
      } catch (err) {
        alert(err);
      }
    } else if (dirigido.checked == true) {
      try {
         options = {
          edges:{
            arrows:{
              to:{
                enabled: true,
              }
            }
          },
        
      };
      network.setOptions(options);
      } catch (err) {
        alert(err);
      }
    }
  
  }


function UpdMatrix() {
  var Table = document.getElementById("table");
  Table.innerHTML = "";
  var mapfrom = edges.map((edges) => edges.from);
  console.log(mapfrom);

  var mapto = edges.map((edges) => edges.to);
  console.log(mapto);

  for (var i = 0; i < mapfrom.length; i++) {
    mapfrom[i] = +mapfrom[i];
  }

  for (var i = 0; i < mapto.length; i++) {
    mapto[i] = +mapto[i];
  }

  var from = mapfrom.reverse();
  var to = mapto.reverse();

  var a = nodes.length;

  let matrix = new Array(a + 1);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrix.length);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0;
    }
  }

  for(let i = 0;i < matrix.length;i++) {
    matrix[i][0] = i;
  }

  for(let j = 0;j < matrix.length;j++) {
    matrix[0][j] = j;
  }

  for (let c = 0; c <= matrix.length; c++) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i === mapfrom[c] && j === mapto[c]) {
          matrix[i][j] = 1;
        }
      }
    }
  }

  console.log(matrix);

   for (var i = 0; i < matrix.length; i++) {
     var newRow = table.insertRow(table.length);
     for (var j = 0; j < matrix[i].length; j++) {
       var cell = newRow.insertCell(j);

       cell.innerHTML = matrix[i][j];
     }
   }


   
}

window.addEventListener("load", () => {
    draw();
  });