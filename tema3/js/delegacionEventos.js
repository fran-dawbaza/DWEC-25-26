document.addEventListener('DOMContentLoaded', main);

function main(){

    let contador = 4;

    // 1. Seleccionamos el elemento PADRE
    const lista = document.getElementById('lista-tareas');

    // 2. Agregamos UN SOLO evento al padre
    lista.addEventListener('click', evento => {

        // 3. Detectamos quién originó el click (event delegation)
        // Verificamos si el elemento clickeado tiene la clase 'btn-borrar'
        console.log(evento.target);        // Elemento más interno
        console.log(evento.currentTarget); // Elemento que programa el evento
        if (evento.target.dataset.accion==='borrar') {
            // Buscamos el elemento <li> padre del botón para eliminarlo
            const tarea = evento.target.closest('li');
            console.log('Tarea eliminada mediante delegación:' + tarea.textContent);
            tarea.remove();
            
        }
        else if (evento.target.tagName==='LI'){
            console.log('Tarea eliminada mediante delegación:' + evento.target.textContent);
            evento.target.remove();
        }
    });

    // --- Código extra para demostrar que funciona con elementos nuevos ---
    document.getElementById('btn-agregar').addEventListener('click', () => {
        const li = document.createElement('li');
        li.innerHTML = `Tarea Nueva ${contador++} <button data-accion="borrar">Eliminar</button>`;
        lista.append(li);
    });
}