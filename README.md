# T1-G-2021
El entregable debe ser un sitio que sea instalable auto contenido, es decir que incluya todas las
librerías necesarias sin requerir instalación adicional en el servidor. Debe ser capaz de ejecutarse en un
entorno Windows con los siguientes elementos:

• Apache v 2.4

• IIS v 7.5

• .NET v 4.8

• Tomcat 8.0

• PHP v 7.3

• Java 1.8.0_91

Se reitera que los entregables que no corran en dichos entornos se consideran como entregas no conforme a
lo estipulado, implicando nota mínima. Los trabajos con lenguajes compilables, deben incluir en la pauta las
indicaciones de compilación. Que un trabajo no compile o no vengan las instrucciones de compilación, se
considerará entrega no conforme y por ende, tendrán nota mínima. Además, en el repositorio debe haber un
directorio especial que contenga el sitio ya compilado.
Los aplicativos no pueden depender de la ruta de instalación en el disco/servidor. En general (aunque no
necesariamente), los aplicativos serán instalados en ruta del tipo “ruta_www/GLF-TXX-GYY”; si para el
funcionamiento de la aplicación, se debe saber la ruta, esta debe ser en un parámetro/properties dentro del
sitio (indicado claramente en las instrucciones de instalación para que el docente pueda ajustarlo). Si un
aplicativo depende de una ruta fija, contrario a lo antes indicado, se considerará entrega no conforme y, por
ende, tendrá nota mínima.

Diseñar una aplicación web (página web) que, en base a los contenidos de la asignatura, permita:
1. Ingresar un grafo a la aplicación (puede ser simple, dirigido, etiquetado, etc.)
2. A partir del grafo ingresado, debe:


a. Mostrar matriz de caminos e indicar si el grafo es o no conexo.

b. Mostrar el camino más corto para dos nodos a elección del usuario, mostrando la duración
y la ruta de dicho camino (nodos por los que pasa).

c. Indicar si es hamiltoniano y/o euleriano, indicando el camino hamiltoniano y/o euleriano
que lo define como tal.

d. Indicar el flujo máximo para un nodo de origen/entrada y otro de destino/salida a elección
del usuario.

e. Obtener el árbol generador mínimo mediante prim o kruskal.
