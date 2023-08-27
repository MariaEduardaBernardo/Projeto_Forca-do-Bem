firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // O usuário está autenticado
    console.log('Usuário autenticado:', user.displayName, user.email);

    // Exibir o nome de usuário e email do usuário
    let userNameElement = document.getElementById("userName");
    let userEmailElement = document.getElementById("userEmail");
    let userPhotoElement = document.getElementById("userPhoto");
    let userAgeElement = document.getElementById("userAge");

    userNameElement.textContent = user.displayName;
    userEmailElement.textContent = user.email;

    // Recupere a escolha da foto de perfil do Firestore e exiba-a na página
    var userDocRef = firebase.firestore().collection("CadastroUser").doc(userId);

    userDocRef.get()
      .then(function(doc) {
        if (doc.exists) {
          var selectedPhotoUrl = doc.data().fotoPerfil;
          // Exiba a foto de perfil na página
          userPhotoElement.src = selectedPhotoUrl;
        } else {
          console.log("Documento de usuário não encontrado.");
        }
      })
      .catch(function(error) {
        console.error("Erro ao recuperar a escolha da foto de perfil: ", error);
      });

    // Resto do código para capturar a escolha da foto e salvar (como mencionado anteriormente)...
  } else {
    window.location.href = "AcessoUser.html";
  }
});

// Capturar o clique nas opções de fotos
var profilePhotoOptions = document.querySelectorAll(".profile-photo-option");
profilePhotoOptions.forEach(function(option) {
  option.addEventListener("click", function() {
    // Remova a classe 'selected' de todas as opções de fotos
    profilePhotoOptions.forEach(function(photo) {
      photo.classList.remove("selected");
    });

    // Adicione a classe 'selected' à opção de foto clicada
    option.classList.add("selected");
  });
});

// Adicione um evento de clique ao botão "Salvar" no modal
document.getElementById("profile-photo-option").addEventListener("click", function() {
console.log("Botão 'Salvar' clicado.");

// Encontre a opção de foto selecionada
var selectedOption = document.querySelector(".profile-photo-option.selected");

if (selectedOption) {
  console.log("Foto selecionada:", selectedOption.src);

  var selectedPhotoUrl = selectedOption.src;
  var userId = firebase.auth().currentUser.uid; // Obtenha o ID do usuário autenticado

  // Salvar a escolha da foto de perfil no Firestore
  firebase.firestore().collection("CadastroUser").doc(userId).update({
    fotoPerfil: selectedPhotoUrl
  })
  .then(function() {
    console.log("Escolha da foto de perfil salva com sucesso!");

    // Atualize a foto de perfil exibida na página
    document.getElementById("userPhoto").src = selectedPhotoUrl;

    var newAge = document.getElementById("userAgeInput").value;

    firebase.firestore().collection("CadastroUser").doc(userId).update({
      userAge: newAge
    })
    .then(function() {
      console.log("A idade do usuário foi atualizada com sucesso!");
    })
    .catch(function(error) {
      console.error("Erro ao atualizar a idade: ", error);
    });

    // Feche o modal (opcional)
    document.getElementById("photoModal").style.display = "none";
  })
  .catch(function(error) {
    console.error("Erro ao salvar a escolha da foto de perfil: ", error);
  });
} else {
  // Exiba uma mensagem de erro ao usuário, solicitando que ele selecione uma foto
  alert("Por favor, selecione uma foto de perfil.");
}
});


  // Abra o modalUser quando o botão for clicado
  document.getElementById("editProfileButton").addEventListener("click", function() {
    document.getElementById("photoModal").style.display = "block";
    });

    // Feche o modalUser quando o usuário clicar fora da área do modalUser
    window.addEventListener("click", function(event) {
    var modalUser = document.getElementById("photoModal");
    if (event.target === modalUser) {
      modalUser.style.display = "none";
    }
  });


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // O usuário está autenticado
    console.log('Usuário autenticado:', user.displayName, user.email, user.displayAge);

    // Exibir o nome de usuário e email do usuário
    let userNameElement = document.getElementById("userName");
    let userEmailElement = document.getElementById("userEmail");
    let userAgeElement = document.getElementById("userAge");

    userNameElement.textContent = user.displayName;
    userEmailElement.textContent = user.email;
    userAgeElement.textContent = user.displayAge;

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

  updateIntroText();
});

const infoForm = document.getElementById("infoForm");
const additionalInfoList = document.getElementById("additionalInfoList");

// Função para renderizar os dados na tela
async function renderDataOnPage(userId) {
  try {
    // Limpar a lista antes de renderizar novamente


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

    const toastExclusao = new bootstrap.Toast(document.getElementById('toastExclusao'));
    toastExclusao.show();

    console.log("Informações adicionais excluídas do Firestore.");
  } catch (error) {
    console.error("Erro ao excluir informações adicionais:", error);
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

const photoOptions = document.querySelectorAll('.profile-photo-option');

photoOptions.forEach(photo => {
  photo.addEventListener('click', () => {
    photoOptions.forEach(p => p.classList.remove('selected'));

    photo.classList.add('selected');
  });
});

document.getElementById("cancelButton").addEventListener("click", function() {
  document.getElementById("photoModal").style.display = "none";
});
