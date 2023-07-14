const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


// Função para verificar se a senha é forte
function isStrongPassword(password) {
    // Defina a expressão regular para verificar se a senha é forte
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,20}$/;
    return passwordRegex.test(password);
}

// Função para validar a senha
function validatePassword() {
    var passwordInput = document.getElementById("validationCustom05");
    var password = passwordInput.value;

    if (!isStrongPassword(password)) {
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
        return false;
    }

    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
    return true;
}

// Adicionar um ouvinte de evento para chamar a função de validação quando o campo de senha for alterado
var passwordInput = document.getElementById("validationCustom05");
passwordInput.addEventListener("input", validatePassword);

// Exemplo starter JavaScript para desabilitar o envio do formulário se houver campos inválidos
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity() || !validatePassword()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

