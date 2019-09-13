//  Vars
const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

//  Events
cargarEvents()


function cargarEvents() { // Detector de Events

  cursos.addEventListener('click', comprarCurso) // Disparados al presionar 'Agregar al carrito'

  carrito.addEventListener('click', eliminarCurso) // Disparador al dar click en 'Carrito'

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito) // Disparador al dar click en 'vaciar carrito'

  document.addEventListener('DOMContentLoaded', leerLocalStorage) // Al cargar el document, cargar localStorage
}


//  functionS
function comprarCurso(e) { // Function que añade el curso al carrito
  e.preventDefault() // Desactivar recargas

  if(e.target.classList.contains('agregar-carrito')) { // Delegation para 'agregar-carrito

    const curso = e.target.parentElement.parentElement // Alcanzar al elemento padre
    leerDatosCurso(curso) // Envia curso seleccionado
  }
}

function leerDatosCurso(curso) {

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCurso)
}

function insertarCarrito(curso) { // Mostrar el curso seleccionado en el carrito
  const row = document.createElement('tr') // Creando etiquetas
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="100">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `
  listaCursos.appendChild(row)
  guardarCursoLocalStorage(curso)
}

function eliminarCurso(e) { // Eliminar el curso seleccionado
  e.preventDefault() // desactivar recarga

  let curso,
      cursoId
  if(e.target.classList.contains('borrar-curso')) { // Comprobar que cuenta con la clase 'borrar-curso'
    e.target.parentElement.parentElement.remove() // eliminador
    curso = e.target.parentElement.parentElement
    cursoId = curso.querySelector('a').getAttribute('data-id')
  }
  eliminarCursoLocalStorage(cursoId)
}

function vaciarCarrito() { // Eliminar los cursos del carrito en el DOM
  
  // listaCursos.innerHTML = '' // Forma lenta
  while(listaCursos.firstChild) { // Forma rapida

    listaCursos.removeChild(listaCursos.firstChild)
  }
  vaciarLocalStorage()
  
  return false
}

function guardarCursoLocalStorage(curso) { // Inyectando datos del curso seleccionado en localStorage
  
  let cursos

  cursos = obtenerCursosLocalStorage() // Se inyecta un Array
  cursos.push(curso) // Se inyecta el curso en el Aray

  localStorage.setItem('cursos', JSON.stringify(cursos)) // Convertir Json a un Array
}

function obtenerCursosLocalStorage() {  // Analiza si localStorage se encuentra vacio

  let cursosLS 

  if(localStorage.getItem('cursos') === null) { // Comprueba si existe algun elemento en localStorage
    cursosLS = [] // Creara un Array vacio
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'))
  }
  return cursosLS
}

function leerLocalStorage() { // Imprime los cursos de localStorage en el carrito
  
  let cursosLS
  cursosLS = obtenerCursosLocalStorage()

  cursosLS.forEach(curso => {

    const row = document.createElement('tr') // Creando template
    row.innerHTML = `
      <td>
        <img src="${curso.imagen}" width="100">
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `
    listaCursos.appendChild(row)  
  })
}

function eliminarCursoLocalStorage(curso) { // Elimina el curso utlizando el Id
  
  let cursosLS
  cursosLS = obtenerCursosLocalStorage() // Obtener el Array de cursos
  cursosLS.forEach((cursoLS, index) => { // Iteramos comparando el ID del curso borrado con los del localStorage
    if(cursoLS.id === curso) {
      cursosLS.splice(index, 1)
    }
  })
  localStorage.setItem('cursos', JSON.stringify(cursosLS)) // Añadimos el array actual a storage
}

function vaciarLocalStorage() {
  localStorage.clear()
}
