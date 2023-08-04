//Unique Firebase Object
const firebaseConfig = {
  apiKey: "AIzaSyDkgwXqmu2FXCn856hH3J68m_Ju2kwpW_0",
  authDomain: "forcadoberm.firebaseapp.com",
  projectId: "forcadoberm",
  storageBucket: "forcadoberm.appspot.com",
  messagingSenderId: "990008156205",
  appId: "1:990008156205:web:99da9a412825c7f59498a4"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var auth = firebase.auth();

//Variable to access database collection
const db = firestore.collection("CadastroUser");

//Get Submit Form
let submitButton = document.getElementById("submit");


// Adicione um listener de evento para permitir o envio do formulário
submitButton.addEventListener("click", (e) => {
e.preventDefault();

// Get Form Values
let userName = document.getElementById("idName").value;
let userEmail = document.getElementById("idEmail").value;
let password = document.getElementById("idPw").value;

// Crie o usuário usando o Firebase Authentication
auth.createUserWithEmailAndPassword(userEmail, password)
  .then((userCredential) => {
    // Usuário criado com sucesso
    console.log("User registered:", userCredential.user.uid);

    // Salve os dados adicionais no Firestore
    firestore.collection("CadastroUser").doc(userCredential.user.uid).set({
      idName: userName,
      idEmail: userEmail,
      // Pode adicionar mais campos aqui, se necessário
    })
    .then(() => {
      console.log("Additional data saved in Firestore.");
      alert("Registro bem-sucedido! Você pode fazer login agora.");
      document.getElementById("clearFrom").reset();
    })
    .catch((error) => {
      console.error("Error saving additional data:", error);
      alert("Erro ao registrar usuário. Verifique os detalhes e tente novamente.");
    });
  })
  .catch((error) => {
    // Ocorreu um erro durante o registro
    console.error("Error registering user:", error);
    alert("Erro ao registrar usuário. Verifique os detalhes e tente novamente.");
  });
});



//Get Login Form
let loginButton = document.getElementById("login");

//Create Event Listener To Allow Login
loginButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
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
        // Redirect the user to the desired page after login
        window.location.href = "/HTML/User.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
