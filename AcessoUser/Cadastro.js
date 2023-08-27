const db = firestore.collection("CadastroUser");
const signupForm = document.getElementById("signupForm");


function checkRequiredFields() {
  const requiredFields = ['userName', 'userEmail', 'password', 'confirmPassword', 'userType'];
  let hasEmptyFields = false;

  requiredFields.forEach(fieldId => {
    const field = signupForm[fieldId];
    if (!field.value.trim()) {
      hasEmptyFields = true;
      field.classList.add('is-invalid');
    }
  });

  if (hasEmptyFields) {
    const toast = new bootstrap.Toast(document.getElementById('requiredFieldsErrorToast'));
    document.getElementById('requiredFieldsErrorMessage').textContent = 'Preencha todos os campos obrigatórios antes de enviar.';
    toast.show();
  }

  return !hasEmptyFields;
}
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!checkRequiredFields()) {
    return;
  }

  const userName = signupForm.userName.value;
  const userEmail = signupForm.userEmail.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirmPassword.value;
  const userType = signupForm.userType.value;
  const userAge = signupForm.userAge.value;

  // Verificar se as senhas são iguais
  if (password !== confirmPassword) {
    const passwordErrorToast = new bootstrap.Toast(document.getElementById('passwordErrorToast'));
    document.getElementById('passwordErrorMessage').textContent = "As senhas informadas não coincidem. Por favor, verifique e tente novamente."
    passwordErrorToast.show();
    return;
  }

    // Adicione a verificação de idade aqui
    const userBirthDate = new Date(userAge);
    const currentDate = new Date();
    const ageDifferenceInMilliseconds = currentDate - userBirthDate;
    const ageInYears = ageDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    if (ageInYears < 15) {
      // Exiba uma mensagem de erro e retorne para evitar o envio do formulário
      const ageErrorToast = new bootstrap.Toast(document.getElementById('ageErrorToast'));
      document.getElementById('ageErrorMessage').textContent = "Você deve ter pelo menos 15 anos para se cadastrar.";
      ageErrorToast.show();
      return;
    }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(userEmail, password);
    console.log("User registered:", userCredential.user.uid);

    await userCredential.user.updateProfile({
      displayName: userName
    });

    await db.doc(userCredential.user.uid).set({
      idName: userName,
      idEmail: userEmail,
      userType: userType,
      userAge: userAge,
    });

    console.log("Additional data saved in Firestore.");
    const emailMessageToast = new bootstrap.Toast(document.getElementById('emailMessageToast'));
    document.getElementById('emailMessage').textContent = "Seu cadastro foi efetuado com sucesso!"
    emailMessageToast.show();

    if (userType === "ONG") {
      window.location.href = "userOng.html";
    } else if (userType === "Voluntário") {
      window.location.href = "AcessoUser.html";
    } else {
      window.location.href = "index.html";
    }

    signupForm.reset();
  } catch (error) {
    console.error("Error registering user:", error);
    const cadastroMessageToast = new bootstrap.Toast(document.getElementById('cadastroMessageToast'));
    document.getElementById('cadastroMessage').textContent = "Esse e-mail já está em uso."
    cadastroMessageToast.show();
  }
});



let loginButton = document.getElementById("login");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let loginEmail = document.getElementById("email").value;
  let loginPassword = document.getElementById("password").value;

  try {
    await auth.signInWithEmailAndPassword(loginEmail, loginPassword);

    console.log("Login successful");

    window.location.href = "User.html";
  } catch (error) {
    console.error("Error logging in:", error);
    document.getElementById("error-message").textContent = "Credenciais inválidas. Por favor, verifique seu email e senha.";
  }
});


