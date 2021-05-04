var nodes, edges, network, matrix, camino, matrixcamino, options;
var nodir, dirigido;
const INF = Number.MAX_SAFE_INTEGER;

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
    { id: "1", from: "1", to: "2", label: "2" },
    { id: "2", from: "1", to: "3", label: "1" },
    { id: "3", from: "2", to: "4", label: "4" },
  ]);

  // create a network
  var container = document.getElementById("mynetwork");

  var data = {
    nodes: nodes,
    edges: edges,
  };
  options = {
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
  console.log("Desde");
  console.log(mapfrom);

  var mapto = edges.map((edge) => edge.to);
  console.log("Hasta");
  console.log(mapto);

  var maplabel = edges.map((edge) => edge.label);
  console.log("Peso");
  console.log(maplabel);

  for (i = 0; i < mapfrom.length; i++) {
    mapfrom[i] = +mapfrom[i];
  }

  for (i = 0; i < mapto.length; i++) {
    mapto[i] = +mapto[i];
  }

  for (i = 0; i < maplabel.length; i++) {
    maplabel[i] = +maplabel[i];
  }

  var long_nodo = nodes.length;

  matrix = new Array(long_nodo + 1);

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
            matrix[i][j] = maplabel[c];
            matrix[j][i] = maplabel[c];
          }
        }
      }
    }
  } else if (dirigido.checked == true) {
    for (c = 0; c <= matrix.length; c++) {
      for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrix[i][j] = maplabel[c];
          }
        }
      }
    }
  }

  console.log("Matriz de Adyacencia");
  console.log(matrix);

  for (i = 0; i < matrix.length; i++) {
    var newRow = Table.insertRow(Table.length);
    for (j = 0; j < matrix[i].length; j++) {
      var cell = newRow.insertCell(j);

      cell.innerHTML = matrix[i][j];
    }
  }
}
/*
function matrizPeso(){
  matrixpeso = JSON.parse(JSON.stringify(matrix));

  // matrixpeso = matrix.slice();
  var maplabel = edges.map((edge) => edge.label);

 for (i = 0; i < maplabel.length; i++) {
   maplabel[i] =+ Number.parseInt(maplabel[i]);
 }
 console.log("Matriz Peso antes");
 console.log(matrixpeso);
 console.log("Pesos");
 console.log(maplabel);

 let x=0;
  for (let i = 1; i < matrixpeso.length; i++) {
    for (let j = 1; j < matrixpeso.length; j++) {
      if (matrixpeso[i][j] != 0 && matrixpeso[j][i]!=0) {
        matrixpeso[i][j] = maplabel[x];
        matrixpeso[j][i] = maplabel[x];
        x++;
      }
    }
  }
  console.log("Matriz Peso")
  console.table(matrixpeso);

  return matrixpeso;
}
*/
/*
function conexo(){  
  document.getElementById("conexo").innerHTML = '';

  var x = 0;
  mat = JSON.parse(JSON.stringify(matrixcamino));

  // var mat = matrixcamino.slice();

  if (mat.length > 0) {
    for(let i =1; i < mat.length; i++){
      for(let j =1; j < mat.length; j++){
        if(mat[i][j]  == 0 && mat[j][i] == 0){
          x++;
        }
      }
    }
    // if(x == 0)
    //   return true;
    // else
    //   return false+

    return x == 0;
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
*/
/*
function caminoreal() {
  var tabla2 = document.getElementById("tablacaminomatriz");
  tabla2.innerHTML = "";
  let k, i, j, n, m, c;
  var maplabel = edges.map((edge) => edge.label);
  for (i = 0; i < maplabel.length; i++) {
    maplabel[i] = +maplabel[i];
  }


  matrixcamino = JSON.parse(JSON.stringify(matrix));
  // matrixcamino = matrix.slice();

  // for (k = 0; k <= matrixcamino.length; k++) {
  //   for (i = 0; i <= matrixcamino.length; i++) {
  //     for (j = 0; j <= matrixcamino.length; j++) {
  //       matrixcamino[i][j] = matrizcamino(i, j, k);

  //     }
  //   }
  // }
  console.log("Matix camino ");
  console.log(matrixcamino);
  console.log(maplabel);

  if (nodir.checked == true) {
    for (c = 1; c <= matrixcamino.length; c++) {
      for (i = 1; i < matrixcamino.length; i++) {
        for (j = 1; j < matrixcamino[i].length; j++) {
          if (matrixcamino[i][c] + matrixcamino[c][j] < matrixcamino[i][j])
               matrixcamino[i][j] = matrixcamino[i][c] + matrixcamino[c][j];
          }
        }
      }
    } else if (dirigido.checked == true) {
    for (c = 0; c <= matrixcamino.length; c++) {
      for (i = 0; i <= matrixcamino.length; i++) {
        for (j = 0; j <= matrixcamino[i].length; j++) {
          if (matrixcamino[i][j] == maplabel[c] || matrixcamino[i][c] == 1 && matrixcamino[c][j] == 1) {
            matrixcamino[i][j] = 1;
          }
        }
      }
    }
  }

  // NOMBRES DE FILAS Y COLUMNAS
  // matrixcamino[0][0] = "-";

  // for (i = 1; i < matrixcamino.length; i++) {
  //   matrixcamino[i][0] = "Nodo " + i;
  // }

  // for (j = 1; j < matrixcamino.length; j++) {
  //   matrixcamino[0][j] = "Nodo " + j;
  // }
  //FIN NOMBRES FILASXCOLUMNAS
  for (n = 0; n < matrixcamino.length; n++) {
    var newRow = tabla2.insertRow(tabla2.length);
    for (m = 0; m < matrixcamino[n].length; m++) {
      var cell = newRow.insertCell(m);

      cell.innerHTML = matrixcamino[n][m];
    }
  }
  console.log("Matriz camino ");
  console.log(matrixcamino);
}
*/
/*
function matrizcamino(i, j, k) {
  if (matrix[i][j] == maplabel[k] || matrix[i][k] == maplabel[k] && matrix[k][j] == maplabel[k]) {
    return 1;
  }
  else {
    return 0;
  }
}
*/

