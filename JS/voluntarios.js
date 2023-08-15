// Recuperar a coleção de usuários do Firestore
const usersCollection = firestore.collection("CadastroUser");

// Filtrar e exibir usuários voluntários
function displayVolunteers() {
  const volunteersList = document.getElementById("volunteersList");

  usersCollection.where("userType", "==", "Voluntário").get()
    .then(async (querySnapshot) => {
      const volunteersData = [];

      for (const doc of querySnapshot.docs) {
        const volunteerData = doc.data();
        const volunteerName = volunteerData.idName; // Obtém o nome do voluntário

        // Buscar os dados da subcoleção 'additionalInfo' para cada voluntário
        const additionalInfoSnapshot = await doc.ref.collection('additionalInfo').get();
        let volunteerTypeHelp = "";

        additionalInfoSnapshot.forEach((additionalDoc) => {
          const additionalData = additionalDoc.data();
          volunteerTypeHelp += additionalData.value + ", "; // Captura os valores de como ajudar
        });

        volunteersData.push({ name: volunteerName, data: volunteerData, typeHelp: volunteerTypeHelp });
      }

      volunteersData.sort((a, b) => a.name.localeCompare(b.name));

      volunteersData.forEach((volunteer) => {
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
            <li>Formas de ajudar <br> ${volunteer.typeHelp}</li>
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
