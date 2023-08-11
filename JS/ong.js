// Filtrar e exibir usuários ONGs
function displayONGs() {
  const ongsList = document.getElementById("ongsList"); // Certifique-se de ter um elemento HTML com id "ongsList"

  usersCollection.where("userType", "==", "ONG").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const ongData = doc.data();
        const ongCard = document.createElement("div");
        ongCard.className = "ong-card"; // Defina as classes apropriadas para o estilo da ONG

        // Criar elementos para o logo e informações da ONG
        const ongLogo = document.createElement("img");
        ongLogo.className = "ong-logo"; // Defina as classes apropriadas para o estilo do logo da ONG
        ongLogo.src = "caminho/para/o/logo_da_ong.png"; // Insira o caminho correto para o logo
        ongLogo.alt = "Logo da ONG";

        const ongInfo = document.createElement("div");
        ongInfo.className = "ong-info"; // Defina as classes apropriadas para o estilo das informações da ONG
        ongInfo.innerHTML = `
          <h4>${ongData.idName}</h4>
          <ul>
            <li>Email: ${ongData.idEmail}</li>
            <!-- Outras informações da ONG -->
          </ul>
        `;

        ongCard.appendChild(ongLogo);
        ongCard.appendChild(ongInfo);
        ongsList.appendChild(ongCard);
      });
    })
    .catch((error) => {
      console.error("Error getting ONGs:", error);
    });
}
window.onload = displayONGs;
