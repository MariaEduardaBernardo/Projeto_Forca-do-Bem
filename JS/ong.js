 // Função para obter o parâmetro 'id' da URL
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Obtém o ID da ONG da URL
    const ongId = getParameterByName('id');

    // Busca as informações da ONG no Firebase
    db.collection("ongs")
      .doc(ongId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const ongData = doc.data();

          // Exibe o nome da ONG na página
          const ongInfo = document.getElementById("ongInfo");
          ongInfo.innerHTML = `
            <h2>${ongData.name}</h2>
          `;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });


// Referência ao documento da ONG
const ongDocRef = firestore.collection("ongs").doc(ongId);

ongDocRef.get().then((doc) => {
  if (doc.exists) {
    // Acessando a subcoleção "Informacoes"
    const informacoesSubcollection = doc.ref.collection("Informacoes");

    informacoesSubcollection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const informacoesData = doc.data();

        const ongName = informacoesData.ongName;
        const ongEmail = informacoesData.ongEmail;
        const ongPhone = informacoesData.ongPhone;
        const ongAddress = informacoesData.ongAddress;
        const ongCity = informacoesData.ongCity;
        const ongStates = informacoesData.ongStates;
        const ongAbout = informacoesData.ongAbout;
        const foto1 = informacoesData.foto1;
        const foto2 = informacoesData.foto2;
        const foto3 = informacoesData.foto3;

        // Exibindo informações da ONG em elementos HTML
        const ongNameElement = document.getElementById("ongName");
        const ongEmailElement = document.getElementById("ongEmail");
        const ongPhoneElement = document.getElementById("ongPhone");
        const ongAddressElement = document.getElementById("ongAddress");
        const ongCityElement = document.getElementById("ongCity");
        const ongStatesElement = document.getElementById("ongStates");
        const ongAboutElement = document.getElementById("ongAbout");
        const foto1Element = document.getElementById("foto1");
        const foto2Element = document.getElementById("foto2");
        const foto3Element = document.getElementById("foto3");

        ongAboutElement.textContent = ongAbout;
        ongNameElement.textContent = ongName;
        ongEmailElement.textContent = ongEmail;
        ongPhoneElement.textContent = ongPhone;
        ongAddressElement.textContent = ongAddress;
        ongCityElement.textContent = ongCity;
        ongStatesElement.textContent = ongStates;

        foto1Element.src = foto1;
        foto2Element.src = foto2;
        foto3Element.src = foto3;
      });
    }).catch((error) => {
      console.error("Erro ao recuperar informações da subcoleção Informacoes:", error);
    });
  } else {
    console.log("Documento da ONG não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar informações da ONG:", error);
});
