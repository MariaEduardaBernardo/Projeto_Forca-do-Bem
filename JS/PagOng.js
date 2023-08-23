firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const dadosOnginicio = firebase.firestore(); // Assumindo que você já inicializou o Firebase em algum lugar do seu código.


function displayOngs() {
const ongsList = document.querySelector(".bloco_ong");


dadosOnginicio.collection("ongs")
.get()
.then((querySnapshot) => {
  const ongsData = [];

  querySnapshot.forEach((doc) => {
    const ongData = doc.data();
    ongsData.push({ id: doc.id, ...ongData }); // Inclui também o ID do documento
  });

  // Ordena os dados das ONGs pelo nome em ordem alfabética
  ongsData.sort((a, b) => a.name.localeCompare(b.name));

  ongsList.innerHTML = '';

  ongsData.forEach((ongData) => {
    const ongItem = document.createElement("li");
    ongItem.innerHTML = `
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
          <p class="bloco_description">${ongData.description}</p>
        </div>
      </a>
    `;

    ongsList.appendChild(ongItem);
  });
})
.catch((error) => {
  console.error("Error getting ongs:", error);
});
}

window.onload = displayOngs;
