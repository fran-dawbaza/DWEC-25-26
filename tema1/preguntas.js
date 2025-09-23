    // Funciones para poner en verde o rojo un elemento, 
    // se usan en el primer ejemplo de pregunta
    
    function ponEnVerde(id){
        document.getElementById(id).style.color = '#11EE11';
    }

    function ponEnRojo(id){
        document.getElementById(id).style.color = 'red';
    }



    // Función para chequear las preguntas en los siguientes ejemplos

    // capturamos todos los botones (incluso los de la primera pregunta)
    let botones = document.querySelectorAll('button');

    // programamos el evento click en cada uno de ellos
    for (let i=0;i<botones.length;i++){
        botones[i].addEventListener('click',chequeaPregunta);
    }

    function chequeaPregunta(evento){
        //boton sobre el que se ha disparado el evento:
        let boton = evento.target;

        //buscamos el h1 anterior a ese botón
        let elementoAnterior = boton.previousElementSibling;
        if (elementoAnterior.tagName != 'H1')
            elementoAnterior = elementoAnterior.previousElementSibling;
        let h1 = elementoAnterior;
        //console.dir(evento);
        //console.log(boton);

        //ponemos el h1 en verde o rojo según la respuesta
        if (boton.dataset.correcto == 'true'){
            h1.style.color = 'green';
        } else {
            h1.style.color = 'red';
        }
    }
