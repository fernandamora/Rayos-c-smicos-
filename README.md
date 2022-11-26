# Detección computacional de partículas por medio de una cámara de niebla de difusión continua
## Fernanda Mora Rey y Josué Daniel Jaramillo Arroyave
### Instituto de Física, Universidad de Antioquia

## Introducción

La radiación es la emisión, propagación y transferencia de energía en cualquier medio en forma de ondas electromagnéticas o partículas [1]. Esta se origina en la descomposición de materiales radiactivos, sin embargo, las partículas poseen radiación ionizante y debido a que son muy pequeñas y se mueven a altas velocidades, se hace imposible de ver a simple vista. La cámara de niebla posee un rol único en el desarrollo de la física, creando caminos visibles de para partículas ionizadas, permitiendo el estudio de estas de manera directa [2].
Una cámara de niebla es un entorno cerrado que contiene vapor de agua superenfriado y supersaturado. Cuando una partícula cargada de suficiente energía interacciona con el vapor, lo ioniza. Los iones resultantes actúan como núcleos de condensación, alrededor de los cuales se forman gotas de líquido que dan lugar a una niebla. Al paso de las partículas se va produciendo una estela o traza, debido a los numerosos iones producidos a lo largo de su trayectoria. Estas trazas tienen formas distintivas, por ejemplo, la traza de una partícula alfa es ancha y recta, las partículas beta son finas y largas [3].
La primera cámara de niebla fue inventada y construida por un físico escosés Charles Thomson Rees Wilson y el dispositivo se encendió por primera vez en 1911 después de casi veinte años de desarrollo. En 1927, Charles Thomson Rees Wilson fue galardonado con el premio nobel de la física por su método para hacer visibles las rutas de las partículas cargadas eléctricamente por condensación de vapor [3]. 
La cámara niebla de difusión se desarrolló en 1936 por Alexander Langsdorf. Esta cámara difiere de la cámara de expansión de Wilson en que es sensible a la radiación de forma continua, ya que no se utiliza la expansión para enfriar, sino que se genera un gradiente térmico enfriando el fondo de la cámara con una máquina refrigerante o con hielo seco, consiguiendo la mezcla sobresaturada en esta parte de la cámara permanentemente [4]. 
Usando el invento de Wilson y manipulando un campo magnético externo de 2,5 T, Carl Anderson en 1932, descubrió el positrón examinando la trayectoria seguida. Cuatro años después, en 1936 Anderson recibió el premio Nobel de Física por este descubrimiento [5]. Ese mismo año Anderson y Seth  Neddermeyer descubrieron el muón en la cámara de Wilson [6].
En este trabajo presentamos la construcción de una cámara de niebla de difusión continua y el desarrollo computacional para la detección de partículas de una muestra radiactiva y de radiación de fondo con el objetivo de hacer un conteo automático de las partículas presentes en una grabación y monitoreo de las condiciones ambientales en el momento de la toma de datos (concentración de alcohol, temperatura y nivel de iluminación). Como resultado se obtuvo un código en python que calcula la cantidad de partículas presentes en cada cuadro del video y una página web que además de indicar las condiciones ambientales, brinda información acerca del proyecto.


***Objetivos***
***General***: Realizar conteo automático de partículas en una cámara de niebla.

***Específicos***:

Construir una cámara de niebla de difusión continua.

Desarrollar un código que detecte automáticamente la presencia de partículas en la cámara de niebla.

Monitorizar las condiciones (concentración de alcohol, temperatura y nivel de iluminación) presentes en la detección de partículas.

### Materiales y métodos 

