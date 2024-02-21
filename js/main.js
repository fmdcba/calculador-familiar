document.querySelector('#crear-familiares').onclick = function(e) {
  const $cantidadFamiliares = document.querySelector('#cantidad-familiares');
  const cantidadFamiliares = Number($cantidadFamiliares.value);

  crearFamiliares(cantidadFamiliares);
  agregarSalarios();

  e.preventDefault()
}

function crearFamiliares(cantidadFamiliares){

  if (cantidadFamiliares > 0) {
    ocultarElemento('crear-familiares');
    mostrarElemento('reiniciar');
    mostrarElemento('calcular-edades');

    for (let i = 0; i < cantidadFamiliares; i++){
      crearFamiliar(i);
    }
  } else {
    alert('Ingresá al menos dos familiares para luego poder calcular');
  }
}

function crearFamiliar(indice){
  const $campoFamiliar = document.createElement('div');
  $campoFamiliar.className = 'familiar';

  const $familiarTexto = document.createElement('label');
  $familiarTexto.textContent = `Familiar Nº ${indice + 1}:`;

  const $familiarEdad = document.createElement('input');
  $familiarEdad.type = 'number';
  $familiarEdad.placeholder = 'Ingresar Edad';
  $familiarEdad.className = 'edades';

  const $botonAgregarSalario = document.createElement('button');
  $botonAgregarSalario.textContent = 'Agregar Salario';
  $botonAgregarSalario.className = `boton-salario`
  $botonAgregarSalario.id = `boton-agregar-${indice}`

  $campoFamiliar.appendChild($familiarTexto);
  $campoFamiliar.appendChild($familiarEdad);
  $campoFamiliar.appendChild($botonAgregarSalario);

  const $contenedorFamiliares = document.querySelector('#familiares');
  $contenedorFamiliares.appendChild($campoFamiliar);
}

document.querySelector('#calcular-edades').onclick = function(e) {
  const numeros = obtenerNumeros('edades');
  const tipo = 'edad'

  if (numeros.length >= 2) {
    insertarValor('mayor', tipo, obtenerMayorNumero(numeros));
    insertarValor('menor' , tipo, obtenerMenorNumero(numeros));
    insertarValor('promedio', tipo, obtenerPromedio(numeros));

    mostrarElemento('resultado-edades')
  } else {
    alert('Por favor, ingresá al menos dos edades para relizar los calculos')
  }

  e.preventDefault()
}

function obtenerNumeros(tipo){
  const $numeros = document.querySelectorAll(`.${tipo}`);
  const numeros = [];

  for (let i = 0; i < $numeros.length; i++) {
    if ($numeros[i].value) {
      numeros.push(Number($numeros[i].value));
    }
  }

  return numeros;
}

function mostrarElemento(id) {
  document.querySelector(`#${id}`).className = '';
}

function ocultarElemento(id) {
  document.querySelector(`#${id}`).className = 'ocultar';
}

function insertarValor(media, tipo, valor) {
  document.querySelector(`#${media}-${tipo}`).textContent = valor;
}

document.querySelector('#reiniciar').onclick = function (){
  mostrarElemento('crear-familiares');
  ocultarElemento('reiniciar');
  ocultarElemento('calcular-edades');
  ocultarElemento('calcular-salarios');

  document.querySelector('#mayor-edad').textContent = '';
  document.querySelector('#menor-edad').textContent = '';
  document.querySelector('#promedio-edad').textContent = '';
  document.querySelector('#mayor-salario').textContent = '';
  document.querySelector('#menor-salario').textContent = '';
  document.querySelector('#promedio-salario-anual').textContent = '';
  document.querySelector('#promedio-salario-mensual').textContent = '';


  const $familiares = document.querySelectorAll('.familiar');


  for (let i = 0; i < $familiares.length; i++){
    $familiares[i].remove();
  }
}

