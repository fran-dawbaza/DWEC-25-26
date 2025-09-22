    /*
        alert('esto se muestra después');
        
        let h2 = document.querySelector('h2');
        h2.textContent="Hola otra vez";
        h2.style.color="#0000FF";
*/


    document.querySelector('button').addEventListener('click',modificaH2);

    function modificaH2(evento){
        i++;
        document.getElementById('prueba').innerHTML = 'Párrafo cambiado! '+ i;
    }