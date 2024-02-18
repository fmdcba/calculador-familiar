const $botonIngresar = document.querySelector('#crear-familiares');
const $botonCalcularEdades = document.querySelector('#calcular-edades');
const $botonReiniciar = document.querySelector('#reiniciar');
const $botonCalcularSalarios = document.querySelector('#calcular-salarios');

$botonIngresar.onclick = function() {
  const cantidadFamiliares = Number(document.querySelector('#cantidad-familiares').value);
  const $botonCalcularEdades = document.querySelector('#calcular-edades');

  for (let i = 0; i < cantidadFamiliares; i++) {
    const $familiarTexto = document.createElement('label');
    const $familiarEdad = document.createElement('input');
    const $campoFamiliar = document.createElement('div');
    const $botonSalario = document.createElement('button');
    const $contenedorFamiliares = document.querySelector('#familiares');
    $campoFamiliar.className = 'familiar';
    $familiarTexto.textContent = `Familiar Nº ${i + 1}:`;
    $familiarEdad.type = 'number';
    $familiarEdad.placeholder = 'Ingresar Edad';
    $familiarEdad.className = 'edades';
    $botonSalario.textContent = 'Agregar Salario';
    $botonSalario.className = `boton-salario`
    $botonSalario.id = `boton-agregar-${i}`

    $campoFamiliar.appendChild($familiarTexto);
    $campoFamiliar.appendChild($familiarEdad);
    $campoFamiliar.appendChild($botonSalario);
    $contenedorFamiliares.appendChild($campoFamiliar);
  }

  if (cantidadFamiliares > 0) {
    $botonIngresar.className = 'ocultar';
    $botonReiniciar.className = '';
    $botonCalcularEdades.className = '';
  } else {
    alert('Ingresá al menos un familiar');
  }

  manejarBotonesAgregarSalarios();

  return false;
}

$botonCalcularEdades.onclick = function() {
  const $edadesFamiliares = document.querySelectorAll('.edades');
  const edades = [];

  for (let i = 0; i < $edadesFamiliares.length; i++) {
    if ($edadesFamiliares[i].value) {
      edades.push(Number($edadesFamiliares[i].value));
    }
  }

  edades.length >= 2 ? manejarEdades(edades) : alert('Ingresá al menos dos edades');
}

function manejarEdades(edades) {
  const $contendorMayorEdad = document.querySelector('#mayor-edad');
  const $contendorMenorEdad = document.querySelector('#menor-edad');
  const $contendorPromedioEdades = document.querySelector('#promedio-edad');

  const mayorEdad = obtenerMayorNumero(edades);
  const menorEdad = obtenerMenorNumero(edades);
  const promedioEdades = obtenerPromedio(edades);

  $contendorMayorEdad.textContent = `La mayor edad es: ${mayorEdad}`;
  $contendorMenorEdad.textContent = `La menor edad es: ${menorEdad}`;
  $contendorPromedioEdades.textContent = `El promedio de edades es: ${promedioEdades} (aproximadamente)`;
}

function obtenerMayorNumero(numeros) {
  let mayorNumero = 0;

  for (let i = 0; i < numeros.length; i++) {
    if (mayorNumero < numeros[i]) {
      mayorNumero = numeros[i]
    }
  }

  return mayorNumero;
}

function obtenerMenorNumero(numeros) {
  let menorNumero = numeros[0];

  for (let i = 0; i < numeros.length; i++) {
    if (menorNumero > numeros[i]) {
      menorNumero = numeros[i]
    }
  }

  return menorNumero;
}

function obtenerPromedio(numeros) {
  let numerosSumados = 0;

  for (let i = 0; i < numeros.length; i++) {
    numerosSumados += numeros[i];
  }

  return Math.floor(numerosSumados / numeros.length)
}

$botonReiniciar.onclick = function (){
  $botonIngresar.className = '';
  $botonReiniciar.className = 'ocultar';
  $botonCalcularEdades.className = 'ocultar';
  $botonCalcularSalarios.className = 'ocultar';

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

function manejarBotonesAgregarSalarios(){
  const $botonesSalario = document.querySelectorAll('.boton-salario');
  const $botonCalcularSalarios = document.querySelector('#calcular-salarios')

  for (let i  = 0; i < $botonesSalario.length; i++) {
    $botonesSalario[i].onclick = function() {
      agregarSalarios($botonesSalario[i],i);
      $botonCalcularSalarios.className = '';
      return false;
    }
  }
}

function agregarSalarios(boton, i){
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

$botonCalcularSalarios.onclick = function () {
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

  $contenedorSalarioMayor.textContent = `El mayor salario es: ${obtenerMayorNumero(salarios)}`;
  $contenedorSalarioMenor.textContent = `El menor salario es: ${obtenerMenorNumero(salarios)}`;
  $contenedorSalarioPromedioAnual.textContent = `El promedio de salarios anual es: ${obtenerPromedio(salarios)} (aproximadamente)`;
  $contenedorSalarioPromedioMensual.textContent = `El mayor salarios mensual es: ${obtenerPromedio(salariosMensuales)} (aproximadamente)`;
}
