function obtenerParametroId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

let productID = obtenerParametroId();

if (!productID) {
  productID = localStorage.getItem("productID");
}

if (productID) {
  localStorage.setItem("productID", productID);
} else {
  showToast("No se encontró un productID en la URL o en el localStorage.", "error");
}

const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

fetch(PRODUCT_URL)
  .then(response => response.json())
  .then(product => {
    if (!product || !product.name || !product.description) {
      throw new Error('La respuesta de la API no tiene el formato esperado');
    }

    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = `
      <div class="container-product mt-5">
        <div class="row">
          <div class="col-md-6">
            <div id="productCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                ${product.images.map((img, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100" alt="Imagen del producto">
                  </div>
                `).join('')}
              </div>
              <a class="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-md-6">
            <div class="informacion">
              <p>Nuevo | ${product.soldCount} Vendidos</p>
              <h2 id="producto1">${product.name}</h2>
              <h2 id="precio-producto">${product.currency} ${new Intl.NumberFormat('es-ES').format(product.cost)}</h2>
              <div class="stock">
                <h5>Stock disponible</h5>
                <div class="cantidad-contenedor">
                  <span>Cantidad</span>
                  <span class="disminuir">-</span>
                  <input type="number" id="campoContador" value="1" min="1" class="cantidad form-control d-inline w-25 mx-2">
                  <span class="aumentar">+</span>
                </div>
                <a href="cart.html"  id="comprar" class="btn btn-warning mt-3"><strong>Comprar ahora</strong></a>
                <button id="agregar" class="btn btn-light mt-3"><strong>Agregar al carrito</strong></button>
              </div>
            </div>
            <div class="descripcion mt-4">
              <h5>Descripción</h5>
              <p>${product.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;


    //Acá voy a agregar la parte de subir precio segun cantidad de products
    const precioUnidad = product.cost;

    

    const cantidadProduct = document.querySelector('#campoContador');
    const priceDisplay = document.querySelector('h2:nth-of-type(2)');  // Asegúrate de que este selector apunta al precio correcto

    cantidadProduct.addEventListener('input', function() {
      const cantidad = parseInt(cantidadProduct.value);
      const precioTotal = precioUnidad * cantidad;
      priceDisplay.textContent = `${product.currency} ${new Intl.NumberFormat('es-ES').format(precioTotal)}`;
    ;

    })

    
    const botonAumentar = document.querySelector('.aumentar');
    const botonDisminuir = document.querySelector('.disminuir');

    botonAumentar.addEventListener('click', () => {
      let cantidad = parseInt(cantidadProduct.value);
      cantidad++;
      cantidadProduct.value = cantidad;
      const precioTotal = precioUnidad * cantidad;
      priceDisplay.textContent = `${product.currency} ${new Intl.NumberFormat('es-ES').format(precioTotal)}`
    });

    botonDisminuir.addEventListener('click', () => {
      let cantidad = parseInt(cantidadProduct.value);
      if (cantidad > 1) {
        cantidad--;
        cantidadProduct.value = cantidad;
        const precioTotal = precioUnidad * cantidad;
        priceDisplay.textContent = `${product.currency} ${new Intl.NumberFormat('es-ES').format(precioTotal)}`
      }
    });

    let relatedProducts = product.relatedProducts;
    const relatedProductsElement = document.getElementById('prodRelacionados');

    if (relatedProductsElement) {
      const relacionadoDiv = document.createElement('div');
      const parrafito = document.createElement('p');
      const relatedProductIds = relatedProducts.map(product => product.id);
      localStorage.setItem('relatedProducts', JSON.stringify(relatedProductIds));

      parrafito.innerHTML = `
      <div id="relProd">
        <div class="row">
          ${relatedProducts.map(relatedProduct => `
            <div class="col-md-4">
              <div class="product-card">
                <a href="product-info.html?id=${relatedProduct.id}">
                  <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="img-fluid">
                  <div class="product-body">
                    <h5 class="product-title">${relatedProduct.name}</h5>
                  </div>
                </a>
              </div>
            </div>
          `).join('')}
          <div class="col-md-4 button-container">
            <a href="products.html" id="botonrelated">Ver más</a>
          </div>
        </div>
      </div>
      `;
      relacionadoDiv.appendChild(parrafito);
      relatedProductsElement.appendChild(relacionadoDiv);
    } else {
      showToast("No se encontró el contenedor de productos relacionados", "error");
    }
  })
  .catch(error => {
    showToast('Error al obtener la información del producto: ' + error.message, "error");
  });

