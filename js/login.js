const emails = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("botoning").addEventListener('click', function(event) {
  if (emails.value === "" || password.value === "") {
    alert("Los campos de email y contraseña son obligatorios.");
    event.preventDefault(); 
  } else if (!emails.value.includes("@") || !emails.value.includes(".")) {
    alert('Ingresa un email válido (ejemplo@ejemplo.com)');
    event.preventDefault(); 
  } else {
    alert("Ingresaste correctamente, bienvenid@!");     
    window.location.href = "index.html";
  }
});

const formularioLogin = document.querySelector('#login')
formularioLogin.addEventListener('click', (e)=> {
  e.preventDefault()

  const email = document.querySelector('#email').value
  const contrasena = document.querySelector('#password').value

  const usuariosTotales = JSON.parse(localStorage.getItem('usuarios')) || []
  usuariosTotales.push({email: email, contraseña: contrasena})
  localStorage.setItem('usuarios', JSON.stringify(usuariosTotales))
  
});