Partiendo de la idea de la cámara de niebla de difusión de Alexander Langsdorf se realizó un montaje más sencillo para este proyecto. Para la construcción de la cámara se usó un recipiente de aluminio redondo pintado de negro, fieltro al redecor del envase, papel transparente encima de este y hielo seco (CO2); por otro lado, se usó una muestra radiactiva un electrodo de aleación tungsteno-torio al 2% de calibre 3/32´´ y alcohol isopropilico a una concentración de 99,8% de pureza. 
Utilizando un sensor de calidad del aire MQ-135,  una fotoresistencia y un sensor de temperatura LM35, se monitoreó cada 10 segundos la concentración de alcohol, el nivel de iluminación y la temperatura ambiente. Para obtener esta monitorización en la página web se realizaron códigos en Python 3.10.6 y en Arduino IDE. El código de Arduino muestrea las variables mencionadas y las imprime mediante serial, luego el código de Python lee el serial y almacena los valores en formato json para enviarlo a la base de datos en MongoDB.
Para la detección de partículas se realizó un código en python el cual consiste de una clase llamada “detection”. Esta clase contiene 2 métodos, “imageDetection” y “videoDetection”, estos reciben como parámetros: una imagen del fondo de la cámara de niebla, la imagen o video en la cual se observan trazas, la zona vertical que se desea analizar en cada imagen, los valores de ajuste para brillo, los límites inferiores de la umbralización (para el fondo y la imagen o video), contraste y saturación. 

La clase (“detection”) contiene subrutinas que permiten realizar la detección de las partículas. 
En el caso de usar un video se emplea un ciclo while que itera sobre los cuadros del video. Estos cuadros o las imágenes se pasan como parámetro a la rutina “enhance” que convierte la imagen a una escala de grises para luego ajustar los valores de brillo, contraste y saturación de cada una de las imágenes. La imagen resultante se transforma con “threshold” convirtiendola en una imagen binaria (blanco y negro), esta imagen binaria la recibe la subrutina “contours”, la cual halla los contornos de todos las zonas blancas que se encuentren en la imagen y elimina gran parte del ruido que detecta. Por último, “drawContours” toma la imagen original y dibuja sobre esta los contornos hallados y realiza un conteo de estos, posteriormente crea una nueva imagen en la cual se observa la imagen original junto a la imagen con los contornos dibujados.


## Conclusiones

Examinando los resultados obtenidos podemos notar que las condiciones para realizar el experimento deben ser ideales, es decir, el montaje experimental debe ser realizado con un margen de error nulo, esto debido a que la presencia de fugas puede causar que la niebla producida por la transición de fase del alcohol isopropílico no se almacene y no se pueda observar las trazas de las partículas. Por el lado computacional vemos que los códigos creados dieron buenos resultados, logrando monitorizar condiciones ambientales y detectar, con buen porcentaje de certeza, las partículas en la cámara de niebla. Finalmente, como futura mejora al proyecto se puede implementar una inteligencia artificial que realice la detección y clasificación de las partículas que se observan en la cámara de niebla.

### Referencias

[1]Las radiaciones. (2015). Consejo de Seguridad Nuclear. https://www.csn.es/las-radiaciones#:~:text=La%20radiación%20es%20la%20emisión,las%20radiaciones%20desde%20sus%20orígenes.
[2] nudelo. (2022).  Acerca de la cámara de niebla. nudelo. https://www.nuledo.com/es/
[3]Cámara de niebla. (2020). Wikipedia. https://es.wikipedia.org/wiki/Cámara_de_niebla
[4] Moliner. (2011). La cámara de niebla de difusión (Diffusion cloud chamber). http://ific.uv.es/~martinee/LabFNyP-UV/CamaraNieblaDifusion-2011-20-11.pdf
[5] Outreach, N. P. (2022). The Nobel Prize in Physics 1936. The Nobel Prize in Physics 1936. https://www.nobelprize.org/prizes/physics/1936/summary/
[6] Alejandro Manzeda O., Carla A. Calle García, Manuel Monasterios M. (2018). Construcción de una cámara de niebla de difusión para la identificación de diferentes partículas cósmicas. Revista boliviana de física, 32, 25–28.




