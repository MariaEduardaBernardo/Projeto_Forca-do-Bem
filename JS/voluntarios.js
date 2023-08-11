// Recuperar a coleção de usuários do Firestore
const usersCollection = firestore.collection("CadastroUser");

// Filtrar e exibir usuários voluntários
function displayVolunteers() {
  const volunteersList = document.getElementById("volunteersList");

  usersCollection.where("userType", "==", "Voluntário").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const volunteerData = doc.data();
        const volunteerCard = document.createElement("div");
        volunteerCard.className = "volunteer-card";


        // Criar elementos para a foto de perfil e informações do voluntário
        const volunteerPhoto = document.createElement("img");
        volunteerPhoto.className = "volunteer-photo";
        volunteerPhoto.src = "https://uploaddeimagens.com.br/images/004/569/516/full/imagem_2023-08-07_223109213.png?1691458279";
        volunteerPhoto.alt = "Foto de Perfil";

        const volunteerInfo = document.createElement("div");
        volunteerInfo.className = "volunteer-info";
        volunteerInfo.innerHTML = `
          <h4>${volunteerData.idName}</h4>
          <ul>
            <li>Email: ${volunteerData.idEmail}</li>
            <!-- Outras informações do voluntário -->
          </ul>
        `;

        volunteerCard.appendChild(volunteerPhoto);
        volunteerCard.appendChild(volunteerInfo);
        volunteersList.appendChild(volunteerCard);
      });
    })
    .catch((error) => {
      console.error("Error getting volunteers:", error);
    });
}
window.onload = displayVolunteers;
