const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3 por col-12 col-md-6 col-lg-3"> <!--Cambie algo que originalmente decia col-3 por col-12 col-md-6 col-lg-3-->
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col-12 col-md-6 col-lg-9"> <!--Cambie algo que decia solo col por col-12 col-md-6 col-lg-9 --> 
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

     const moneda = new Intl.NumberFormat('es-ES');
     const catid = localStorage.getItem("catID");
     const urls = [];
     for (let catid = 101; catid <= 109; catid++) {
       urls.push(`https://japceibal.github.io/emercado-api/cats_products/${catid}.json`);
     }
     
     function buscarVariosUrl(urls) {
       Promise.all(urls.map((url) => fetch(url))) // función map para fetchear todas las urls
         .then((resp) => Promise.all(resp.map((response) => response.json()))) // map para convertir las respuestas en JSON
         .then((datita) => {
           const mapeo = datita.flatMap((data) => data.products); // flatmap para poner todo en "un plano"
     
           // función que actualiza la visualización cuando cambia el input de búsqueda
           document.getElementById('filtrocat').addEventListener('input', () => {
             const filtroCat = document.getElementById("filtrocat").value.toLowerCase();
             const productosFiltrados = mapeo.filter((producto) =>
               producto.name.toLowerCase().includes(filtroCat) || 
               producto.description.toLowerCase().includes(filtroCat)
             );
     
             // limpio el div contenedor
             const catListContainer = document.getElementById("cat-list-container");
             catListContainer.innerHTML = '';
     
             // obtengo la cantidad de productos filtrados
             const numProducts = productosFiltrados.length;
             const numRows = Math.ceil(numProducts / 4);
     
             // loop para crear las filas de productos
             for (let i = 0; i < numRows; i++) {
               const row = document.createElement("div");
               row.classList.add("row");
     
               // loop para agregar hasta 4 productos por fila
               for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                 const producto = productosFiltrados[i * 4 + j];
     
                 const card = document.createElement("div");
                 card.classList.add("col-md-3", "mb-4");
     
                 card.innerHTML = `
                   <div class="card-product">
                     <img class="card-img-product" src="${producto.image}" alt="${producto.name}">
                     <div class="card-body">
                       <h5 class="card-title">${producto.name}</h5>
                       <p class="card-text">${producto.description}</p>
                       <p class="price">${producto.currency} ${moneda.format(producto.cost)}</p>
                       <p class="sold">Vendidos: ${producto.soldCount}</p>
                       <div class="d-flex justify-content-between align-items-center">
                         <button class="btn btn-sm btn-outline-secondary" onclick="verProducto(${producto.id})">Ver</button>
                       </div>
                     </div>
                   </div>
                 `;
     
                 row.appendChild(card); // agrego el producto a la fila
               }
     
               catListContainer.appendChild(row); // agrego la fila al contenedor principal
             }
           });
     
           // Detecta cuando se presiona la tecla Esc
           document.addEventListener('keydown', (event) => {
             if (event.key === 'Escape') {
               document.getElementById("filtrocat").value = ''; // Limpia el campo de búsqueda
               location.reload(); // Recarga la página
             }
           });
         })
         .catch((error) => {
           console.error('Error fetching data:', error);
         });
     }
     
     // Función para redirigir a la página de detalles del producto
     function verProducto(productID) {
       // Guardar el ID del producto en localStorage
       localStorage.setItem("productID", productID);
       
       // Redirigir a la página de detalles del producto
       window.location.href = 'product-info.html';
     }
     
     // cargo los datos cuando la página se carga
     document.addEventListener('DOMContentLoaded', () => {
       buscarVariosUrl(urls);
     });
     
