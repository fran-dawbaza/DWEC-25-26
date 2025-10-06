let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', muestraOrdenados);

function muestraOrdenados(event) {
    event.preventDefault();
    /* capturar los números  y ordenarlos */
    let num1 = +document.getElementById('num1').value;
    let num2 = +document.getElementById('num2').value;
    let num3 = +document.getElementById('num3').value;

    /* mostrar el resultado en el HTML en el párrafo con id="result" */
    let parrafo = document.getElementById('result');
    parrafo.innerHTML = 'muestra los números ordenados aquí';
}
