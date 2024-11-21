const variable = localStorage.getItem("catID");
const DATOS = `https://japceibal.github.io/emercado-api/cats_products/` + variable + `.json`;

fetch(DATOS)
  .then(response => response.json())
  .then(data => {
    const autos = data.products;
    const formatter = new Intl.NumberFormat('es-ES');
    const divAutitos = document.getElementById("autitos");
    divAutitos.innerHTML = "";
    console.log(autos);

    // Crear contenedores por fila basado en la cantidad de productos
    const numProducts = autos.length;
    const numRows = Math.ceil(numProducts / 4);

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      // Loop de máximo 4 productos por columna
      for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
        const producto = autos[i * 4 + j];

        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4");
        

        const cardContent = `
          <div class="card-product" style="cursor: pointer;" onclick="selectProduct(${producto.id})">
            <img src="${producto.image}" class="card-img-product" alt="Producto">
            <div class="card-body"> 
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
            <p class="price">${producto.currency} ${formatter.format(producto.cost)}</p>
            <p class="sold">Vendidos: ${producto.soldCount}</p>
            </div>
          </div>`;

        card.innerHTML = cardContent;
        row.appendChild(card);
      }

      divAutitos.appendChild(row);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  //titulo empieza aca

  fetch(DATOS)
  .then(response => response.json())
  .then(data => {
    const catName = data.catName;
    const categoryTitleElement = document.getElementById("categoryTitle");
    categoryTitleElement.innerHTML = catName;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  //termina aca

function selectProduct(productId) {
  localStorage.setItem("productID", productId);
  window.location.href = "product-info.html";
}



function filtrado() {
  fetch(DATOS)
  .then(response => response.json()) 
  .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

    
      const campo1 = parseFloat(document.getElementById("precio1").value);
      const campo2 = parseFloat(document.getElementById("precio2").value);
      
   
      const autosXprecio = autos.filter(auto => auto.cost >= campo1 && auto.cost <= campo2);
      
      divAutitos.innerHTML = ''; 

      const numProducts = autosXprecio.length;
      const numRows = Math.ceil(numProducts / 4); 

      
      for (let i = 0; i < numRows; i++) {
          const row = document.createElement("div");
          row.classList.add("row"); 

         
          for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
              const auto = autosXprecio[i * 4 + j];

              const card = document.createElement("div");
              card.classList.add("col-md-3", "mb-4"); 

              card.innerHTML = `
                <div class="col">
                  <div class="card-product">
                    <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                    <div class="card-body">
                      <h5 class="card-title">${auto.name}</h5>
                      <p class="card-text">${auto.description}</p>
                      <p class="card-text">${auto.currency} ${auto.cost}</p>
                      <p> Vendidos: ${auto.soldCount}</p>
                    </div>
                  </div>
                </div>`;
              
              row.appendChild(card); 
          }

          divAutitos.appendChild(row); 
      }
  })
  .catch(error => {
      console.error('Error:', error); 
  });
}

  function filtrado2() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

       
        const precioMenoraMayor = autos.sort((a, b) => a.cost - b.cost);

        divAutitos.innerHTML = ''; 

        const numProducts = precioMenoraMayor.length;
        const numRows = Math.ceil(numProducts / 4); 

       
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row"); 

            
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = precioMenoraMayor[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4"); 

                card.innerHTML = `
                  <div class="col">
                    <div class="card-product">
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.currency} ${auto.cost}</p>
                        <p> Vendidos: ${auto.soldCount}</p>
                      </div>
                    </div>
                  </div>`;
                
                row.appendChild(card); 
            }

            divAutitos.appendChild(row); 
        }
    })
    .catch(error => {
        console.error('Error:', error); 

    });
}
  
  function filtrado3() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

     
        const precioMayoraMenor = autos.sort((a, b) => b.cost - a.cost);

        divAutitos.innerHTML = ''; 

        const numProducts = precioMayoraMenor.length;
        const numRows = Math.ceil(numProducts / 4); 

        // Loop para crear filas
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row"); 

         
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = precioMayoraMenor[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4"); 

                card.innerHTML = `
                  <div id="test" class="col">
                    <div class="card-product">
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.currency} ${auto.cost}</p>
                        <p> Vendidos: ${auto.soldCount}</p>
                      </div>
                    </div>
                  </div>`;
                
                row.appendChild(card);
            }

            divAutitos.appendChild(row); 
        }
    })
    .catch(error => {
        console.error('Error:', error); 
    });
}  

function filtrado4() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

        // Ordena los productos por relevancia (cantidad de vendidos)
        const relev = autos.sort((a, b) => b.soldCount - a.soldCount);

        divAutitos.innerHTML = ''; // Limpia el contenido anterior

        const numProducts = relev.length;
        const numRows = Math.ceil(numProducts / 4);

        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row");

            // Loop de máximo 4 productos por fila
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = relev[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4");

                card.innerHTML = `
                    <div class="card-product">
                        <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                        <div class="card-body">
                            <h5 class="card-title">${auto.name}</h5>
                            <p class="card-text">${auto.description}</p>
                            <p class="card-text">${auto.currency} ${auto.cost}</p>
                            <p>Vendidos: ${auto.soldCount}</p>
                        </div>
                    </div>`;
                
                row.appendChild(card);
            }

            divAutitos.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Error:', error); 
    });
};


