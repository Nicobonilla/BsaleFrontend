// LLAMAMOS A LOS ELEMENTOS DEL HTML
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const category = document.getElementById('category')
const btnSearch = document.getElementById('btnSearch')

// LLAMAMOS LOS TEMPLATES DEL HTML
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let products = {}
let categoryCards = {}

// CARGAMOS DATOS INICIALES
document.addEventListener('DOMContentLoaded', () => {
  //GUARDAMOS COMPRA ACTUAL EN EL LOCALSTORAGE    
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    printCarrito()
  }
})

// EVENTO DEL BOTON COMPRAR DENTRO DE LAS CARDS
slider.addEventListener('click', e => {
  addCarrito(e)
})

// EVENTO DE LOS BOTONES DENTRO DEL CARRITO DE COMPRA POR ELEMENTO
items.addEventListener('click', e => {
  btnAccion(e)
})

// EVENTO PARA MOSTRAR PRODUCTOS POR CATEGORIA AL SELECCIONAR LA CATEGORIA EN EL MENU TIENDA
category.addEventListener('click', e => {
  cards.innerHTML = ''
  fetchProduct(getId(e))
})

// EVENTO PARA MOSTRAR LOS PRODUCTOS SEGUN LA BUSQUEDA DEL USUARIO
btnSearch.addEventListener('click', e => {
  cards.innerHTML = ''
  searchProduct(getInputSearch(e))
})

//MOSTRAR PRODUCTOS PARA EL INPUT DE BUSQUEDA
let searchContent = ''
const searchProduct = async () => {
  try {
    const searchProduct = await fetch(urlProduct+'/search?name='+searchContent)
    products = await searchProduct.json()
    pintarCards(products)
  } catch (error) {
      console.log(error)
  }
}

//OBTENEMOS EL NOMBRE DEL PRODUCTO QUE QUIERE BUSCAR EL USUARIO
const getInputSearch = (e) => {
  if(e.target.classList.contains('btn-outline-success')){
    try {
       searchContent  = document.getElementById('inputSearch').value
    } catch (error) {
      console.log(error)
    }
    e.stopPropagation()
  }
}

//OBTENEMOS EL ID DE LA CATEGORIA SELECCIONADA
let clickId = 0;
const getId = (e) => {
  if( e.target.classList.contains('nav-link') ){
    try {
      $("a").click(function() {
         clickId = $(this).attr('id')
      })
    } catch (error) {
      console.log(error)
    }
    e.stopPropagation()
  }
}

// OBTENEMOS EL JSON DE LOS PRODUCTOS CORRESPONDIENTES A LA CATEGORIA Y LA MOSTRAMOS
const urlProduct = 'http://localhost:9002/api/v1/product';
const fetchProduct = async () => {
    try {
          const fetchProduct = await fetch(urlProduct+'/buscar?category='+clickId)
          products = await fetchProduct.json()
          pintarCards(products)
    } catch (error) {
          console.log(error)
    }
}

//FUNCION PARA MOSTRAR LOS CARDS DE LOS PRODUCTOS
const pintarCards = products => {
  products.forEach( producto => {
    templateCard.querySelector('h5').textContent = producto.name
    templateCard.querySelector('p').textContent = producto.price
    templateCard.querySelector('img').setAttribute('src', producto.urlImage)
    templateCard.querySelector('.btn-dark').dataset.id = producto.id
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  cards.appendChild(fragment)
}

// FUNCION QUE AGREGA PRODUCTOS AL CARRITO AL PRECIONAR BOTON COMPRAR DENTRO DE LAS CARDS
const addCarrito = e => {
  if ( e.target.classList.contains('btn-dark')){
    setCarrito(e.target.parentElement)
  }
  e.stopPropagation()
}

// FUNCION QUE AGREGA UN PRODUCTO A LA LISTA DEL CARRITO
const setCarrito = objeto => {
  const producto = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    name: objeto.querySelector('h5').textContent,
    price: objeto.querySelector('p').textContent,
    cantidad: 1
  }

  if (carrito.hasOwnProperty(producto.id)){
    producto.cantidad = carrito[producto.id].cantidad + 1
  }

  carrito[producto.id] = {...producto}
  pintarCarrito()
}

// FUNCION QUE AGREGA PRODUCTOS A LA LISTA DE PRODUCTOS DEL CARRITO
const pintarCarrito = () => {
  items.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.name
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
  pintarFooter()
  localStorage.setItem('carrito', JSON.stringify(carrito))
}
 
// FUNCION PARA IMPRIMIR EL FOOT DEL CARRITO
const pintarFooter = () => {
  footer.innerHTML = ''
  if (Object.keys(carrito).length === 0){
    footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
      `
      return
  }

  const nCantidad = Object.values(carrito).reduce((accum, {cantidad}) => accum + cantidad ,0)
  const nPrice = Object.values(carrito).reduce((accum, {cantidad, price}) => accum + cantidad * price, 0)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrice

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () => {
    carrito = {}
    pintarCarrito()
  })
}

// FUNCIONALIDAD DE LOS BOTONES DEL CARRITO
const btnAccion = e => {
  //ACCION AUMENTAR
  if (e.target.classList.contains('btn-info')){
    const producto = carrito[e.target.dataset.id]
    producto.cantidad++
    carrito[e.target.dataset.id] = {...producto}
    pintarCarrito()
  }

  if (e.target.classList.contains('btn-danger')){
    const producto = carrito[e.target.dataset.id]
    producto.cantidad--
    if(producto.cantidad === 0){
      delete carrito[e.target.dataset.id]
    }
    pintarCarrito()
  }

  e.stopPropagation()
}