const productInfoElement = document.getElementById('productInfo');
productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';

var modal = document.getElementById("calificarModal");
var calificarBtn = document.getElementById("btncalificar");
var span = document.getElementsByClassName("close")[0];
var estrellas = document.querySelectorAll(".estrella");
var comentario = document.getElementById("comentario");
var enviarBtn = document.getElementById("enviarBtn");
var ratingSeleccionado = 0;

btncalificar.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function pintarEstrellas(rating) {
  estrellas.forEach(function(estrella) {
    const estrellaValue = parseInt(estrella.getAttribute("data-value"));
    if (estrellaValue <= rating) {
      estrella.classList.add("selected");
    } else {
      estrella.classList.remove("selected");
    }
  });
}

function resetearEstrellas() {
  estrellas.forEach(function(estrella) {
    estrella.classList.remove("selected");
  });
}

estrellas.forEach(function(estrella) {
  estrella.addEventListener("mouseover", function() {
    const ratingHover = parseInt(this.getAttribute("data-value"));
    pintarEstrellas(ratingHover);
  });

  estrella.addEventListener("mouseleave", function() {
    resetearEstrellas();
    if (ratingSeleccionado) {
      pintarEstrellas(ratingSeleccionado);
    }
  });

  estrella.addEventListener("click", function() {
    ratingSeleccionado = parseInt(this.getAttribute("data-value"));
    pintarEstrellas(ratingSeleccionado);
  });
});

enviarBtn.onclick = function() {
  if (ratingSeleccionado > 0 && comentario.value.trim()) {
    showToast("Gracias por tu calificación de " + ratingSeleccionado + " estrellas", "success");

    const fechaActual = new Date().toISOString();

    const nuevoComentario = {
      user: ultimoUsuario.email || "Anónimo",
      dateTime: fechaActual,
      score: ratingSeleccionado,
      description: comentario.value.trim()
    };

    agregarComentarioAlDOM(nuevoComentario);

    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${productID}`)) || [];
    comentariosGuardados.push(nuevoComentario);
    localStorage.setItem(`comentarios_${productID}`, JSON.stringify(comentariosGuardados));

    modal.style.display = "none";
    resetearEstrellas();
    comentario.value = '';
    ratingSeleccionado = 0;
  } else {
    showToast("Selecciona una calificación y escribe un comentario.", "error");
  }
};

function agregarComentarioAlDOM(comentario) {
  const elementoProd = document.getElementById('destacadas');
  const comentarioDiv = document.createElement('div');
  const parrafo = document.createElement('p');

  const estrellas = generarEstrellas(comentario.score);

  parrafo.innerHTML = `
          <div class="user-info">
            <strong>${comentario.user}</strong>
            <span class="date">${formatearFecha(comentario.dateTime)}</span>
          </div>
          <span>${estrellas}</span><br>
          ${comentario.description}
        `;

  comentarioDiv.appendChild(parrafo);
  elementoProd.appendChild(comentarioDiv);
}

function generarEstrellas(score) {
  const maxEstrellas = 5;
  let estrellasHTML = '';

  for (let i = 0; i < Math.floor(score); i++) {
    estrellasHTML += '★';
  }

  for (let i = Math.floor(score); i < maxEstrellas; i++) {
    estrellasHTML += '☆';
  }

  return estrellasHTML;
}

function formatearFecha(fecha) {
  const dateObj = new Date(fecha);
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = String(dateObj.getFullYear());
  const horas = String(dateObj.getHours()).padStart(2, '0');
  const minutos = String(dateObj.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

window.onload = function() {
  const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${productID}`)) || [];
  comentariosGuardados.forEach(comentario => {
    agregarComentarioAlDOM(comentario);
  });
};

const COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

