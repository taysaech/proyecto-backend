document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});




document.addEventListener('DOMContentLoaded', function(event) {
  if (localStorage.getItem("usuarios") == null) {
      alert("Debes iniciar sesión primero");
        window.location.href = "login.html";
    };
  });

  

