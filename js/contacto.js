// Validación y simulación de envío del formulario de contacto
$(document).ready(function () {
  $('#formContacto').on('submit', function (e) {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = $('#nombre').val().trim();
    const email = $('#email').val().trim();
    const mensaje = $('#mensaje').val().trim();

    if (nombre && email && mensaje) {
      // Simular envío exitoso
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos. Te responderemos pronto.',
        confirmButtonColor: '#662269'
      });

      // Limpiar campos
      $('#formContacto')[0].reset();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena todos los campos antes de enviar.',
        confirmButtonColor: '#662269'
      });
    }
  });
});
