//Variables globales
var intento = 0;
var endgame = false;
var acertados = 0;
var listaPalabras = ["function", "array", "integer", "boolean", "string"];

function teclado(btn, palabra) {
  //Si todavia no ha acabado
  if (window.endgame === false) {
    let encontrado = false;
    let letra = btn.textContent;

    //Itero cada letra ingresada por teclado
    for (let i = 0; i < palabra.length; i++) {
      //Si la letra indicada corresponde a la letra de la palabra correcta
      if (palabra[i].toUpperCase() === letra) {
        let correcta = document.querySelector("#letra" + i);
        //Aqui pinto la letra encontrada en la palabra general
        correcta.textContent = palabra[i].toUpperCase();
        //Cambio el valor de encontrado para que luego pase a la condicional
        encontrado = true;
        //Incremento a uno la variable acertados
        window.acertados += 1;
      }
    }

    //Cambiar el sonido y el color de la tecla
    if (encontrado === true) {
      console.log(btn);
      btn.disabled = true;
      btn.classList.remove("tecla");
      btn.classList = "teclaUsadaCorrecta";
    } else {
      console.log(btn);
      btn.disabled = true;
      btn.classList.remove("tecla");
      btn.classList = "teclaUsadaIncorrecta";
      dibujarAhorcado(palabra);
    }

    //Si se han acertado todas las letras
    if (window.acertados === palabra.length) {
      ganaste();
    }
  }
  return;
}

function iniciarJuego() {
  //Se escoge un indice random del array
  let indice = Math.floor(Math.random() * window.listaPalabras.length);
  //Se elige la palabra de acuerdo al indice
  let palabra = window.listaPalabras[indice];

  dibujarAhorcado(palabra);

  //Se escribe los espacios de las palabras correctas
  let correctas = document.querySelector(".correctas");
  for (let i = 0; i < palabra.length; i++) {
    //Se creo un nuevo div
    const letra = document.createElement("div");
    //Se le agrega el id
    letra.id = "letra" + i;
    //Se agrega la clase
    letra.classList = "letraCorrecta";
    //Sin contenido
    letra.textContent = "";

    correctas.append(letra);
  }

  const miTeclado = (filaClass, tecladoLetras) => {
    let fila = document.querySelector(filaClass);
    for (let i = 0; i < tecladoLetras.length; i++) {
      //Crear elemento
      const tecla = document.createElement("button");
      //Agregarle la clase
      tecla.classList = "tecla";
      //Agregarle el contenido en mayúsculas
      tecla.textContent = tecladoLetras[i].toUpperCase();
      //Asignarle un Id
      tecla.id = tecladoLetras[i].toString();
      //Crearle un evento onclick
      tecla.addEventListener("click", function () {
        //console.log(this, tecladoLetras[i]);
        teclado(this, palabra);
      });

      fila.append(tecla);
    }
  };

  miTeclado(".fila1", "qwertyuiop");
  miTeclado(".fila2", "asdfghjklñ");
  miTeclado(".fila3", "zxcvbnm");

  return;
}

function dibujarAhorcado(palabra) {
  let imagen = document.getElementById("imagen");

  if (window.intento === 0) {
    imagen.src = "img/parte0.png";
  }
  if (window.intento === 1) {
    imagen.src = "img/parte1.png";
  }
  if (window.intento === 2) {
    imagen.src = "img/parte2.png";
  }
  if (window.intento === 3) {
    imagen.src = "img/parte3.png";
  }
  if (window.intento === 4) {
    imagen.src = "img/parte4.png";
  }
  if (window.intento === 5) {
    imagen.src = "img/parte5.png";
    perdiste(palabra);
  }

  window.intento += 1;

  return;
}

function ganaste() {
  let imagen = document.getElementById("imagen-final");

  //Mostrar imagen de pérdida
  imagen.src = "img/youwin.png";
  imagen.classList.add("stateAnimation");
  imagen.classList.remove("hidden");

  //Mostrar botones
  let nuevoJuegoBtn = document.getElementById("nuevobtn");
  nuevoJuegoBtn.classList.remove("hidden");
  nuevoJuegoBtn.addEventListener("click", function () {
    nuevoJuego();
  });

  //Cambiar el estado del fin del juego
  window.endgame = true;

  return;
}

function perdiste(palabra) {
  let imagen = document.getElementById("imagen-final");

  //Mostrar imagen de pérdida
  imagen.src = "img/gameover.png";
  imagen.classList.add("stateAnimation");
  imagen.classList.remove("hidden");

  //Palabra final (Resultado final)
  let palabraFinal = document.getElementById("palabrafinal");
  palabraFinal.classList.remove("hidden");
  palabraFinal.textContent = `La palabra era: "${palabra.toUpperCase()}"`;

  //Mostrar botones
  let nuevoJuegoBtn = document.getElementById("nuevobtn");
  nuevoJuegoBtn.classList.remove("hidden");
  nuevoJuegoBtn.addEventListener("click", function () {
    nuevoJuego();
  });

  //Cambiar el estado del fin del juego
  window.endgame = true;

  return;
}

function nuevoJuego() {
  //Se reinician las variables globales
  window.intento = 0;
  window.endgame = false;
  window.acertados = 0;

  //Se eliminan las clases establecidas durante el juego
  const eliminarHijos = (clase) => {
    let nodo = document.querySelector(clase);
    if (nodo.hasChildNodes) {
      while (nodo.childNodes.length >= 1) {
        nodo.removeChild(nodo.firstChild);
      }
    }
    return;
  };
  eliminarHijos(".fila1");
  eliminarHijos(".fila2");
  eliminarHijos(".fila3");
  eliminarHijos(".correctas");

  //Ocultar todos los resultados finales
  let palabraFinal = document.getElementById("palabrafinal");
  palabraFinal.classList.add("hidden");
  let imagen = document.getElementById("imagen-final");
  imagen.classList.remove("stateAnimation");
  imagen.classList.add("hidden");
  let nuevoJuegoBtn = document.getElementById("nuevobtn");
  nuevoJuegoBtn.classList.add("hidden");

  iniciarJuego();
  return;
}

iniciarJuego();
