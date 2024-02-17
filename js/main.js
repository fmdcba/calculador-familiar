const $botonIngresar = document.querySelector('#crear-familiares');
const $botonCalcularEdades = document.querySelector('#calcular-edades');

$botonIngresar.onclick = function() {
  const cantidadFamiliares = Number(document.querySelector('#cantidad-familiares').value);
  const $botonCalcularEdades = document.querySelector('#calcular-edades');

  for (let i = 0; i < cantidadFamiliares; i++) {
    const familiarTexto = document.createElement('label');
    const familiarEdad = document.createElement('input');
    const campoFamiliar = document.createElement('div');
    const $contenedorFamiliares = document.querySelector('#familiares');
    familiarTexto.textContent = `Familiar Nº ${i + 1}:`;
    familiarEdad.type = 'number';
    familiarEdad.placeholder = 'Ingresar Edad';
    familiarEdad.className = 'edades'

    campoFamiliar.appendChild(familiarTexto);
    campoFamiliar.appendChild(familiarEdad);
    $contenedorFamiliares.appendChild(campoFamiliar);
  }

  if (cantidadFamiliares > 0) {
    $botonIngresar.className = 'ocultar';
    $botonCalcularEdades.className = '';
  } else {
    alert('Ingresá al menos un familiar');
  }

  return false;
}

$botonCalcularEdades.onclick = function() {
  const $edadesFamiliares = document.querySelectorAll('.edades');
  const edades = [];

  for (let i = 0; i < $edadesFamiliares.length; i++) {
    edades.push(Number($edadesFamiliares[i].value));
  }

  manejarEdades(edades);
}

function manejarEdades(edades) {
  const $contendorMayorEdad = document.querySelector('#mayor-edad');
  const $contendorMenorEdad = document.querySelector('#menor-edad');
  const $contendorPromedioEdades = document.querySelector('#promedio-edades');

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
    if (menorNumero < numeros[i]) {
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
