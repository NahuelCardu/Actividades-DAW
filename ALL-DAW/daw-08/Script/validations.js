document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("subscriptionForm");
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("blur", validateField);
        input.addEventListener("focus", () => {
            const errorElement = document.getElementById(`error-${input.id}`);
            errorElement.textContent = "";
        });
    });

    document.getElementById("submitButton").addEventListener("click", (e) => {
        e.preventDefault();
        let allValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                allValid = false;
            }
        });

        if (allValid) {
            alert("Formulario enviado correctamente!");
        } else {
            alert("Hay errores en el formulario.");
        }
    });
});

function validateField(event) {
    const input = event.target;
    const errorElement = document.getElementById(`error-${input.id}`);
    let valid = true;

    switch (input.id) {
        case "fullName":
            valid = /^[a-zA-Z]+ [a-zA-Z]+/.test(input.value) && input.value.length > 6;
            if (!valid) errorElement.textContent = "Nombre completo inválido.";
            break;
        case "email":
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            if (!valid) errorElement.textContent = "Email inválido.";
            break;
        case "password":
            valid = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(input.value);
            if (!valid) errorElement.textContent = "Contraseña inválida.";
            break;
        case "confirmPassword":
            valid = input.value === document.getElementById("password").value;
            if (!valid) errorElement.textContent = "Las contraseñas no coinciden.";
            break;
        case "age":
            valid = Number.isInteger(parseInt(input.value)) && parseInt(input.value) >= 18;
            if (!valid) errorElement.textContent = "Edad inválida.";
            break;
        case "phone":
            valid = /^\d{7,}$/.test(input.value);
            if (!valid) errorElement.textContent = "Teléfono inválido.";
            break;
        case "address":
            valid = /^.{3,}\s.{2,}/.test(input.value);
            if (!valid) errorElement.textContent = "Dirección inválida.";
            break;
        case "city":
            valid = input.value.length >= 3;
            if (!valid) errorElement.textContent = "Ciudad inválida.";
            break;
        case "postalCode":
            valid = input.value.length >= 3;
            if (!valid) errorElement.textContent = "Código postal inválido.";
            break;
        case "dni":
            valid = /^\d{7,8}$/.test(input.value);
            if (!valid) errorElement.textContent = "DNI inválido.";
            break;
    }

    return valid;
}
