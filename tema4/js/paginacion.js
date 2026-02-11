"use strict";

const miTabla = document.getElementById('miTabla');
const misDatos = Array.from(miTabla.rows).slice(1);
let misDatosFiltrados;
let misDatosBuscados=[];

let paginaActual = 1;

let itemsPorPagina = 7;

function pintaPagina(pagina) {
    muestraFilas(pagina);
    controlesPaginacion(pagina);
}

function muestraFilas(pagina){
    let primerElemento=(pagina-1)*itemsPorPagina;
    let ultimoElemento=primerElemento+itemsPorPagina;
    const datosAmostrar = misDatosBuscados.slice(primerElemento,ultimoElemento);
    miTabla.tBodies[0].replaceChildren(...datosAmostrar);
}

function controlesPaginacion(pagina){
    let primerElemento=(pagina-1)*itemsPorPagina;
    let ultimoElemento=primerElemento+itemsPorPagina;
    let ultimaPagina=Math.ceil(misDatosBuscados.length/itemsPorPagina);
    let capaNoExiste=true;
    let capa = document.getElementById('miTabla-paginacion');
    if (capa) {
        capaNoExiste=false;
    }
    else {
        capa = document.createElement('DIV');
        capa.id="miTabla-paginacion";
        capa.classList.add("vd-panel-bottom");
    }
    let opciones = '';
    for (let i=1;i<=ultimaPagina;i++){
        opciones += `<option ${i==pagina?'selected':''}>`+i+'</option>';
    }
    capa.innerHTML = `
            <span class="vd-info">${primerElemento+1}-${ultimoElemento} de ${misDatosBuscados.length} items</span>
            <div class="vd-paginacion-controls">
            <button ${pagina==1?'disabled':''} title="Primera página" data-salto="1"
                aria-label="Primera página" class="vd-btn-pag">«</button>
            <button ${pagina==1?'disabled':''} title="Página anterior" data-salto="${+pagina-1}"
                aria-label="Página anterior" class="vd-btn-pag">‹</button>
            <span class="vd-page-selector-group">Página <select onchange="pintaPagina(this.value)" class="vd-page-select" aria-label="Seleccionar página">
            ${opciones}
            </select> de ${ultimaPagina}</span>
            <button title="Página siguiente" ${pagina==ultimaPagina?'disabled':''}
                data-salto="${+pagina+1}"
                aria-label="Página siguiente" class="vd-btn-pag">›</button>
            <button title="Última página" ${pagina==ultimaPagina?'disabled':''}
                data-salto="${ultimaPagina}"
                aria-label="Última página" class="vd-btn-pag">»</button>
            </div>`;
    if (capaNoExiste) {
        capa.addEventListener('click', evento=>{
            if (evento.target.tagName=='BUTTON' && evento.target.dataset.salto) {
                if (isFinite(evento.target.dataset.salto))
                    pintaPagina(evento.target.dataset.salto);
            }
        });
        miTabla.after(capa);
    }
}

function ponCategorías(){
    let categorias = misDatos.map(e=>e.cells[2].textContent);
    categorias=Array.from(new Set(categorias))
    categorias.sort();

    let capaCategorias = document.getElementById('capaCategorias');
    let LIs = categorias
                    .map(categoria=>`<li><label><input type="checkbox" value="${categoria}">${categoria}</label></li>`)
                    .join('');
    capaCategorias.innerHTML='<ul>'+LIs+'</ul>';
    capaCategorias.addEventListener('click',evento=>{
        let categoriasMarcadas=[];
        if (evento.target.tagName=='INPUT'){
            let inputs = capaCategorias.querySelectorAll('input');
            categoriasMarcadas=Array.from(inputs)
                                    .filter(input=>input.checked)
                                    .map(input=>input.value);
            filtraPorCategorias(categoriasMarcadas);
        }
    });
}

function filtraPorCategorias(categorias){
    misDatosFiltrados=[];
    categorias.forEach(categoria => {
        let datosPorCategoria = misDatos.filter(fila=>fila.cells[2].textContent===categoria);
        misDatosFiltrados.push(...datosPorCategoria);
    });
    if (misDatosFiltrados.length===0)
        misDatosFiltrados=[...misDatos];
    //if (misDatosBuscados.length===0)  error 
    misDatosBuscados=[...misDatosFiltrados];
    actualizaBusqueda();
}

function controlesBusqueda(){
    let capaCB = document.getElementById('controles-busqueda');
    let capaExiste= Boolean(capaCB);
    
    if (!capaExiste) {
        capaCB=document.createElement('DIV');
        capaCB.id = "controles-busqueda";
        capaCB.classList.add("vd-panel-top");
        let inputBusqueda = document.createElement('INPUT');
        inputBusqueda.id="inputBusqueda";
        inputBusqueda.type="text";
        inputBusqueda.placeholder="Buscar...";
        inputBusqueda.class="vd-input";
        capaCB.append(inputBusqueda);
        miTabla.before(capaCB);

        inputBusqueda.addEventListener('input',actualizaBusqueda);
        
    }

    /*capaCB.innerHTML = `
        <div class="vd-cantidad">
            <input type="number" min="1" class="vd-input-num" 
            list="miTabla-list-cant" 
            aria-label="Cantidad de items por página" title="Items por página">
            <datalist id="miTabla-list-cant">
                <option value="5"></option>
                <option value="10"></option>
                <option value="25"></option>
                <option value="50"></option>
                <option value="100"></option>
            </datalist>
        </div>`;*/
}

function actualizaBusqueda(){

    let inputBusqueda = document.getElementById('inputBusqueda');
    let entrada = inputBusqueda.value.toLowerCase();
    if (entrada==='') {
        if (misDatosFiltrados.length===0)
            misDatosBuscados=[...misDatos];
        else
            misDatosBuscados = [...misDatosFiltrados];
        pintaPagina(1);
        return;
    }
    misDatosBuscados = misDatosFiltrados.filter(fila=>{
        let textoFila = fila.textContent.toLowerCase();
        return textoFila.includes(entrada);
    });
    pintaPagina(1);
    //console.log(misDatosBuscados);            
}



ponCategorías();
controlesBusqueda();
filtraPorCategorias([]);

//misDatosBuscados.sort((a,b)=>a.cells[2].textContent.toLowerCase().localeCompare(b.cells[2].textContent.toLowerCase()));
//pintaPagina(1);

misDatosBuscados.sort((a,b)=>Number(b.cells[0].textContent)-Number(a.cells[0].textContent));
pintaPagina(1);

