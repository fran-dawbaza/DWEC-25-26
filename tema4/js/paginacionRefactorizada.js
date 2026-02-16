"use strict";

document.addEventListener('DOMContentLoaded', () => {
    iniciarPaginacion('miTabla');
});

/**
 * Inicializa la lógica de paginación, búsqueda y filtrado para una tabla HTML.
 * No hay necesidad de variables globales.
 * Todo el estado se mantiene encapsulado dentro de esta función (Closure).
 */
function iniciarPaginacion(idTabla) {
    // 1. Referencias al DOM y validación inicial
    const tabla = document.getElementById(idTabla);
    if (!tabla) return;

    const tbody = tabla.querySelector('tbody');
    const contenedorCategorias = document.getElementById('capaCategorias');
    
    // Contenedores dinámicos
    let contenedorBuscador;
    let contenedorPaginacion;

    // 2. Estado de la aplicación (Variables locales/privadas)
    const ITEMS_POR_PAGINA = 7;
    let paginaActual = 1;
    let textoBusqueda = "";
    let categoriasSeleccionadas = [];

    // Convertimos las filas a un array de datos manejable
    // Se guarda la referencia al elemento TR para poder reinsertarlo
    const filasOriginales = Array.from(tbody.rows);
    let filasFiltradas = [...filasOriginales];

    // ==========================================
    // 3. Filtrado y Orden
    // ==========================================

    function ordenarPorIdDescendente() {
        filasOriginales.sort((a, b) => {
            const idA = Number(a.cells[0].textContent);
            const idB = Number(b.cells[0].textContent);
            return idB - idA; // Orden descendente
        });
    }
  
    function ordenarPorIdAscendente() {
        filasOriginales.sort((a, b) => {
            const idA = Number(a.cells[0].textContent);
            const idB = Number(b.cells[0].textContent);
            return idA - idB; // Orden descendente
        });
    }

    function aplicarFiltros() {
        const texto = textoBusqueda.toLowerCase().trim();
        const hayFiltroCategoria = categoriasSeleccionadas.length > 0;

        filasFiltradas = filasOriginales.filter(fila => {
            // Condición 1: Texto
            const coincideTexto = texto === "" || fila.textContent.toLowerCase().includes(texto);
            
            // Condición 2: Categoría (en la columna de índice 2)
            const categoria = fila.cells[2].textContent;
            const coincideCategoria = !hayFiltroCategoria || categoriasSeleccionadas.includes(categoria);

            return coincideTexto && coincideCategoria;
        });

        // Al cambiar filtros, siempre volvemos a la primera página
        paginaActual = 1;
        renderizarTabla();
    }

    // ==========================================
    // 4. Lógica de Renderizado (Pintar en pantalla)
    // ==========================================

    function renderizarTabla() {
        const totalItems = filasFiltradas.length;
        const totalPaginas = Math.ceil(totalItems / ITEMS_POR_PAGINA) || 1;

        // Validar límites de página
        if (paginaActual > totalPaginas) paginaActual = totalPaginas;
        if (paginaActual < 1) paginaActual = 1;

        // Calcular recorte de datos
        const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
        const fin = inicio + ITEMS_POR_PAGINA;
        const filasVisibles = filasFiltradas.slice(inicio, fin);

        // Actualizar el DOM de la tabla
        tbody.replaceChildren(...filasVisibles);

        // Actualizar controles
        renderizarControlesPaginacion(totalPaginas, totalItems, inicio, fin);
    }

    function renderizarControlesPaginacion(totalPaginas, totalItems, inicio, fin) {
        // Crear contenedor si no existe (Lazy creation)
        if (!contenedorPaginacion) {
            contenedorPaginacion = document.createElement('div');
            contenedorPaginacion.id = "miTabla-paginacion";
            contenedorPaginacion.className = "vd-panel-bottom";
            
            // Event Delegation para los botones
            contenedorPaginacion.addEventListener('click', manejarClickPaginacion);
            contenedorPaginacion.addEventListener('change', (e) => {
                if (e.target.tagName === 'SELECT') {
                    paginaActual = Number(e.target.value);
                    renderizarTabla();
                }
            });
            tabla.after(contenedorPaginacion);
        }

        const finMostrado = fin > totalItems ? totalItems : fin;
        
        // Generar opciones del select
        let opciones = '';
        for (let i = 1; i <= totalPaginas; i++) {
            opciones += `<option value="${i}" ${i === paginaActual ? 'selected' : ''}>${i}</option>`;
        }

        const disabledAnterior = paginaActual === 1 ? 'disabled' : '';
        const disabledSiguiente = paginaActual === totalPaginas ? 'disabled' : '';

        contenedorPaginacion.innerHTML = `
            <span class="vd-info">${totalItems > 0 ? inicio + 1 : 0}-${finMostrado} de ${totalItems} items</span>
            <div class="vd-paginacion-controls">
                <button ${disabledAnterior} data-pag="1" title="Primera página" class="vd-btn-pag">«</button>
                <button ${disabledAnterior} data-pag="${paginaActual - 1}" title="Anterior" class="vd-btn-pag">‹</button>
                
                <span class="vd-page-selector-group">Página 
                    <select class="vd-page-select">${opciones}</select> 
                    de ${totalPaginas}
                </span>

                <button ${disabledSiguiente} data-pag="${paginaActual + 1}" title="Siguiente" class="vd-btn-pag">›</button>
                <button ${disabledSiguiente} data-pag="${totalPaginas}" title="Última página" class="vd-btn-pag">»</button>
            </div>
        `;
    }

    // ==========================================
    // 5. Generación de UI y Eventos
    // ==========================================

    function crearBuscador() {
        if (document.getElementById('controles-busqueda')) return;

        contenedorBuscador = document.createElement('div');
        contenedorBuscador.id = "controles-busqueda";
        contenedorBuscador.className = "vd-panel-top";

        const input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Buscar...";
        input.className = "vd-input";

        input.addEventListener('input', (e) => {
            textoBusqueda = e.target.value;
            aplicarFiltros();
        });

        contenedorBuscador.appendChild(input);
        tabla.before(contenedorBuscador);
    }

    function crearFiltrosCategorias() {
        if (!contenedorCategorias) return;

        // Extraer categorías únicas ordenadas
        const categorias = [...new Set(filasOriginales.map(f => f.cells[2].textContent))].sort();

        const listaHtml = categorias.map(cat => 
            `<li><label><input type="checkbox" value="${cat}"> ${cat}</label></li>`
        ).join('');
        
        contenedorCategorias.innerHTML = `<ul>${listaHtml}</ul>`;

        contenedorCategorias.addEventListener('change', () => {
            const inputs = contenedorCategorias.querySelectorAll('input:checked');
            categoriasSeleccionadas = Array.from(inputs).map(i => i.value);
            aplicarFiltros();
        });
    }

    function manejarClickPaginacion(e) {
        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;

        const nuevaPagina = Number(btn.dataset.pag);
        if (!isNaN(nuevaPagina)) {
            paginaActual = nuevaPagina;
            renderizarTabla();
        }
    }

    // ==========================================
    // 6. Arranque
    // ==========================================
    
    // 1. Ordenar datos iniciales (como en el ejemplo de paginacion.js)
    ordenarPorIdDescendente();
    
    // 2. Crear componentes UI
    crearBuscador();
    crearFiltrosCategorias();
    
    // 3. Renderizado inicial
    aplicarFiltros(); // Esto llama internamente a renderizarTabla
}
