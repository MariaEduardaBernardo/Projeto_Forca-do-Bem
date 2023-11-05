firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const dadosOnginicio = firebase.firestore();

document.addEventListener("DOMContentLoaded", function() {
  const languageSelect = document.getElementById('language-select');

  // Adicione um evento para mudança de idioma quando o usuário seleciona uma opção no dropdown
  languageSelect.addEventListener('change', function() {
    const idiomaSelecionado = languageSelect.value;
    localStorage.setItem('languageSelect', idiomaSelecionado);
    displayOngs();
  });

  function displayOngs() {
    const ongsList = document.querySelector(".bloco_ong");
    document.querySelector('.overlay').style.display = 'flex';

    const idiomaSelecionado = localStorage.getItem('languageSelect') || 'portugues';

    dadosOnginicio
      .collection("ongs")
      .where("status", "==", "aprovado")
      .get()
      .then((querySnapshot) => {
        const ongsData = [];

        querySnapshot.forEach((doc) => {
          const ongData = doc.data();
          const descricaoTraduzida = idiomaSelecionado === 'ingles' ? ongData.description_en : ongData.description;
          ongsData.push({ id: doc.id, ...ongData, descricaoTraduzida });
        });

        // Ordena os dados das ONGs pelo nome em ordem alfabética
        ongsData.sort((a, b) => a.name.localeCompare(b.name));

        ongsList.innerHTML = "";

        ongsData.forEach((ongData) => {
          const ongItem = document.createElement("li");
          ongItem.innerHTML = `
          <div class="apreOng">
            <a href="/perfil_ong.html?id=${ongData.id}" class="bloco">
              <img src="${ongData.imageUrl}" class="bloco__image" alt="" />
              <div class="bloco_overlay">
                <div class="bloco_header">
                  <svg class="bloco__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img class="bloco_img_user" src="${ongData.userImageUrl}" alt="" />
                  <div class="bloco_title_header">
                    <h3 class="bloco_title">${ongData.name}</h3>
                  </div>
                </div>
                <p class="bloco_description">${ongData.descricaoTraduzida}</p>
              </div>
            </a>
          </div>
          `;

          ongsList.appendChild(ongItem);
          document.querySelector('.overlay').style.display = 'none';
        });
      })
      .catch((error) => {
        console.error("Error getting ongs:", error);
        document.querySelector('.overlay').style.display = 'none';
      });
  }
  displayOngs();
});

