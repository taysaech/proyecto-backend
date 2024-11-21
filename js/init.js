const BASE_URL = "http://localhost:3000/api"; // Cambia al puerto y dominio donde corre tu servidor local

const CATEGORIES_URL = `${BASE_URL}/cats/cat`;
const PUBLISH_PRODUCT_URL = `${BASE_URL}/sell/publish`;
const PRODUCTS_URL = `${BASE_URL}/cats/cat/${catID}`; 
const PRODUCT_INFO_URL = `${BASE_URL}/products/${productId}`; 
const PRODUCT_INFO_COMMENTS_URL = `${BASE_URL}/products_comments/${product}`; 
const CART_INFO_URL = `${BASE_URL}/user_cart/25801`; 
const CART_BUY_URL = `${BASE_URL}/cart/buy`; 

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Desafiate - Cami
function contarItems() {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (!Array.isArray(cartData)) {
      cartData = [cartData];
  }

  let cantidades = 0;
  cartData.forEach(item => {
      cantidades += item.quantity || 0;
  });

  const badgeElement = document.getElementById("cartBadge");
  if (badgeElement){
    badgeElement.textContent = cantidades;
  }

  console.log(cantidades);
  return cantidades

}


const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const ultimoUsuario = usuarios[usuarios.length - 1];
document.getElementsByClassName("nav-item")[3].innerHTML = `
    <div class="dropdown">
      <button class="btn dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #212529; color: white;">
        <a class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
          </svg>  
          ${ultimoUsuario.email} 
        </a>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="my-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg> Perfil </a></li>
        <li><a class="dropdown-item" href="cart.html"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
        </svg> Carrito <span class="position-absolute translate-middle badge rounded-pill bg-danger" id="cartBadge">
        ${contarItems()}
    <span class="visually-hidden">unread messages</span>
  </span></a></li>
        <li id="btnCerrarSesion"><a class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style="cursor: pointer;">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg> Cerrar sesión</a></li>
      </ul>
    </div>
`;


document.getElementById('btnCerrarSesion').addEventListener('click', function(){
  localStorage.removeItem('usuarios');
  window.location = "login.html";
});




