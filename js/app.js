var nodes, edges, network, matrix, camino, matrixcamino, options;
var nodir, dirigido;
//matrix = ADYACENTE
//matrixcamino = CAMINO

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}


/*
  FUNCIONES DE VIS.JS
*/

function addNode() {
  try {
    nodes.add({
      id: document.getElementById("node-id").value,
      label: "Nodo " + document.getElementById("node-id").value,
    });
  } catch (err) {
    alert(err);
  }
}

function updateNode() {
  try {
    nodes.update({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-id").value,
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
      label: document.getElementById("label-to").value,
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
      label: document.getElementById("label-to").value,
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
    { id: "1", from: "1", to: "2", label: "1" },
    { id: "2", from: "1", to: "3", label: "1" },
    { id: "3", from: "2", to: "4", label: "1" },
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
    edges: {
      arrows: {
        to: {
          enabled: false,
        }
      }
    },
    /*configure:{
      enabled: false,
      container: null,
      showButton: true,
    },*/
    //permite interactuar con el grafo
    "manipulation": {
      "enabled": false,
      "initiallyActive": false
    },

  };
  network = new vis.Network(container, data, options);
}

/*
    Funcion para dirigir o no el grafo
*/

function direv() {
  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");

  if (nodir.checked == true) {
    try {
      options = {
        edges: {
          arrows: {
            to: {
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
        edges: {
          arrows: {
            to: {
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



/*
  FUNCIONES DE MATRIZ
*/


//Funcion para generar la matriz adyacente y su tabla correspondiente
function Adj() {
  let i, j, c;
  var Table = document.getElementById("tablamatrizadyacente");
  Table.innerHTML = "";

  var mapfrom = edges.map((edge) => edge.from);
  console.log(mapfrom);

  var mapto = edges.map((edge) => edge.to);
  console.log(mapto);

  for (i = 0; i < mapfrom.length; i++) {
    mapfrom[i] = +mapfrom[i];
  }

  for (i = 0; i < mapto.length; i++) {
    mapto[i] = +mapto[i];
  }

  var a = nodes.length;

  matrix = new Array(a + 1);

  for (i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrix.length);
  }

  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0;
    }
  }

  matrix[0][0] = "-";

  for (i = 1; i < matrix.length; i++) {
    matrix[i][0] = "Nodo " + i;
  }

  for (j = 1; j < matrix.length; j++) {
    matrix[0][j] = "Nodo " + j;
  }

  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");

  if (nodir.checked == true) {
    for (c = 0; c <= matrix.length; c++) {
      for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrix[i][j] = 1;
            matrix[j][i] = 1;
          }
        }
      }
    }
  } else if (dirigido.checked == true) {
    for (c = 0; c <= matrix.length; c++) {
      for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrix[i][j] = 1;
          }
        }
      }
    }
  }

  for (i = 0; i < matrix.length; i++) {
    var newRow = Table.insertRow(Table.length);
    for (j = 0; j < matrix[i].length; j++) {
      var cell = newRow.insertCell(j);

      cell.innerHTML = matrix[i][j];
    }
  }
}


function conexo(){  
  document.getElementById("conexo").innerHTML = '';

  var x = 0;
  var mat = matrixcamino.slice();

  if (mat.length > 0) {
    for(let i =1; i < mat.length; i++){
      for(let j =1; j < mat.length; j++){
        if(mat[i][j]  == 0 && mat[j][i] == 0){
          x++;
        }
      }
    }
    if(x == 0){
      return true;
    }
    else{
      return false
    }
  }

}

function imprimir_conexo() {
  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");
  let a = conexo();


  if(a == true)
    document.getElementById("conexo").innerHTML +="<p> Este grafo es de tipo conexo</p>";
  else if(a == false) {
    document.getElementById("conexo").innerHTML +="<p> Este grafo es de tipo no conexo</p>";
  }
}

function caminoreal() {
  var tabla2 = document.getElementById("tablacaminomatriz");
  tabla2.innerHTML = "";

  matrixcamino = matrix.slice();

  for (let k = 0; k <= matrix.length - 1; k++) {
    for (let i = 0; i <= matrix.length - 1; i++) {
      for (let j = 0; j <= matrix.length - 1; j++) {
        matrixcamino[i][j] = matrizcamino(i, j, k);

      }
    }
  }
  // NOMBRES DE FILAS Y COLUMNAS
  matrix[0][0] = "-";

  for (i = 1; i < matrix.length; i++) {
    matrix[i][0] = "Nodo " + i;
  }

  for (j = 1; j < matrix.length; j++) {
    matrix[0][j] = "Nodo " + j;
  }
  //FIN NOMBRES FILASXCOLUMNAS
  for (var n = 0; n < matrix.length; n++) {
    var newRow = tabla2.insertRow(tabla2.length);
    for (var m = 0; m < matrix[n].length; m++) {
      var cell = newRow.insertCell(m);

      cell.innerHTML = matrix[n][m];
    }
  }
  console.log(matrixcamino);
}

function matrizcamino(i, j, k) {
  if (matrix[i][j] == 1 || matrix[i][k] == 1 && matrix[k][j] == 1) {
    return 1;
  }
  else {
    return 0;
  }
}
/*
  EVENTOS
*/
window.addEventListener("load", () => {
  draw();
  Adj();
  caminoreal();
  imprimir_conexo();
});