"use strict";
/*
fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            response=res;
            res.json();
        })
        .then(pintaTabla)
        .catch(console.error); 
*/


document.addEventListener('DOMContentLoaded',main);
document.getElementById('tablaPrincipal').addEventListener('click',peticionTemas);

async function main() {        
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await response.json();
        muestraUsuarios(json);
    }
    catch(e){
        console.error(e);
    }        
}


function muestraUsuarios(datosJSON){
    let cuerpoTabla = document.getElementById('tablaPrincipal');
    let contenidoTabla = `
        <thead>
            <tr>
                <th>Alias</th><th>Nombre</th><th>email</th><th>dirección</th><th></th>
            </tr>
        </thead>
        <tbody id="cuerpoTabla">`;
    cuerpoTabla.innerHTML = contenidoTabla + datosJSON.map(usuario=>`
        <tr>
            <td>${usuario.username}</td>
            <td>${usuario.name}</td>
            <td>${usuario.email}</td>
            <td>${usuario.address.street}, ${usuario.address.suite}<br/>
            ${usuario.address.city} (${usuario.address.zipcode})</td>
            <td><img width="15px" title="Ver posts" 
                    src="assets/tema.png" 
                    data-user-id="${usuario.id}"
                    data-user-name="${usuario.name}"></td>
        </tr>`).join('') + '</tbody>';
}

async function peticionTemas(evento){
    if (evento.target.tagName==='IMG' && evento.target.dataset.userId){
        try {
            const userId = evento.target.dataset.userId;
            const userName = evento.target.dataset.userName;
            
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            const jsonTemas = await response.json();
            muestraTemas(userName,jsonTemas);
        }
        catch(e){
            console.error(e);
        }                
    }
}

function muestraTemas(userName,datosJSON){
    let cuerpoTabla = document.getElementById('tablaPrincipal');
    let contenidoTabla = `
        <thead>
            <tr>
                <th>Temas del usuario ${userName}</th>
            </tr>
        </thead>
        <tbody><tr><td>`;
    cuerpoTabla.innerHTML = contenidoTabla + datosJSON.map(tema=>`
        <article>
            <h2>${tema.title}</h2>
            <p>${tema.body}</p>
            <p><img width="15px" title="Ver comentarios" 
                    src="assets/tema.png" 
                    data-post-id="${tema.id}">
            </p>
        </article>`).join('') + '</td></tr></tbody>';
}
