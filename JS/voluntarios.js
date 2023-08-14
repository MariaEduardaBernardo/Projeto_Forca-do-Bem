// Recuperar a coleção de usuários do Firestore
const usersCollection = firestore.collection("CadastroUser");

// Filtrar e exibir usuários voluntários
function displayVolunteers() {
  const volunteersList = document.getElementById("volunteersList");

  usersCollection.where("userType", "==", "Voluntário").get()
    .then((querySnapshot) => {
      const volunteersData = [];

      querySnapshot.forEach((doc) => {
        const volunteerData = doc.data();
        const volunteerName = volunteerData.idName; // Obtém o nome do voluntário
        volunteersData.push({ name: volunteerName, data: volunteerData }); // Passo 1 e 2
      });

      volunteersData.sort((a, b) => a.name.localeCompare(b.name)); // Passo 3

      volunteersData.forEach((volunteer) => { // Passo 4
        const volunteerCard = document.createElement("div");
        volunteerCard.className = "volunteer-card";

        const volunteerPhoto = document.createElement("img");
        volunteerPhoto.className = "volunteer-photo";
        volunteerPhoto.src = "https://uploaddeimagens.com.br/images/004/569/516/full/imagem_2023-08-07_223109213.png?1691458279";
        volunteerPhoto.alt = "Foto de Perfil";

        const volunteerInfo = document.createElement("div");
        volunteerInfo.className = "volunteer-info";
        volunteerInfo.innerHTML = `
          <h4>${volunteer.name}</h4>
          <ul>
            <li>Email: ${volunteer.data.idEmail}</li>
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
