const db = firestore.collection("CadastroUser");
const loginForm = document.getElementById("FormCadastro");


// Função para realizar o login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let loginEmail = document.getElementById("email").value;
  let loginPassword = document.getElementById("password").value;

  db.where("idEmail", "==", loginEmail)
    .where("idPw", "==", loginPassword)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("Invalid credentials");
        document.getElementById("error-message").textContent = "Credenciais inválidas. Por favor, verifique seu email e senha.";
      } else {
        // User exists, perform login logic here
        console.log("Login successful");
        window.location.href = "User.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // O usuário está autenticado
    console.log('Usuário autenticado:', user.email);

    // Exibir o email do usuário
    let userEmailElement = document.getElementById("userEmail");
    userEmailElement.textContent = user.email;

    // Exibir o contêiner com as informações do usuário
    document.getElementById("hello-world").style.display = "block";

  } else {
    window.location.href = "index.html";
  }
});
  window.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        window.location.href = "HTML/AcessoUser.html";
      }).catch((error) => {
        // Ocorreu um erro ao fazer logout
        console.log('Erro ao fazer logout:', error);
      });
    });
  });

  form.recoverPasswordButton().addEventListener("click", (e) => {
    e.preventDefault();
    recoverPassword();
  });



