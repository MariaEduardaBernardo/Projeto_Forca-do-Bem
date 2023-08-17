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
            window.location.href = "user.html"; // Substitua pelo nome da página do voluntário
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


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // O usuário está autenticado
    console.log('Usuário autenticado:', user.displayName, user.email);

    // Exibir o nome de usuário e email do usuário
    let userNameElement = document.getElementById("userName");
    let userEmailElement = document.getElementById("userEmail");

    userNameElement.textContent = user.displayName;
    userEmailElement.textContent = user.email;

    // Exibir o contêiner com as informações do usuário
    document.getElementById("hello-world").style.display = "block";

    // Renderizar os dados adicionais do usuário
    renderDataOnPage(userId);
  } else {
    // O usuário não está autenticado, redirecionar para a página "AcessoUser.html"
    window.location.href = "AcessoUser.html";
  }
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // O usuário está autenticado
    console.log('Usuário autenticado:', user.displayName, user.email);

    // Exibir o nome de usuário e email do usuário
    let userNameElement = document.getElementById("userName");
    let userEmailElement = document.getElementById("userEmail");

    userNameElement.textContent = user.displayName;
    userEmailElement.textContent = user.email;

    document.getElementById("hello-world").style.display = "block";

    renderDataOnPage(userId);
    } else {
    window.location.href = "AcessoUser.html";
    }
});

window.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
      window.location.href = "HTML/AcessoUser.html";
    }).catch((error) => {
      console.log('Erro ao fazer logout:', error);
    });
  });
});


document.getElementById("infoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var additionalParagraph = document.createElement("div");
    additionalParagraph.classList.add("additional-info-item");

    var infoText = document.createElement("span");
    infoText.textContent = additionalInfo;
    additionalParagraph.appendChild(infoText);

    var removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
      additionalParagraph.remove();
      updateIntroText();
    });
    additionalParagraph.appendChild(removeButton);

    document.getElementById("additionalInfo").appendChild(additionalParagraph);

    // Limpe o formulário
    document.getElementById("infoForm").reset();

    // Verifique se há informações adicionais e atualize a exibição do texto introdutório
    function updateIntroText() {
      var introText = document.getElementById("introText");
      if (document.getElementById("additionalInfo").children.length > 0) {
        introText.style.display = "none"; // Oculta o texto introdutório se houver informações adicionais
      } else {
        introText.style.display = "block"; // Exibe o texto introdutório se não houver informações adicionais
      }
    }

    updateIntroText();
  });
  
  const infoForm = document.getElementById("infoForm");
  const additionalInfoList = document.getElementById("additionalInfoList");

// Função para renderizar os dados na tela
async function renderDataOnPage(userId) {
  try {
    // Limpar a lista antes de renderizar novamente
    additionalInfoList.innerHTML = "";

    // Buscar os dados salvos no Firestore
    const additionalInfoSnapshot = await db.doc(userId).collection('additionalInfo').get();
    additionalInfoSnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

      listItem.textContent = data.value;

      // Criar um botão de exclusão
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.classList.add("btn", "btn-danger", "btn-sm");
      deleteButton.addEventListener("click", () => {
        deleteData(userId, doc.id);
      });

      // Adicionar o botão à lista de itens
      listItem.appendChild(deleteButton);

      // Adicionar o item à lista na tela
      additionalInfoList.appendChild(listItem);
    });

    console.log("Dados adicionais renderizados na tela.");
  } catch (error) {
    console.error("Erro ao buscar informações adicionais:", error);
  }
}

// Função para excluir dados
async function deleteData(userId, docId) {
  try {
    // Deletar o documento da subcoleção 'additionalInfo'
    await db.doc(userId).collection('additionalInfo').doc(docId).delete();

    // Limpar a lista antes de renderizar novamente
    additionalInfoList.innerHTML = "";

    // Renderizar os dados salvos na tela novamente
    await renderDataOnPage(userId);

    // Exibir o Toast de sucesso ou mensagem de exclusão
    const toastExclusao = new bootstrap.Toast(document.getElementById('toastExclusao'));
    toastExclusao.show();

    console.log("Informações adicionais excluídas do Firestore.");
  } catch (error) {
    console.error("Erro ao excluir informações adicionais:", error);
    // Exibir um Toast de erro se necessário
  }
}

// Evento de envio do formulário
infoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const typeHelpInput = document.getElementById('typeHelp');
  const typeHelp = typeHelpInput.value;

  if (!typeHelpInput.checkValidity()) {
    alert("Por favor, insira um texto com pelo menos 10 caracteres e no máximo 100 caracteres.");
    return;
  }

  const user = firebase.auth().currentUser;
  if (user) {
    const userId = user.uid;

    try {
      await db.doc(userId).collection('additionalInfo').add({
        value: typeHelp,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Limpar a lista antes de renderizar novamente
      additionalInfoList.innerHTML = "";

      // Renderizar os dados salvos na tela
      await renderDataOnPage(userId);

      console.log("Informações adicionais salvas no Firestore.");

      // Exibir o Toast de sucesso
      const toastAddSuccess = new bootstrap.Toast(document.getElementById('toastAddSuccess'));
      toastAddSuccess.show();

      infoForm.reset();
    } catch (error) {
      console.error("Erro ao salvar informações adicionais:", error);

    }
  } else {
    console.log('Usuário não autenticado. Não é possível salvar as informações.');
  }
});

// Carregar os dados ao carregar a página
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    renderDataOnPage(userId);
  }
});
