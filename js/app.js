//----------------CALCULADORA-----------------
var Calculadora = (function(){

  var numeroDisplay; //Los dígitos mostrados actualmente en la pantalla (string)
  var display; //<span> del display de la calculadora
  var numMemoria; //Aquí se guarda el primer operando mientras se realiza una operación
  var operMemoria; //Aquí se guarda el tipo de operación que se está realizando
  var numMemoria2; //Aquí se guarda el segundo operando luego de realizar una operación

  function inicializar(){
    display = document.getElementById("display");
    mostrarNumero("0");
    numMemoria = "";
    numMemoria2 = "";
    operMemoria = "";
  }

  //Agregar una cifra al numero actual. Llamada al pulsar un número
  function anadirCifra(cifra){
    if(cifra == 0 && numeroDisplay == "0"){
      return;
    } else {
      if(numeroDisplay == "0"){
        mostrarNumero(cifra.toString());
      } else {
        mostrarNumero(numeroDisplay + cifra.toString());
      }
    }
  }

  //Cuenta los dígitos del número. No es usada en la función de truncar sino
  //al presionar la tecla punto para evitar poner punto si ya hay 8 dígitos
  function contarDigitos(txtNumero){
    var cantDigitos = 0;
    for(var i = 0; i < txtNumero.length; i++){
      if(!isNaN(parseInt(txtNumero[i]))){ //Si el caracter es un dígito
        cantDigitos++;
      }
    }
    return cantDigitos;
  }

  //"Corta" el número ingresado para que tenga 8 dígitos o menos.
  //No cuenta el punto (.) o el menos (-) como dígito
  function truncarA8Digitos(txtNumero){
    //Aquí una pequeña prueba para ver si el número es mayor a 99999999 y truncarlo al mismo..
    //No se pedía en la evaluación pero quedaba bonito.
    var probarNumero = parseFloat(txtNumero);
    if(!isNaN(probarNumero) && probarNumero > 99999999){
      return "99999999";
    }
    var digitos = 0;
    var textoAMantener = "";

    for(var i = 0; i < txtNumero.length; i++){
      if(!isNaN(parseInt(txtNumero[i]))){ //Si el caracter es un dígito
        digitos++;
        if(digitos > 8){
          break;
        }
      }
      textoAMantener += txtNumero[i];
    }
    return textoAMantener;
  }

  //Reemplaza el número que esté en el display por el parámetro enviado
  function mostrarNumero(txtNumero){
    var textoNum = truncarA8Digitos(txtNumero);
    numeroDisplay = textoNum;
    display.innerHTML = numeroDisplay;
  }

  //Suma
  function sumar(num1, num2){
    return num1 + num2;
  }

  //Resta
  function restar(num1, num2){
    return num1 - num2;
  }

  //Multiplicación
  function multiplicar(num1, num2){
    return num1 * num2;
  }

  //División
  function dividir(num1, num2){
    return num1 / num2;
  }

//  function raiz(num){
//    return Math.sqrt(num);
//  }

  //Realiza la operación enviada por parámetro y la muestra en pantalla
  function calcularMostrar(operacion, num1, num2){
    var resultado;
    switch(operacion){
      case "suma": resultado = sumar(num1, num2);
        break;
      case "resta": resultado = restar(num1, num2);
        break;
      case "multiplica":  resultado = multiplicar(num1, num2);
        break;
      case "divide":  resultado = dividir(num1, num2);
        break;
    }
    mostrarNumero(resultado.toString());
  }
  //Llamamos a inicializar aquí, luego de haber definido todas las funciones
  inicializar();

  return {
    pulsaTeclaOn : function(){
      mostrarNumero("0");
    },

    pulsaTeclaOperacion : function(operacion){
      if(numeroDisplay != ""){ //Puede estar vacío por pulsar dos veces seguidas teclas de operación
        numMemoria = parseFloat(numeroDisplay);
        mostrarNumero("");
      }
      operMemoria = operacion;
    },

    pulsaTeclaNumero : function(numero){
      anadirCifra(numero);
    },

    pulsaTeclaSigno : function(){
      var estaSigno = numeroDisplay[0] == "-";
      if(estaSigno){
        mostrarNumero(numeroDisplay.substring(1));
      } else{
        if(numeroDisplay != "0"){
          mostrarNumero("-" + numeroDisplay);
        }
      }
    },

    pulsaTeclaPunto : function(){
       //Si el número NO tiene punto y hay menos de 8 dígitos
      if(numeroDisplay.indexOf(".") == -1 && contarDigitos(numeroDisplay) < 8){
        mostrarNumero(numeroDisplay + ".");
      }
    },

    pulsaTeclaIgual : function(){
      if(numeroDisplay != ""){ //Esto ocurre al oprimir el igual inmediatamente luego de una tecla de operación
        var resultado;
        var numActual = parseFloat(numeroDisplay);

        //-----------------OPERACIÓN NORMAL---------------------
        if(numMemoria != ""){ //Hay un primer operando en memoria
          calcularMostrar(operMemoria, numMemoria, numActual);
          numMemoria = ""; //Borramos el número en memoria
          numMemoria2 = numActual; //Ahora guardamos el segundo número por si se quiere
                                  //repetir la operación pulsando igual nuevamente

        //------------REPETIR ÚLTIMA OPERACIÓN-----------------
        } else if(numMemoria2 != ""){ //Hay un segundo operando en memoria (operación reciente)
          calcularMostrar(operMemoria, numActual, numMemoria2);
        }
      }
    }
  }
})();

