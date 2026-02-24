// Componente BotonIncrementaContador
class BotonIncrementaContador extends HTMLElement {
    constructor() {
        super();
        // shadow será una referencia a this.shadowRoot
        const shadow = this.attachShadow({ mode: 'open' });

        const button = document.createElement('button');
        button.textContent = 'Incrementa contador';
        button.addEventListener('click', () => {
            // Cuando se hace clic en este botón, disparamos un evento personalizado
            // Primero, generamos y configuramos en nuevo tipo de evento
            const eventoClicPersonalizado = new CustomEvent('incrementaContador', {
                bubbles: true, // El evento puede burbujear a través del DOM
                composed: true, // El evento puede pasar a través de los límites del shadow DOM
                detail: { mensaje: '¡El botón incrementa ha sido clickeado!' } // Datos adicionales que queremos pasar
            });
            // Segundo, disparamos el nuevo evento
            this.dispatchEvent(eventoClicPersonalizado);
            console.log('Evento "incrementaContador" disparado');
        });

        shadow.append(button);
    }
}

// Registramos el elemento personalizado
customElements.define('boton-incrementa-contador', BotonIncrementaContador);

// Componente BotonDecrementaContador
class BotonDecrementaContador extends HTMLElement {
    constructor() {
        super();
        // shadow será una referencia a this.shadowRoot
        const shadow = this.attachShadow({ mode: 'closed' });

        const button = document.createElement('button');
        button.textContent = 'Decrementa contador';
        button.addEventListener('click', () => {
            // Cuando se hace clic en este botón, disparamos un evento personalizado
            // Primero, generamos y configuramos en nuevo tipo de evento
            const eventoClicPersonalizado = new CustomEvent('decrementaContador', {
                bubbles: true, // El evento puede burbujear a través del DOM
                composed: true, // El evento puede pasar a través de los límites del shadow DOM
                detail: { mensaje: '¡El botón decrementa ha sido clickeado!' } // Datos adicionales que queremos pasar
            });
            // Segundo, disparamos el nuevo evento
            this.dispatchEvent(eventoClicPersonalizado);
            console.log('Evento "decrementaContador" disparado');
        });

        shadow.append(button);
    }
}

// Registramos el elemento personalizado
customElements.define('boton-decrementa-contador', BotonDecrementaContador);