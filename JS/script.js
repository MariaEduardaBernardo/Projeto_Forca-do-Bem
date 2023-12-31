/* Footer */
$(function() {
  $(".footerContainer").load("/HTML/footer.html");
});

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

const db = firebase.firestore().collection("CadastroUser");

function redirectToProfile() {
const user = firebase.auth().currentUser;

if (user) {
  const userId = user.uid;

  db.doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        const userType = doc.data().userType;

        if (userType === "ONG") {
          window.location.href = "userOng.html";
        } else if (userType === "Voluntário") {
          window.location.href = "User.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        console.error("User data not found");
        window.location.href = "AcessoUser.html";
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      window.location.href = "AcessoUser.html";
    });
} else {
  window.location.href = "AcessoUser.html";
}
}

// Verifique se o usuário está autenticado
firebase.auth().onAuthStateChanged((user) => {
  const testButton = document.getElementById("testButton");
  const message = document.getElementById("message");
  document.querySelector('.overlay').style.display = 'none';

  if (user) {
      // Usuário autenticado
      const userId = user.uid;
      db.doc(userId)
          .get()
          .then((doc) => {
              if (doc.exists) {
                  const userType = doc.data().userType;
                  if (userType === "Voluntário") {
                      testButton.style.display = "block";
                      message.style.display = "none";
                  } else {
                      testButton.style.display = "none";
                      message.innerText = "Você está autenticado, mas precisa ser um Voluntário para fazer o teste.";
                      message.style.display = "block";
                      document.querySelector('.overlay').style.display = 'none';
                  }
              }
          })
  } else {
      // Usuário não autenticado
      testButton.style.display = "none";
      message.style.display = "block";
      message.innerText = "Para descobrir a ONG que combina com você, é necessário fazer login como Voluntário.";
      document.querySelector('.overlay').style.display = 'none';
  }
});

function showLoader() {
  document.querySelector('.overlay').style.display = 'flex';
}

function hideLoader() {
  document.querySelector('.overlay').style.display = 'none';
}

const express = require('express');
const cookieParser = require('cookie-parser');
const { BalancedPool } = require('undici-types');

const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), fullscreen=(self)');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});

app.get('/', (req, res) => {
    res.cookie('nomeDoCookie', 'valorDoCookie', {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.send('Cookie definido com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});

