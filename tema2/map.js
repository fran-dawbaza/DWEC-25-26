"use strict";

const miArray = [
  {nombre: 'manolito', edad: 16},
  {nombre: 'ricardín', edad: 16},
  {nombre: 'joselín', edad: 18},
  {nombre: 'miguelón', edad: 26},
  {nombre: 'rosita', edad: 56},
  {nombre: 'luisita', edad: 6}, 
  {nombre: 'lucas', edad: 96},
  {nombre: 'mario', edad: 14}
];

const $cuerpoTabla = document.getElementById('cuerpoTabla');

$cuerpoTabla.innerHTML = 
    miArray.map(
        persona =>`<tr>
            <td>${persona.nombre}</td>
            <td>${persona.edad}</td>
            </tr>`
        )
    .join('');