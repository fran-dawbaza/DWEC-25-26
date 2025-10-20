"use strict";

const salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function sumaSalarios(salarios){
    let suma = 0;
    for (let propiedad in salarios){
        suma = suma + salarios[propiedad];
    }
    return suma;
}

/*console.log('La suma de salaries es: ' + sumaSalarios(salaries));
console.log('La suma de {} es: ' + sumaSalarios({}));
console.log('La suma de {Pepe: 12,Lucas: 18,Martín: 24,} es: ' + sumaSalarios({
                                        Pepe: 12,
                                        Lucas: 18,
                                        Martín: 24,

}));
*/


// Antes de la llamada
const menu = {
    width: 200,
    height: 300,
    title: "Mi menú"
};
const menu3 = {
    width: 400,
    height: 600,
    title: "Mi menú"
};
let a = 23;
console.log(a);
console.log(menu3);

duplica(a);
multiplyNumeric(menu3);

console.log(a);
console.log(menu3);

function duplica(numero){
    numero = numero * 2;
}

function multiplyNumeric(obj){
    for (let propiedad in obj){
        if (typeof obj[propiedad] === 'number')
                obj[propiedad] = 2 * obj[propiedad];
    }
}
// Después de la llamada
/*menu = {
  width: 400,
  height: 600,
  title: "Mi menú"
};*/