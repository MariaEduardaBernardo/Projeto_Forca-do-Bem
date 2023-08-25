// Recuperar a coleção de usuários do Firestore
const usersCollection = firestore.collection("CadastroUser");

function displayVolunteers() {
  const volunteersList = document.getElementById("volunteersList");

  usersCollection.where("userType", "==", "Voluntário").get()
    .then(async (querySnapshot) => {
      const volunteersData = [];

      for (const doc of querySnapshot.docs) {
        const volunteerData = doc.data();
        const volunteerName = volunteerData.idName; // Obtém o nome do voluntário
        const volunteerId = doc.id;

        // Buscar a URL da foto de perfil da coleção "CadastroUser"
        const selectedPhotoUrl = volunteerData.fotoPerfil || "https://uploaddeimagens.com.br/images/004/569/516/full/imagem_2023-08-07_223109213.png?1691458279"; // URL padrão

        // Buscar os dados da subcoleção 'additionalInfo'
        const additionalInfoSnapshot = await usersCollection.doc(volunteerId).collection('additionalInfo').get();
        let volunteerTypeHelp = "";

        additionalInfoSnapshot.forEach((additionalDoc) => {
          const additionalData = additionalDoc.data();
          volunteerTypeHelp += additionalData.value + ", "; // Captura os valores de como ajudar
        });

        volunteersData.push({
          id: volunteerId,
          name: volunteerName,
          typeHelp: volunteerTypeHelp,
          data: volunteerData,
          photoUrl: selectedPhotoUrl // Adicione a URL da foto de perfil
        });
      }

      volunteersData.sort((a, b) => a.name.localeCompare(b.name));

      volunteersData.forEach((volunteer) => {
        const volunteerCard = document.createElement("div");
        volunteerCard.className = "volunteer-card";

        const volunteerPhoto = document.createElement("img");
        volunteerPhoto.className = "volunteer-photo";
        volunteerPhoto.src = volunteer.photoUrl; // Use a URL da foto de perfil
        volunteerPhoto.alt = "Foto de Perfil";

        const volunteerInfo = document.createElement("div");
        volunteerInfo.className = "volunteer-info";

        const user = firebase.auth().currentUser;
        const userType = user.userType;
        
        if (userType == "ONG") {

          volunteerInfo.innerHTML = `
            <h4>${volunteer.name}</h4>
            <ul>
              <p>Email: ${volunteer.data.idEmail}</p>
              <p>Idade: ${volunteer.data.userAge}</p>
              <li>Formas de Ajudar: ${volunteer.typeHelp}</li>
            </ul>
          `;
        } else {
          volunteerInfo.innerHTML = `
            <h4>${volunteer.name}</h4>
            <ul>
              <li>Formas de Ajudar: ${volunteer.typeHelp || 'Nenhuma forma de ajuda especificada'}</li>
            </ul>
          `;
        }

        volunteerCard.appendChild(volunteerPhoto);
        volunteerCard.appendChild(volunteerInfo);
        volunteersList.appendChild(volunteerCard);
      });
        document.querySelector('.overlay').style.display = 'none';
    })
    .catch((error) => {
      console.error("Error getting volunteers:", error);
        document.querySelector('.overlay').style.display = 'none';

    });
}

window.onload = displayVolunteers;

