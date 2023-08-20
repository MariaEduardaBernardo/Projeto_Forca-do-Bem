
/*Menu*/
document.addEventListener("DOMContentLoaded", function() {
  var headerContainer = document.getElementById("headerContainer");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "HTML/header.html", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      headerContainer.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
});

function openModal() {
  document.getElementById("myModal").style.display = "block";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
const db = firebase.firestore().collection("CadastroUser"); // Defina db aqui

function redirectToProfile() {
const user = firebase.auth().currentUser;

if (user) {
  // O usuário está autenticado
  const userId = user.uid;

  // Obtenha os dados do usuário a partir do Firestore
  db.doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        const userType = doc.data().userType;

        if (userType === "ONG") {
          window.location.href = "userOng.html"; // Substitua pelo nome da página da ONG
        } else if (userType === "Voluntário") {
          window.location.href = "User.html"; // Substitua pelo nome da página do voluntário
        } else {
          window.location.href = "index.html"; // Substitua pelo nome da página padrão
        }
      } else {
        console.error("User data not found");
        // Redirecionar para a página de login ou página inicial
        window.location.href = "AcessoUser.html"; // Substitua pelo nome da página de login ou inicial
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      // Redirecionar para a página de login ou página inicial
      window.location.href = "AcessoUser.html"; // Substitua pelo nome da página de login ou inicial
    });
} else {
  // Redirecionar para a página de login ou página inicial
  window.location.href = "AcessoUser.html"; // Substitua pelo nome da página de login ou inicial
}
}

/* Footer */
$(function() {
    $(".footerContainer").load("/HTML/footer.html");
});