function kruskal() {
  const aux = matrix.length;
  const parent = [];
  let ne = 0;
  let a; let b; let u; let v;

  cost = JSON.parse(JSON.stringify(matrix));
  const cost = matrix.slice(); // {1}
  while (ne < a - 1) { // {2}
    for (let i = 1, min = INF; i < aux; i++) { // {3}
      for (let j = 1; j < aux; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }
    u = find(u, parent); // {4}
    v = find(v, parent); // {5}
    if (union(u, v, parent)) { // {6}
      ne++;
    }
    cost[a][b] = cost[b][a] = INF; // {7}
  }
  console.log(parent);
};

const find = (i, parent) => {
  while (parent[i]) {
    i = parent[i];
  }
  return i;
};

const union = (i, j, parent) => {
  if (i !== j) {
    parent[j] = i;
    return true;
  }
  return false;
};



const minDistance = (dist, visited) => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
}; 

const dijkstra = (matrix, ori, end) => {
  mat_aux = JSON.parse(JSON.stringify(matrix));
  const dist = [];
  const visited = [];
  const aux = mat_aux.length;
  dist[0] = "Camino";
  for (let i = 1; i < mat_aux.length; i++) { // {1}
    dist[i] = INF;
    visited[i] = false;
  }
  dist[ori] = 0; // {2}
  for (let i = 1; i < aux - 1; i++) { // {3}
    const u = minDistance(dist, visited); // {4}
    visited[u] = true; // {5}
    for (let v = 1; v < aux + 1; v++) {
      if (!visited[v] && mat_aux[u][v] !== 0 && dist[u] !== INF && dist[u] + mat_aux[u][v] < dist[v]) { // {6}
        dist[v] = dist[u] + mat_aux[u][v]; // {7}
        console.log(mat_aux[u][0]);
      }
    }
  }
  console.log("hola");
  return dist; // {8}
  
};

function Imprime() {
  let aux = dijkstra(matrix, 4);
  console.log(aux);
}


/*
  EVENTOS
*/
window.addEventListener("load", () => {
  draw();
  Adj();
  // caminoreal();
  // imprimir_conexo();
});