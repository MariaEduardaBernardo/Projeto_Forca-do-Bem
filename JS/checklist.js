const ongs = [
  {
      nome: "A gente ajuda",
      itens: ["Financeira", "Roupa", "Alimento", "Voluntario", "Campanha"]
  },
  {
      nome: "Ação da cidadania",
      itens: ["Financeira", "Roupa", "Brinquedo", "Alimento", "Voluntario", "Cobertor", "Campanha", "Animais", "Higiene"]
  },
  {
      nome: "Caminha Down",
      itens: ["Financeira", "Voluntario", "Campanha"]
  },
  {
      nome: "Escoteiros do Brasil",
      itens: ["Financeira", "Voluntario", "Campanha"]
  },
  {
      nome: "Hamburgada do bem",
      itens: ["Financeira", "Voluntario"]
  },
  {
      nome: "Instituto Mara Gabrilli",
      itens: ["Financeira", "Voluntario", "Campanha"]
  },
  {
      nome: "Themis Furigo",
      itens: ["Financeira"]
  }
];

  const ongURLs = {
    "A gente ajuda": "ong_2.html",
    "Ação da cidadania": "ong_1.html",
    "Caminha Down": "ong_3.html",
    "Escoteiros do Brasil": "ong_4.html",
    "Hamburgada do bem": "ong_5.html",
    "Instituto Mara Gabrilli": "ong_6.html",
    "Themis Furigo": "ong_7.html"
  };
  
  function showRelatedONGs() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
      const toast = new bootstrap.Toast(document.getElementById('toastNoOptions'));
      toast.show();
    } else {
      const selectedOptions = Array.from(checkboxes).map(checkbox => checkbox.value);

      const relatedONGs = ongs.filter(ong => {
        return selectedOptions.every(option => ong.itens.includes(option));
      });

      // Constrói a URL de redirecionamento com os parâmetros de consulta
      const url = new URL('resultado.html', window.location.href);
      url.searchParams.append('ongs', JSON.stringify(relatedONGs));

      // Redireciona o usuário para a nova página
      window.location.href = url.href;
    }
  }

// Obtém as ONGs relacionadas da URL de consulta
const urlParams = new URLSearchParams(window.location.search);
const relatedONGs = urlParams.get('ongs');

const ongList = document.getElementById('ongList');
if (relatedONGs) {
    const ongsToShow = JSON.parse(relatedONGs);

    ongsToShow.forEach(ong => {
        const card = document.createElement('div');
        card.classList.add('ong-card');

        const title = document.createElement('h6');
        const link = document.createElement('a');
        link.href = getONGURL(ong.nome);
        link.textContent = ong.nome;
        title.appendChild(link);

        const description = document.createElement('p');
        description.textContent = ong.descricao;

        link.style.color = 'white';

        card.appendChild(title);
        card.appendChild(description);

        ongList.appendChild(card);
    });
}

function getONGURL(nome) {
    return ongURLs[nome];
}

// Função para buscar as informações das ONGs no Firebase
async function fetchONGsData() {
  try {
    const ongsCollection = await firestore.collection("ongs").get();
    const ongsData = ongsCollection.docs.map(doc => doc.data());
    return ongsData;
  } catch (error) {
    console.error("Erro ao buscar informações das ONGs:", error);
    return [];
  }
}
