document.addEventListener('DOMContentLoaded', function() {
  const savedPic = localStorage.getItem('profilePic');
  if (savedPic) {
      document.getElementById('profile-pic').src = savedPic;
  }

  document.getElementById('change-pic').addEventListener('click', function() {
      document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const imageData = e.target.result;
              document.getElementById('profile-pic').src = imageData;
              localStorage.setItem('profilePic', imageData);
          };
          reader.readAsDataURL(file);
      }
  });

  // Obtener todos los usuarios almacenados
  const todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const ultimoEmail = todosLosUsuarios[todosLosUsuarios.length - 1]?.email; // Tomar el último email guardado en el login

  document.getElementById('emailPerfil').value = ultimoEmail;

  document.getElementById('btnGuardarCambios').addEventListener('click', function() {
      const usuario = document.getElementById('usuario').value;
      const nombre = document.getElementById('nombre').value;
      const segundoNombre = document.getElementById('segundoNombre').value;
      const apellido = document.getElementById('apellido').value;
      const segundoApellido = document.getElementById('segundoApellido').value;
      const emailPerfil = document.getElementById('emailPerfil').value;
      const contacto = document.getElementById('contacto').value;

      if (!nombre.trim() || !apellido.trim()) {
        return;
    }

      const nuevoUser = {
          usuario: usuario,
          nombre: nombre,
          segundoNombre: segundoNombre,
          apellido: apellido,
          segundoApellido: segundoApellido,
          email: emailPerfil,
          contacto: contacto
      };

      const losUsuarios = JSON.parse(localStorage.getItem('informacionUsuarios')) || [];
      const usuarioExistente = losUsuarios.findIndex(usuario => usuario.email === emailPerfil);
// Si el usuario ya existe, actualizar su información si no existe lo agrega en el array
      if (usuarioExistente !== -1) {
          losUsuarios[usuarioExistente] = nuevoUser;
      } else {
          losUsuarios.push(nuevoUser);
      }

      localStorage.setItem('informacionUsuarios', JSON.stringify(losUsuarios));

      console.log('Información guardada o actualizada:', losUsuarios);
  });

  // Cargar los datos asociados al email del usuario logueado
  const losUsuarios = JSON.parse(localStorage.getItem('informacionUsuarios')) || [];

  if (losUsuarios.length > 0 && ultimoEmail) {
      // Buscar el usuario con el email del login
      const usuarioActual = losUsuarios.find(usuario => usuario.email === ultimoEmail);

      if (usuarioActual) {
          document.getElementById('usuario').value = usuarioActual.usuario || '';
          document.getElementById('nombre').value = usuarioActual.nombre || '';
          document.getElementById('segundoNombre').value = usuarioActual.segundoNombre || '';
          document.getElementById('apellido').value = usuarioActual.apellido || '';
          document.getElementById('segundoApellido').value = usuarioActual.segundoApellido || '';
          document.getElementById('emailPerfil').value = usuarioActual.email || '';
          document.getElementById('contacto').value = usuarioActual.contacto || '';

      }
  }
});