fetch(COMMENTS)
  .then(response => response.json())
  .then(comentarios => {
    const elementoProd = document.getElementById('destacadas');

    function comentariosUsers(comentarios) {
      comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        const parrafo = document.createElement('p');
        parrafo.classList.add("comentariosUser");

        const estrellas = generarEstrellas(comentario.score);

        parrafo.innerHTML = `
          <div class="user-info">
            <strong>${comentario.user}</strong>
            <span class="date">${formatearFecha(comentario.dateTime)}</span>
          </div>
          <span>${estrellas}</span><br>
          ${comentario.description}
        `;
        comentarioDiv.appendChild(parrafo);
        elementoProd.appendChild(comentarioDiv);
      });
    }

    if (Array.isArray(comentarios) && comentarios.length > 0) {
      comentariosUsers(comentarios);
    }
  })
  .catch(error => {
    showToast('Error: ' + error.message, "error");
  });

// Función para mostrar toasts
function showToast(message, type) {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  if (type === 'success') {
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13l4 4L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
    `;
  } else if (type === 'error') {
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="white"/>
        </svg>
      </div>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
    `;
  }

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}


document.addEventListener('DOMContentLoaded', function() {
  // Seleccionamos el botón del modo noche
  const toggleButton = document.getElementById('toggle-button');
  
  // Comprobar el modo guardado en localStorage al cargar la página
  const savedMode = localStorage.getItem('nightMode');
  if (savedMode === 'enabled') {
    enableNightMode();
    toggleButton.textContent = 'Modo Día';
  }

  // Evento 'click' para cambiar entre los modos
  toggleButton.addEventListener('click', function() {
    if (document.body.classList.contains('night-mode')) {
      disableNightMode();
    } else {
      enableNightMode();
    }
  });

  // Función para activar el modo nocturno
  function enableNightMode() {
    // Aplicar la clase 'night-mode' al cuerpo y a todos los elementos
    document.body.classList.add('night-mode');

    // Asegurarse de que los elementos existan antes de aplicar clases
    const productInfo = document.getElementById('productInfo');
    const relatedProducts = document.getElementById('relatedProducts');
    
    if (productInfo) productInfo.classList.add('night-mode');
    if (relatedProducts) relatedProducts.classList.add('night-mode');
    
    document.querySelectorAll('div, .breadcrumb, .modal-content,.rating-container, .footer, button,.container-product mt-5,.dropdown,.container,.text-muted,.bg-dark').forEach(el => el.classList.add('night-mode'));

    // Guardar el estado en localStorage
    localStorage.setItem('nightMode', 'enabled');
    toggleButton.textContent = 'Modo Día';
  }

  // Función para desactivar el modo nocturno
  function disableNightMode() {
    // Quitar la clase 'night-mode' del cuerpo y de todos los elementos
    document.body.classList.remove('night-mode');

    // Asegurarse de que los elementos existan antes de quitar clases
    const productInfo = document.getElementById('productInfo');
    const relatedProducts = document.getElementById('relatedProducts');

    if (productInfo) productInfo.classList.remove('night-mode');
    if (relatedProducts) relatedProducts.classList.remove('night-mode');

    document.querySelectorAll('div, .breadcrumb, .modal-content, .rating-container, .footer, button,.container-product mt-5,.dropdown,.container,.text-muted,.bg-dark').forEach(el => el.classList.remove('night-mode'));

    // Guardar el estado en localStorage
    localStorage.setItem('nightMode', 'disabled');
    toggleButton.textContent = 'Modo Noche';
  }
});


//testeo Raisa - agregar producto al localStorage al comprar

function addToCart(productID) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(productID);

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast("Producto adicionado al carrito!");
}

fetch(PRODUCT_URL)
    .then(response => response.json())
    .then(product => {


        const agregarButton = document.getElementById("comprar");
        

        agregarButton.addEventListener('click', () => {
            const cantidad = parseInt(document.getElementById("campoContador").value);

            const subtotal = product.cost * cantidad;

            const productDetails = {
                id: product.id,
                name: product.name,
                cost: product.cost,
                currency: product.currency,
                quantity: cantidad,
                image: product.images[0], 
                subtotal: subtotal 
            };
            addToCart(productDetails);
        });
    })
    .catch(error => {
        showToast('Error al obtener la información del producto: ' + error.message, "error");
    });
 //Cami
 function contarItems() {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (!Array.isArray(cartData)) {
      cartData = [cartData];
  }

  let cantidades = 0;
  cartData.forEach(item => {
      cantidades += item.quantity || 0;
  });

  console.log(cantidades);

  const badgeElement = document.getElementById("cartBadge");
  if (badgeElement){
    badgeElement.textContent = cantidades;
  }

  console.log(cantidades);
  return cantidades

}




contarItems();