//--------------------------------------------
//------------------TECLAS--------------------
var teclaOn = document.getElementById("on");
var teclaSuma = document.getElementById("mas");
var teclaResta = document.getElementById("menos");
var teclaMultiplica = document.getElementById("por");
var teclaDivide = document.getElementById("dividido");
var teclaRaiz = document.getElementById("raiz")
var teclaSigno = document.getElementById("sign");
var teclaPunto = document.getElementById("punto");
var teclaIgual = document.getElementById("igual");

var teclasNumero = [];
for(var i = 0; i <= 9; i++){
  teclasNumero[i] = document.getElementById(i.toString());
}

var listaTeclas = [teclaOn, teclaSuma, teclaResta, teclaMultiplica, teclaDivide,
                    teclaRaiz, teclaSigno, teclaPunto, teclaIgual, teclasNumero[0],
                    teclasNumero[1], teclasNumero[2], teclasNumero[3],
                    teclasNumero[4], teclasNumero[5], teclasNumero[6],
                    teclasNumero[7], teclasNumero[8], teclasNumero[9]];
//--------------------------------------------
//--------FUNCIONES ANIMACIÓN TECLAS----------
//Pulsar tecla
function achicarTecla(tecla){
  tecla.style.transform = "scale(0.95, 0.92)";
}
//Soltar tecla. (recuperar tamaño)
//Eliminar el estilo inline la devuelve al estilo de la hoja CSS
function soltarTecla(tecla){
  tecla.style.transform = "";
}
//--------------------------------------------
//------------------EVENTOS-------------------

//Eventos mousedown


teclaOn.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaOn();
  achicarTecla(e.target);
});
teclaSuma.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaOperacion("suma");
  achicarTecla(e.target);
});
teclaResta.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaOperacion("resta");
  achicarTecla(e.target);
});
teclaMultiplica.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaOperacion("multiplica");
  achicarTecla(e.target);
});
teclaDivide.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaOperacion("divide");
  achicarTecla(e.target);
});
teclaRaiz.addEventListener("mousedown", function(e){
  //Calculadora.pulsaTeclaOperacion("raiz");
  achicarTecla(e.target);
});
teclaSigno.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaSigno();
  achicarTecla(e.target);
});
teclaPunto.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaPunto();
  achicarTecla(e.target);
});
teclaIgual.addEventListener("mousedown", function(e){
  Calculadora.pulsaTeclaIgual();
  achicarTecla(e.target);
});

for(var i = 0; i <= 9; i++){
  teclasNumero[i].addEventListener("mousedown", function(e){
    Calculadora.pulsaTeclaNumero(e.target.id);
    achicarTecla(e.target);
  })
}

//Eventos mouseup y mouseout
for(var i = 0; i < listaTeclas.length; i++){
  listaTeclas[i].addEventListener("mouseup", function(e){
    soltarTecla(e.target);
  });
  listaTeclas[i].addEventListener("mouseout", function(e){
    soltarTecla(e.target);
  });
}

//--------------------------------------------