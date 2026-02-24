
// --- Lógica del botón de incrementar---
const botonIncrementar = document.getElementById('botonIncrementar');

if (botonIncrementar) {
    botonIncrementar.addEventListener('click', () => {
        // 1. Crear el evento personalizado
        // No necesitamos 'composed: true' porque no hay Shadow DOM.
        // 'bubbles: true' sigue siendo importante para que el evento suba por el DOM.
        const eventoClicPersonalizado = new CustomEvent("incrementarContador", {
            bubbles: true,
            detail: {
                mensaje: '¡El botón incrementar ha sido clickeado desde el DOM ligero!',
                timestamp: new Date().toLocaleTimeString()
            }
        });

        // 2. Disparar el evento desde el botón
        botonIncrementar.dispatchEvent(eventoClicPersonalizado);
        console.log(`Evento incrementarContador disparado.`);
    });
}

// --- Lógica del botón de decrementar---
const botonDecrementar = document.getElementById('botonDecrementar');

if (botonDecrementar) {
    botonDecrementar.addEventListener('click', () => {
        // 1. Crear el evento personalizado
        // No necesitamos 'composed: true' porque no hay Shadow DOM.
        // 'bubbles: true' sigue siendo importante para que el evento suba por el DOM.
        const eventoClicPersonalizado = new CustomEvent("decrementarContador", {
            bubbles: true,
            detail: {
                mensaje: '¡El botón decrementar ha sido clickeado desde el DOM ligero!',
                timestamp: new Date().toLocaleTimeString()
            }
        });

        // 2. Disparar el evento desde el botón
        botonDecrementar.dispatchEvent(eventoClicPersonalizado);
        console.log(`Evento decrementarContador disparado.`);
    });
}


// --- Lógica del  Contador ---
const contadorDisplay = document.getElementById('contadorDisplay');
let contador = 0;

if (contadorDisplay) {
    // 3. Escuchar el evento personalizado en el document
    // (o en cualquier ancestro común donde el evento pueda burbujear)
    document.addEventListener('incrementarContador', (event) => {
        contador++;
        contadorDisplay.textContent = contador;
        console.log(`[Contador] Evento incrementarContador recibido. Mensaje: ${event.detail.mensaje}`);
        console.log(`[Contador] Datos adicionales: `, event.detail);
    });
    document.addEventListener('decrementarContador', (event) => {
        contador--;
        contadorDisplay.textContent = contador;
        console.log(`[Contador] Evento decrementarContador recibido. Mensaje: ${event.detail.mensaje}`);
        console.log(`[Contador] Datos adicionales: `, event.detail);
    });

}