const alumnos = [
  { nombre: "Ana", edad: 20, nota: 8.5 },
  { nombre: "Luis", edad: 22, nota: 4.9 },
  { nombre: "Juan", edad: 17, nota: 4.4 },
  { nombre: "María", edad: 19, nota: 7.2 },
  { nombre: "Carlos", edad: 24, nota: 6.1 }
];

// Obtener sólo los nombres

const nombresDeAlumnos = alumnos.map(alumno=>alumno.nombre);
console.log(nombresDeAlumnos);

// Obtener nombre y estado (aprobado/suspenso)

const nombresYEstado = alumnos.map(alumno=>({
    nombre: alumno.nombre,
    estado: alumno.nota>=5?'aprobado':'suspenso'
}));

console.log(nombresYEstado)

// Obtener los alumnos aprobados
const alumnosAprobados = alumnos.filter(alumno=>alumno.nota>=5);
console.log(alumnosAprobados);

// Obtener alumnado mayor de edad
const alumnosMayores = alumnos.filter(alumno=>alumno.edad>=18);
console.log(alumnosMayores);

// Obtener la nota media del grupo
const notasSumadas=alumnos.reduce((ac,alumno)=>ac+alumno.nota,0)
const media=notasSumadas/alumnos.length;
console.log(media.toFixed(2));

// Obtener el número de aprobados y suspensos

/*
const aprobadosYSuspensos=alumnos.reduce((ac,alumno)=>({
    aprobados: alumno.nota>=5?ac.aprobados+1:ac.aprobados,
    suspensos: alumno.nota<5?ac.suspensos+1:ac.suspensos
}),{aprobados:0,suspensos:0});
*/

const aprobadosYSuspensos=alumnos.reduce((ac,alumno)=>{
    if (alumno.nota>=5) ac.aprobados++;
    else                ac.suspensos++;
    return ac;
},{aprobados:0,suspensos:0});

console.log(aprobadosYSuspensos);


// Obtener los nombres de alumnos aprobados
// pasos: 
// 1.- filtro y me quedo con los aprobados,
// 2.- transformo y me quedo solo con los nombres

const nombresAlumnosAprobados = alumnos
                                .filter(alumno=>alumno.nota>=5)
                                .map(alumno=>alumno.nombre);
console.log(nombresAlumnosAprobados);

// Obtener la media de edad de los alumnos suspensos, pasos
// 1.- filtramos y nos quedamos con los alumnos suspensos
// 2.- reducimos a la media

const mediaEdadesDelTiron = alumnos
                                .filter(alumno=>alumno.nota<5)
                                .reduce((ac,alumno,i,arr)=>{
                                    if (i==arr.length-1)
                                        return (ac+alumno.edad)/arr.length;
                                    else
                                        return ac+alumno.edad;
                                }, 0);

console.log(mediaEdadesDelTiron);

const alumnosSupensos = alumnos.filter(alumno=>alumno.nota<5);
const sumaEdadesAlumnosSuspensos = alumnosSupensos.reduce((ac,alumno)=>ac+alumno.edad, 0)
const mediaEdades = sumaEdadesAlumnosSuspensos/alumnosSupensos.length;

console.log(mediaEdades);