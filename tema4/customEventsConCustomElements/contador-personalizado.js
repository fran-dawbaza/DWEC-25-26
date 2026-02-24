// Componente ContadorPersonalizado
class ContadorPersonalizado extends HTMLElement {
    constructor() {
        super();
        // shadow será una referencia a this.shadowRoot
        const shadow = this.attachShadow({ mode: 'open' });

        this.contador = 0;

        const h2 = document.createElement('h2');
        h2.textContent = `Contador: ${this.contador}`;
        this.contadorDisplay = h2; // Guardamos una referencia para actualizarlo

        shadow.append(h2);

        // Escuchamos el evento personalizado "incrementaContador"
        // Lo adjuntamos al document para que pueda escuchar eventos que burbujean
        document.addEventListener('incrementaContador', (event) => {
            this.contador++;
            this.contadorDisplay.textContent = `Contador: ${this.contador}`;
            console.log('Evento "incrementaContador" recibido por el contador:', event.detail.mensaje);
        });

        // Escuchamos el evento personalizado "decrementaContador"
        // Lo adjuntamos al document para que pueda escuchar eventos que burbujean
        document.addEventListener('decrementaContador', (event) => {
            this.contador--;
            this.contadorDisplay.textContent = `Contador: ${this.contador}`;
            console.log('Evento "decrementaContador" recibido por el contador:', event.detail.mensaje);
        });
    }
}

// Registramos el elemento personalizado
customElements.define('contador-personalizado', ContadorPersonalizado);