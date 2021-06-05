var nodes, edges, network;
var matrix, camino, matrixcamino, matrixpeso, matrizcopia, grafoDijkstra, matrizpesoreal;
var mapfrom, mapto, maplabel;
var options;
var nodir, dirigido;

//matrix = ADYACENTE
//matrixcamino = CAMINO

function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}


/*
  FUNCIONES DE VIS.JS
*/

function addNode() {
  var aux = document.getElementById("node-id").value;
  try {
    nodes.add({
      id: aux,
      label: "Nodo " + document.getElementById("node-id").value,
    });
    console.trace("Nodo " + aux + " añadido");

  } catch (err) {
    alert(err);
    console.error(" Nodo " + aux + " ya existe");
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
  var aux = document.getElementById("node-id").value;
  console.log("Nodo " + aux + " actualizado");
}

function removeNode() {
  try {
    nodes.remove({
      id: document.getElementById("node-id").value
    });
  } catch (err) {
    alert(err);
  }
  var aux = document.getElementById("node-id").value
  console.log("Nodo " + aux + " eliminado");
}

function addEdge() {
  var aux = document.getElementById("edge-id").value;
  var aux1 = document.getElementById("edge-from").value;
  var aux2 = document.getElementById("edge-to").value;
  var aux3 = document.getElementById("label-to").value;
  try {
    edges.add({
      id: aux,
      from: aux1,
      to: aux2,
      label: aux3,
    });
    console.log("Arista " + aux + " desde el nodo " + aux1 + " hasta " + aux2 + " de peso " + aux3 + " añadida");
  } catch (err) {
    alert(err);
    console.error(" Arista " + aux + " ya existe");
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
  var aux = document.getElementById("edge-id").value;
  console.log("Arista " + aux + " actualizada");
}

function save_data() {
  let i;

  mapfrom = edges.map((edge) => edge.from);

  mapto = edges.map((edge) => edge.to);

  maplabel = edges.map((edge) => edge.label);

  for (i = 0; i < mapfrom.length; i++) {
    mapfrom[i] = +mapfrom[i];
  }

  for (i = 0; i < mapto.length; i++) {
    mapto[i] = +mapto[i];
  }

  for (i = 0; i < maplabel.length; i++) {
    maplabel[i] = +maplabel[i];
  }

}

function removeEdge() {
  var aux = document.getElementById("edge-id").value;

  try {
    edges.remove({
      id: aux
    });
    console.log("Arista " + aux + " removida");
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
    {
    
      id: "1",
      label: "Nodo 1"
  },
  {
      id: "2",
      label: "Nodo 2"
  },
  {
      id: "3",
      label: "Nodo 3"
  },
  {
      id: "4",
      label: "Nodo 4"
  },
  {
      id: "5",
      "label": "Nodo 5"
  },
  {
      id: "6",
      label: "Nodo 6"
  },
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

  edges.add([{
    id: "1",
    from: "1",
    to: "2",
    label: "12"
},
{
    id: "2",
    from: "2",
    to: "3",
    label: "23"
},
{
    id: "3",
    from: "1",
    to: "4",
    label: "14"
},
{
    id: "4",
    from: "4",
    to: "5",
    label: "20"
},
{
    id: "5",
    from: "5",
    to: "6",
    label: "15"
},
{
    id: "6",
    from: "3",
    to: "6",
    label: "12"
},
{
    id: "7",
    from: "2",
    to: "6",
    label: "8"
},
{
    id: "8",
    from: "3",
    to: "5",
    label: "16"
},
{
    id: "9",
    from: "2",
    to: "5",
    label: "13"
},
{
    id: "10",
    from: "1",
    to: "3",
    label: "20"
},
{
    id: "11",
    from: "2",
    to: "4",
    label: "7"
},
{
    id: "12",
    from: "4",
    to: "6",
    label: "9"
},
{
    id: "13",
    from: "1",
    to: "6",
    label: "25"
},
{
    id: "14",
    from: "1",
    to: "5",
    label: "15"
},
{
    id: "15",
    from: "3",
    to: "4",
    label: "16"
},
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
    for (c = 0; c <= edges.length; c++) {
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
    for (c = 0; c <= edges.length; c++) {
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

function matrizPeso() {
  let c, i, j;
  matrixpeso = JSON.parse(JSON.stringify(matrix));

  //   var maplabel = edges.map((edge) => edge.label);

  //  for (i = 0; i < maplabel.length; i++) {
  //    maplabel[i] = +maplabel[i];
  //  }

  // console.log("Matrix");
  // console.log(matrix);
  // console.log("Matriz Peso antes");
  // console.log(matrixpeso);
  // console.log("Pesos");
  // console.log(maplabel);

  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");

  if (nodir.checked == true) {
    for (c = 0; c <= edges.length; c++) {
      for (i = 0; i < matrixpeso.length; i++) {
        for (j = 0; j < matrixpeso[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrixpeso[i][j] = maplabel[c];
            matrixpeso[j][i] = maplabel[c];
          }
        }
      }
    }
  } else if (dirigido.checked == true) {
    for (c = 0; c <= edges.length; c++) {
      for (i = 0; i < matrixpeso.length; i++) {
        for (j = 0; j < matrixpeso[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrixpeso[i][j] = maplabel[c];
          }
        }
      }
    }
  }
  // console.log("Matriz Peso")
  // console.table(matrixpeso);
  return matrixpeso;
}

function conexo() {
  var x = 0;
  var mat = JSON.parse(JSON.stringify(matrixcamino));

  if (mat.length > 0) {
    for (let i = 1; i < mat.length; i++) {
      for (let j = 1; j < mat.length; j++) {
        if (mat[i][j] == 0 && mat[j][i] == 0) {
          x++;
        }
      }
    }
    return (x == 0);
  }
}

function imprimir_conexo() {
  console.log("Función conexo");
  document.getElementById("conexo").innerHTML = '';

  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");

  var a = conexo();
  if (a == true)
    document.getElementById("conexo").innerHTML += "<p> Este grafo es de tipo conexo</p>";
  else if (a == false) {
    document.getElementById("conexo").innerHTML += "<p> Este grafo es de tipo NO conexo</p>";
  }
}

function caminoreal() {
  let i, j, k, n, m;
  var tabla2 = document.getElementById("tablacaminomatriz");
  tabla2.innerHTML = "";

  matrixcamino = JSON.parse(JSON.stringify(matrix));

  // matrixcamino = matrix.slice();

  for (k = 0; k <= matrixcamino.length - 1; k++) {
    for (i = 0; i <= matrixcamino.length - 1; i++) {
      for (j = 0; j <= matrixcamino.length - 1; j++) {
        matrixcamino[i][j] = matriz_camino(i, j, k);

      }
    }
  }
  // NOMBRES DE FILAS Y COLUMNAS
  matrixcamino[0][0] = "-";

  for (i = 1; i < matrixcamino.length; i++) {
    matrixcamino[i][0] = "Nodo " + i;
  }

  for (j = 1; j < matrixcamino.length; j++) {
    matrixcamino[0][j] = "Nodo " + j;
  }
  //FIN NOMBRES FILASXCOLUMNAS
  for (n = 0; n < matrixcamino.length; n++) {
    var newRow = tabla2.insertRow(tabla2.length);
    for (m = 0; m < matrixcamino[n].length; m++) {
      var cell = newRow.insertCell(m);

      cell.innerHTML = matrixcamino[n][m];
    }
  }
}

function matriz_camino(i, j, k) {
  if (matrixcamino[i][j] == 1 || matrixcamino[i][k] == 1 && matrixcamino[k][j] == 1) {
    return 1;
  } else {
    return 0;
  }
}

function Hamilton() {
  let hamil = JSON.parse(JSON.stringify(matrix));
  var cont;
  var aux = nodes.length / 2;
  aux = Math.trunc(aux);

  if (nodes.length >= 3 && conexo() === true) {

    for (let i = 1; i < hamil.length; i++) {
      cont = 0;

      for (let j = 1; j < hamil.length; j++) {

        if (hamil[i][j] === 1) cont++;

      }

      if (cont < aux) return false;
    }
    return true;
  } else return false;

}

function imprimir_hamilton() {
  document.getElementById("hamilton").innerHTML = '';

  var a = Hamilton();

  if (a == true)
    document.getElementById("hamilton").innerHTML += "<p> Este grafo es Hamiltoniano</p>";
  else if (a == false) {
    document.getElementById("hamilton").innerHTML += "<p> Este grafo NO es Hamiltoniano</p>";
  }
}

function Eureliano() {
  let con = conexo();
  var cont;

  if(conexo() === false) return false;
  else if (con === true && nodir.checked === true) {
    for (let i = 1; i < matrix.length; i++) {
      cont = 0;

      for (let j = 1; j < matrix.length; j++) {

        if (matrix[i][j] === 1) cont++;
      }
      if (cont % 2 != 0) return false;
    }
    return true;
  }
}

function imprimir_eureliano() {
  document.getElementById("eureliano").innerHTML = " ";

  var a = Eureliano();

  if (a == true)
    document.getElementById("eureliano").innerHTML += "<p> Este grafo es Eureliano</p>";
  else if (a == false) {
    document.getElementById("eureliano").innerHTML += "<p> Este grafo NO es Eureliano</p>";
  }
}

function matrizpesor() {
  var matrizpesoreal = JSON.parse(JSON.stringify(matrixpeso));

  matrizpesoreal.shift();
  
  for (var i = 0; i < matrizpesoreal.length; i++) { matrizpesoreal[i].splice( 0, 1 ); }
  console.log("Matriz peso real: ");
  console.log(matrizpesoreal);
}

function bfs(rGraph, s, t, parent) {
  var visited = [];
  var queue = [];
  var V = rGraph.length;
  
  for(let i = 0; i < V; i++) {
    visited[i] = false;
  }

  queue.push(s);
  visited[s] = true;
  parent[s] = -1;

  while(queue.length != 0) {
    var u = queue.shift();
    for(let v = 0; v < V; v++) {
      if(visited[v] == false && rGraph[u][v] > 0) {
        queue.push(v);
        parent[v] = u;
        visited[v] = true;
      }
    }
  }

  return (visited[t] == true);
}

function fordFulkerson(graph, s, t) {
  console.log(graph);
  if (s < 0 || t < 0 || s > graph.length-1 || t > graph.length-1){
    return 0;
  }
  if(graph.length === 0){
    return 0;
  }
	var rGraph = [];
	for (var u = 0; u < graph.length; u++) {
		var temp = [];
    if(graph[u].length !== graph.length){
      return 0;
    }
		for (v = 0; v < graph.length; v++) {
			temp.push(graph[u][v]);
		}
		rGraph.push(temp);
	}
	var parent = [];
	var maxFlow = 0;

	while (bfs(rGraph, s, t, parent)) {
		var pathFlow = Number.MAX_VALUE;
		for (var v = t; v != s; v = parent[v]) {
			u = parent[v];
			pathFlow = Math.min(pathFlow, rGraph[u][v]);
		}
		for (v = t; v != s; v = parent[v]) {
			u = parent[v];
			rGraph[u][v] -= pathFlow;
			rGraph[v][u] += pathFlow;
		}

		maxFlow += pathFlow;
	}

	return maxFlow;
}

function fulker() {
  var ori = document.getElementById("nodoOrigen").value;
  var des = document.getElementById("nodoDestino").value;

  try {
    var aux = fordFulkerson(matrixpeso, ori,des)
  } catch (err) {
    alert(err);
  }

  document.getElementById("mostrarflujo").innerHTML = "";

  

  document.getElementById("mostrarflujo").innerHTML = "Flujo máximo: " + aux;
}

function resultadocaminomascorto(){
  document.getElementById("mostrarcaminomascorto").innerHTML = "";

  document.getElementById("mostrarcaminomascorto").innerHTML = "Nodos del camino más corto: "+camino;
}

function addConexion(nodoInicial, nodoFinal, valorDistancia) {
  valorDistancia = parseInt(valorDistancia, 10);

  var buscarNodo = grafoDijkstra.filter(item => item.origen === nodoInicial);
  if (buscarNodo.length === 0) {
    var conexion = [];
    conexion.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
    grafoDijkstra.push({
      origen: nodoInicial,
      conexiones: conexion
    });
  } else {
    buscarNodo[0].conexiones.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
  }

}

function shortestPath() {
  var nodoiaux, nodofaux;
  grafoDijkstra = new Array(nodes.length);
  var dataedge = edges.get();
  var enlaces;

  for (var xzy = 0; xzy < dataedge.length; xzy++) {
    addConexion(dataedge[xzy].from, dataedge[xzy].to, dataedge[xzy].label);
    addConexion(dataedge[xzy].to, dataedge[xzy].from, dataedge[xzy].label);
  }
  var g = new Graph();

  grafoDijkstra.forEach(function (value) {
    enlaces = {};

    value.conexiones.forEach(function (conexion) {
      enlaces[conexion.destino] = conexion.distancia;
    });
    nodoiaux = document.getElementsByName("nodoI")[0].value; //NodoInicial
    nodofaux = document.getElementsByName("nodoF")[0].value; //NodoFinal
    var i = nodoiaux.toString();
    var f = nodofaux.toString();
    g.addVertex(value.origen, enlaces);

    camino = g.shortestPath(i, f).concat(i).reverse();
  });
  console.log(" Función camino más corto entre nodo " + nodoiaux + " y nodo " + nodofaux);

  // console.log('pruebcamino', camino);
}


function Kruskal() {

  var nodoA = new Array(),
    nodoB = new Array(),
    arcos = new Array(),
    minimo = 1000;
  matrixKruskal = JSON.parse(JSON.stringify(matrixpeso));
  console.log("Kruskal");
  console.log(matrixKruskal);
  var nodeaux;
  var aux = 1;
  var longitud = matrixKruskal.length;
  var fico = 1;

  for (let k = 1; k < nodes.length; k++) {
    for (let j = 1; j < longitud; j++){
      
        if (aux % 2 == 0) {
          if (matrixKruskal[fico][j] < minimo && matrixKruskal[fico][j] != 0 ) {
            minimo = matrixKruskal[fico][j];
            nodeaux = j;
          }
        } else {
          if (matrixKruskal[j][fico] < minimo && matrixKruskal[j][fico] != 0 ) {
            minimo = matrixKruskal[j][fico];
            nodeaux = j;
          }
        }
      
    }
    console.log(matrixKruskal);
    if (minimo != 0 || minimo != 1000) {
      nodoA.push(fico);
      nodoB.push(nodeaux);
      arcos.push(minimo);
      matrixKruskal[fico][nodeaux] = 0;
      matrixKruskal[nodeaux][fico] = 0;
      fico = nodeaux;
      minimo = 1000;
      aux++;
    }

var a = conexo();

if(a = true){
    document.getElementById("resultadoKruskal").innerHTML = "";
    for(let g = 0; g < nodoA.length; g++){
      document.getElementById("resultadoKruskal").innerHTML += "<p>"+"Desde " + nodoA[g]+" hasta "+ nodoB[g]+".</p>";
    }
  }
  else{
    document.getElementById("resultadoKruskal").innerHTML = "No es conexo";

  }

  }


  console.log(nodoA, nodoB, arcos);

  //generar arbol de expansion minimo




  
}







/*
  EVENTOS
*/
window.addEventListener("load", () => {
  draw();
  save_data();
  Adj();
  caminoreal();
  imprimir_conexo();
  matrizPeso();
  imprimir_hamilton();
  imprimir_eureliano();
  Kruskal();
  // caminoCorto();
});