document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const modalMessage = document.getElementById('modalMessage');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validarFormulario()) {
            mostrarMensajeError('Por favor, rellena el formulario correctamente.');
            return;
        }

        const formData = {
            usuario: form.usuario.value,
            nombre: form.nombre.value,
            password: form.password.value,
            correo: form.correo.value,
            telefono: form.telefono.value
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensajeExito(`Suscripción exitosa. Datos recibidos: ${JSON.stringify(data)}`);
                localStorage.setItem('formData', JSON.stringify(data));
            } else {
                mostrarMensajeError(`Error en la suscripción: ${data.message}`);
            }
        } catch (error) {
            mostrarMensajeError(`Error en la suscripción: ${error.message}`);
        }
    });

    function validarFormulario() {
        // Validar cada campo del formulario según tus criterios
        // Aquí debes implementar la lógica de validación del formulario
        return true; // Cambia esto por el resultado de la validación
    }

    function mostrarMensajeExito(mensaje) {
        modalMessage.textContent = mensaje;
        modal.style.display = 'block';
    }

    function mostrarMensajeError(mensaje) {
        modalMessage.textContent = mensaje;
        modal.style.display = 'block';
    }

    function cargarDatosGuardados() {
        const datosGuardados = localStorage.getItem('formData');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            form.usuario.value = datos.usuario;
            form.nombre.value = datos.nombre;
            form.correo.value = datos.correo;
            form.telefono.value = datos.telefono;
        }
    }

    cargarDatosGuardados();
});
