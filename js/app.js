// crea un array con los nodos
var nodes = new vis.DataSet([
    //ej: {id: 1, label: "Node 1"},
      {id: 1, label: "Node 1"},
      {id: 2, label: "Node 2"},
      {id: 3, label: "Node 3"},
      {id: 4, label: "Node 4"},
      {id: 5, label: "Node 5"},
      {id: 6, label: "Node 6"},
    ]);
    // crea un array con los vertices
    var edges = new vis.DataSet([
    //ej: {from: 1, to: 3, label:"peso de la arista/ponderado"},
      {from: 1, to: 3},
      {from: 1, to: 5},
      {from: 1, to: 4},
      {from: 5, to: 6},
    ]);
    // Crea el Contenedor
    var container = document.getElementById("mynetwork");
    //Junta nodos y edges para inicializar el grafo
    var data = {
      nodes: nodes,
      edges: edges,
    };
    //Variable que almacena configuraciones del grafo
    var options = {
      edges:{
        arrows:{
          to:{
            enabled: true,
          }
        }
      },
      configure:{
        enabled:false,
        container:undefined,
        showButton: true,
      }
    };
    //inicializa el grafo (Recuadro contenedor,Informacion de vertices y aristas, opciones del grafo)
    var network = new vis.Network(container, data, options);