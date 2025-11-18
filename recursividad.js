function fibonacci(p){
    if (p<=1) return p;
    
    return fibonacci(p-1) + fibonacci(p-2);
}

function factorial(n){
    if (n===1) return 1;

    return n*factorial(n-1);
}

console.time("fibo");
console.log("fibo(40): " + fibonacci(40));
console.timeEnd("fibo");

console.time("factorial");
console.log("factorial(40): " + factorial(40));
console.timeEnd("factorial");

function fibonacciIterativo(p){
    
    let f_1=1;
    let f_2=0;
    let resultado=0;
    for (let i=p; i>1;i--){
        resultado = f_1+f_2;
        f_2=f_1;
        f_1=resultado;
    }
    return resultado;
}

console.time("fiboIterativo");
console.log("fiboIterativo(40): " + fibonacciIterativo(40));
console.timeEnd("fiboIterativo");



function factorialIterativo(n){
    let resultado = 1;
    for (let i=n; i>1;i--)
        resultado *= i;
    return resultado;
}

console.time("factorialIterativo");
console.log("factorialIterativo(40): " + factorialIterativo(40));
console.timeEnd("factorialIterativo");
