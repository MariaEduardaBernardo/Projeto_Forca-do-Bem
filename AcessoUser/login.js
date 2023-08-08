const db = firestore.collection("CadastroUser");
const loginForm = document.getElementById("FormCadastro");

// Função para realizar o login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  let loginEmail = document.getElementById("email").value;
  let loginPassword = document.getElementById("password").value;

  // Query the database to check if the user exists
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
    // O usuário não está autenticado, redirecionar para a página "teste.html"
    window.location.href = "index.html";
  }
});
  window.addEventListener('DOMContentLoaded', () => {
    // ...

    // Adicionar ouvinte de eventos para o botão de sair
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        // Logout bem-sucedido, redirecionar para a página "teste.html"
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



function toggleSenhaVisivel() {
  var senhaInput = document.querySelector(".senha");
  var btnIcon = document.querySelector(".btnIcon");

  if (senhaInput.type === "password") {
      senhaInput.type = "text";
      btnIcon.src = "https://cdn-icons-png.flaticon.com/128/2767/2767146.png";
  } else {
      senhaInput.type = "password";
      btnIcon.src = "https://cdn-icons-png.flaticon.com/128/709/709612.png";
  }
}

function recoverPassword() {
  showLoading();
  firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
      hideLoading();
      alert('Email enviado com sucesso');
  }).catch(error => {
      hideLoading();
      alert(getErrorMessage(error));
  });
}

