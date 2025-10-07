let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', muestraOrdenados);

function muestraOrdenados(event) {
    event.preventDefault();
    /* capturar los números  y ordenarlos */
    let a = +document.getElementById('num1').value;
    let b = +document.getElementById('num2').value;
    let c = +document.getElementById('num3').value;

    let resultado = '';
    /*
    if (a < b && b < c)         resultado = a + ', ' + b + ', ' + c;
    else if (a < c && c < b)    resultado = a + ', ' + c + ', ' + b;
    else if (b < a && a < c)    resultado = b + ', ' + a + ', ' + c;
    else if (b < c && c < a)    resultado = b + ', ' + c + ', ' + a;
    else if (c < a && a < b)    resultado = c + ', ' + a + ', ' + b;
    else                        resultado = c + ', ' + b + ', ' + a;
    */

    /* otra forma de hacerlo, es más eficiente pero queda menos claro,
    hay que recordar los posibles órdenes para no liarnos:
    1. a < b < c
    2. a < c < b
    3. b < a < c
    4. b < c < a
    5. c < a < b
    6. c < b < a 
    */
    if (a<b){
        if (b<c) resultado = a + ', ' + b + ', ' + c;
        else if (a<c) resultado = a + ', ' + c + ', ' + b;
        else resultado = c + ', ' + a + ', ' + b;
    }
    else {
        if (a<c) resultado = b + ', ' + a + ', ' + c;
        else if (b<c) resultado = b + ', ' + c + ', ' + a;
        else resultado = c + ', ' + b + ', ' + a;
    }
    /* mostrar el resultado en el HTML en el párrafo con id="result" */
    let parrafo = document.getElementById('result');
    parrafo.innerHTML = 'Los números ordenados son: ' + resultado;
}
