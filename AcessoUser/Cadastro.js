const db = firestore.collection("CadastroUser");
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = signupForm.userName.value;
  const userEmail = signupForm.userEmail.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirmPassword.value;
  const userType = signupForm.userType.value;

  // Crie o usuário usando o Firebase Authentication
  auth.createUserWithEmailAndPassword(userEmail, password)
    .then((userCredential) => {
      // Usuário criado com sucesso
      console.log("User registered:", userCredential.user.uid);

      // Atualize o nome de usuário no Firebase Authentication
      return userCredential.user.updateProfile({
        displayName: userName
      })
        .then(() => {
          // Salve os dados adicionais no Firestore
          return db.doc(userCredential.user.uid).set({
            idName: userName,
            idEmail: userEmail,
            userType: userType,
          });
        })
        // Após o cadastro bem-sucedido
        .then(() => {
          console.log("Additional data saved in Firestore.");
          alert("Registro bem-sucedido! Você pode fazer login agora.");

          // Redirecionar o usuário com base no tipo escolhido
          if (userType === "ONG") {
            window.location.href = "userOng.html";
          } else if (userType === "Voluntário") {
            window.location.href = "User.html";
          } else {
            window.location.href = "index.html";
          }

          signupForm.reset();
        })

        .catch((error) => {
          // Ocorreu um erro durante o registro
          console.error("Error saving additional data:", error);
          alert("Erro ao registrar usuário.");
        });
    })
    .catch((error) => {
      // Ocorreu um erro durante o registro
      console.error("Error registering user:", error);
      alert("Erro ao registrar usuário. Esse e-mail já está em uso.");
    });


  function isPasswordStrong(password) {
    // Pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  const passwordInput = document.getElementById("idPw");
  const passwordMessage = document.getElementById("password-message");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    if (isPasswordStrong(password)) {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
      passwordMessage.style.display = "none";
    } else {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
      passwordMessage.style.display = "block";
    }
  });

  // Verificar se as senhas informadas e a confirmação são iguais
  if (password !== confirmPassword) {
    console.log("A senha não são iguais");
    alert("As senhas informadas não coincidem. Por favor, verifique e tente novamente.");
    return;
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

