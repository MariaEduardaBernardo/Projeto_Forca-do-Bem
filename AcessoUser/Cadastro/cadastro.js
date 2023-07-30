firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../home/home.html";
    }
})

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 8 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

///////

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        hideLoading();
        // Salvando o email no Firestore na coleção "CadastroUser"
        saveEmailToFirestore(userCredential.user, email);

        // Redirecionar para a página home após o registro
        window.location.href = "../../pages/home/home.html";
      })
      .catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
      });
  }

  function saveEmailToFirestore(user, email) {
    const db = firebase.firestore();
    const userID = user.uid;

    db.collection("CadastroUser").doc(userID).set({
      email: email
    })
    .then(() => {
      console.log("Email salvo no Firestore para o usuário com ID:", userID);
    })
    .catch((error) => {
      console.log("Erro ao salvar email no Firestore:", error);
    });
  }
