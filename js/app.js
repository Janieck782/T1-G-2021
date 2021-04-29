var nodes, edges, network, matrix;
const INF = Number.MAX_SAFE_INTEGER;

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
  var nodir = document.getElementById("nodir");
  var dirigido = document.getElementById("dirigido");
  if (nodir.checked == true) {
    try {
      edges.add({
        id: document.getElementById("edge-id").value,
        from: document.getElementById("edge-from").value,
        to: document.getElementById("edge-to").value,
      });
    } catch (err) {
      alert(err);
    }
  } else if (dirigido.checked == true) {
    try {
      edges.add({
        id: document.getElementById("edge-id").value,
        from: document.getElementById("edge-from").value,
        to: document.getElementById("edge-to").value,
        arrows: "to",
      });
    } catch (err) {
      alert(err);
    }
  }
}

function updateEdge() {
  try {
    edges.add({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
      arrows: "to",
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
    { id: "1", label: "Node 1" },
    { id: "2", label: "Node 2" },
    { id: "3", label: "Node 3" },
    { id: "4", label: "Node 4" },
    { id: "5", label: "Node 5" },
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

  var nodir = document.getElementById("nodir");
  var dirigido = document.getElementById("dirigido");

  if(nodir.checked == true){
    edges.add([
      { id: "1", from: "1", to: "2",},
      { id: "2", from: "1", to: "3",},
      { id: "3", from: "2", to: "4",},
      { id: "4", from: "2", to: "5",},
    ]);
  } else if(dirigido.checked == true) {
    edges.add([
      { id: "1", from: "1", to: "2", arrows: "to"},
      { id: "2", from: "1", to: "3", arrows: "to"},
      { id: "3", from: "2", to: "4", arrows: "to"},
      { id: "4", from: "2", to: "5", arrows: "to"},
    ]);
  }
  

  // create a network
  var container = document.getElementById("mynetwork");

  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  network = new vis.Network(container, data, options);
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

  let matrix = new Array(nodes.length);

  for (let i = 0; i < (nodes.length); i++) {
    matrix[i] = new Array(nodes.length);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0;
    }
  }

  for (let c = 0; c < matrix.length; c++) {
    for (let i = 0; i < (matrix.length); i++) {
      for (let j = 0; j < (matrix[i].length); j++) {
        if (i+1 === mapfrom[c] && j+1 === mapto[c]) {
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

  dist = matrix;
    for (let i = 0; i < nodes.length ; i++){
        for (let j = 0; j < nodes.length; j++){
            if (i != j && dist[i][j] === 0) dist[i][j] = INF; 
            //las parejas de nodos sin arco están a distancia inf (p.e. 1e9)
        }
    }

    for (var k = 0; k < nodes.length; k++){ //por cada nodo intermedio k
        for (var i = 0; i < nodes.length; i++){
            for (var j = 0; j < nodes.length; j++){ //miramos todas las parejas de nodos
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                //Si pasando por k mejoramos el resultado, lo actualizamos
            }
        }
    }
    console.log(dist);
}

window.addEventListener("load", () => {
    draw();
  });