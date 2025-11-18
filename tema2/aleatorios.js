// distribución NO uniforme: 
/*
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}
*/
// distribución uniforme: 
/*
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/

// distribución uniforme: 
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
}

let contador=[];

for (let i=0;i<100000;i++){
    let n = randomInteger(1,5);
    contador[n] = contador[n] ? contador[n] + 1 : 1;
}

console.log(contador);