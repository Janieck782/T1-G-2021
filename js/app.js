var nodes, edges, network, matrix, camino, matrixcamino, matrixpeso, mapfrom, mapto, maplabel, options, nodir, dirigido, matrizcopia, grafoDijkstra;

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
    nodes.remove({
      id: document.getElementById("node-id").value
    });
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

function save_data() {
  let i;

  mapfrom = edges.map((edge) => edge.from);
  console.log(mapfrom);

  mapto = edges.map((edge) => edge.to);
  console.log(mapto);

  maplabel = edges.map((edge) => edge.label);
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

}

function removeEdge() {
  try {
    edges.remove({
      id: document.getElementById("edge-id").value
    });
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

  nodes.add([{
    
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

function matrizPeso() {
  let c, i, j;
  matrixpeso = JSON.parse(JSON.stringify(matrix));

  //   var maplabel = edges.map((edge) => edge.label);

  //  for (i = 0; i < maplabel.length; i++) {
  //    maplabel[i] = +maplabel[i];
  //  }

  console.log("Matrix");
  console.log(matrix);
  console.log("Matriz Peso antes");
  console.log(matrixpeso);
  console.log("Pesos");
  console.log(maplabel);

  nodir = document.getElementById("nodir");
  dirigido = document.getElementById("dirigido");

  if (nodir.checked == true) {
    for (c = 0; c <= matrixpeso.length; c++) {
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
    for (c = 0; c <= matrixpeso.length; c++) {
      for (i = 0; i < matrixpeso.length; i++) {
        for (j = 0; j < matrixpeso[i].length; j++) {
          if (i === mapfrom[c] && j === mapto[c]) {
            matrixpeso[i][j] = maplabel[c];
          }
        }
      }
    }
  }

  console.log("Matriz Peso")
  console.table(matrixpeso);

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
  console.log(matrixcamino);

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

  console.log("Cantidad de nodos: ");
  console.log(nodes.length);
  console.log("Hamilton");
  console.log(hamil);

  console.log("Es conexo?: ");
  console.log(conexo());

  console.log("Tamaño Hamil: ");
  console.log(hamil.length);

  if (nodes.length >= 3 && conexo() === true) {

    for (let i = 1; i < hamil.length; i++) {
      cont = 0;

      for (let j = 1; j < hamil.length; j++) {

        if (hamil[i][j] === 1) cont++;

      }
      console.log("Cont: ");
      console.log(cont);
      console.log("Aux: ");
      console.log(aux);
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

// camino = [];

function shortestPath() {
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
    var nodoiaux = document.getElementsByName("nodoI")[0].value; //NodoInicial
    var nodofaux = document.getElementsByName("nodoF")[0].value; //NodoFinal
    var i = nodoiaux.toString();
    var f = nodofaux.toString();
    g.addVertex(value.origen, enlaces);

    camino = g.shortestPath(i, f).concat(i).reverse();

  });
  console.log('pruebcamino', camino);



}


function Kruskal(){

  var nodoA = new Array(), nodoB = new Array(), arcos = new Array(), minimo=1000;
  matrixKruskal = JSON.parse(JSON.stringify(matrixpeso));
  console.log(matrixKruskal);
  
  
  for(let j=1;j <= matrixKruskal.length; j++){
    for(let i=1;i <= matrixKruskal.length; i++){
        if(matrixKruskal[j][i]){

        }
  
          }
        }
    
  
  
  console.log(matrixKruskal);
  
  
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