function agregarSalarios(){
  const $botonesSalario = document.querySelectorAll('.boton-salario');
  const $botonCalcularSalarios = document.querySelector('#calcular-salarios')

  for (let i  = 0; i < $botonesSalario.length; i++) {
    $botonesSalario[i].onclick = function() {
      agregarSalario($botonesSalario[i],i);
      $botonCalcularSalarios.className = '';
      return false;
    }
  }
}

function agregarSalario(boton, i){
  boton.className = 'ocultar';
  const $textoSalario = document.createElement('label');
  const $campoSalario = document.createElement('input');
  const $botonCancelar = document.createElement('button');
  $textoSalario.textContent = 'Salario Anual: $';
  $textoSalario.id = `texto-salario-${i}`;
  $campoSalario.type = 'number';
  $campoSalario.id = `campo-salario-${i}`;
  $campoSalario.className = `campo-salario`;
  $botonCancelar.textContent = 'Cancelar';
  $botonCancelar.id = i;
  $botonCancelar.className = 'boton-cancelar-salario'

  const $camposFamiliar = document.querySelectorAll('.familiar');

  for (i; i < $camposFamiliar.length; i++) {
    $camposFamiliar[i].appendChild($textoSalario);
    $camposFamiliar[i].appendChild($campoSalario);
    $camposFamiliar[i].appendChild($botonCancelar);

    break;
  }

  manejarBotonesCancelarSalario();
}

function manejarBotonesCancelarSalario(){
  const $botonesCancelarSalario = document.querySelectorAll('.boton-cancelar-salario');
  contador = 0;

  for(let i = 0; i < $botonesCancelarSalario.length; i++) {
    $botonesCancelarSalario[i].onclick = function() {
      const $idBotonCancelar = Number($botonesCancelarSalario[i].id)


      while (contador !== $idBotonCancelar) {
        contador++;
      }

      if (contador === $idBotonCancelar) {
        removerCamposSalario(contador, $botonesCancelarSalario[i]);
        contador = 0;
      }
    }
  }
}

function removerCamposSalario(numero, boton) {
  const $textoSalarioARemover = document.querySelector(`#texto-salario-${numero}`);
  const $campoSalarioARemover = document.querySelector(`#campo-salario-${numero}`);

  $textoSalarioARemover.remove();
  $campoSalarioARemover.remove();
  boton.remove();

  document.querySelector(`#boton-agregar-${numero}`).className = '';

  $botonesCancelarRestantes = document.querySelectorAll('.boton-cancelar-salario')

  if ($botonesCancelarRestantes.length === 0) {
    document.querySelector('#calcular-salarios').className = 'ocultar';
  }
}

document.querySelector('#calcular-salarios').onclick = function () {
  const $salariosIngresados = document.querySelectorAll('.campo-salario');
  const salarios = [];

  for (let i = 0; i < $salariosIngresados.length; i++) {
    if ($salariosIngresados[i].value) {
      salarios.push(Number($salariosIngresados[i].value))
    }
  }

  salarios.length >= 2 ? manejarSalarios(salarios) : alert('Ingresa al menos dos salarios')
}

function manejarSalarios(salarios){
  const $contenedorSalarioMayor = document.querySelector('#mayor-salario');
  const $contenedorSalarioMenor = document.querySelector('#menor-salario');
  const $contenedorSalarioPromedioAnual = document.querySelector('#promedio-salario-anual');
  const $contenedorSalarioPromedioMensual = document.querySelector('#promedio-salario-mensual');
  let salariosMensuales = [];

  for (let i = 0; i < salarios.length; i++) {
    salariosMensuales.push(salarios[i] / 12);
  }

  $contenedorSalarioMayor.textContent = `El mayor salario es: $${obtenerMayorNumero(salarios)}`;
  $contenedorSalarioMenor.textContent = `El menor salario es: $${obtenerMenorNumero(salarios)}`;
  $contenedorSalarioPromedioAnual.textContent = `El promedio de salarios anual es: $${obtenerPromedio(salarios)} (aproximadamente)`;
  $contenedorSalarioPromedioMensual.textContent = `El promedio de salarios mensual es: $${obtenerPromedio(salariosMensuales)} (aproximadamente)`;
}
