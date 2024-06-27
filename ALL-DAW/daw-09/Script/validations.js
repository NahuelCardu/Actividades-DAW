document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        password: /^.{4,12}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/
    };

    const campos = {
        usuario: false,
        nombre: false,
        password: false,
        correo: false,
        telefono: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "usuario":
                validarCampo(expresiones.usuario, e.target, 'usuario');
                break;
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
                break;
            case "password2":
                validarPassword2();
                break;
            case "correo":
                validarCampo(expresiones.correo, e.target, 'correo');
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
        }
    };

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    };

    const validarPassword2 = () => {
        const inputPassword1 = document.getElementById('password');
        const inputPassword2 = document.getElementById('password2');

        if (inputPassword1.value !== inputPassword2.value) {
            document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos['password'] = false;
        } else {
            document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos['password'] = true;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

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

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const terminos = document.getElementById('terminos');
        if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
            const formData = {
                usuario: formulario.usuario.value,
                nombre: formulario.nombre.value,
                password: formulario.password.value,
                correo: formulario.correo.value,
                telefono: formulario.telefono.value
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
                    formulario.reset();
                    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                        icono.classList.remove('formulario__grupo-correcto');
                    });
                    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
                    setTimeout(() => {
                        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                    }, 5000);
                } else {
                    mostrarMensajeError(`Error en la suscripción: ${data.message}`);
                }
            } catch (error) {
                mostrarMensajeError(`Error en la suscripción: ${error.message}`);
            }
        } else {
            mostrarMensajeError('Por favor, rellena el formulario correctamente.');
        }
    });

    const mostrarMensajeExito = (mensaje) => {
        modalMessage.textContent = mensaje;
        modal.style.display = 'block';
    };

    const mostrarMensajeError = (mensaje) => {
        modalMessage.textContent = mensaje;
        modal.style.display = 'block';
    };

    const cargarDatosGuardados = () => {
        const datosGuardados = localStorage.getItem('formData');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            formulario.usuario.value = datos.usuario;
            formulario.nombre.value = datos.nombre;
            formulario.correo.value = datos.correo;
            formulario.telefono.value = datos.telefono;
        }
    };

    cargarDatosGuardados();
});
