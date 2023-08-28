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
  },
  {
    nome: "Mães da Sé",
    itens: ["Financeira", "Alimento"]
  },
  {
    nome: "Mulheres Solidárias",
    itens: ["Financeira", "Voluntario"]
  }

];

  const ongURLs = {
    "A gente ajuda": "perfil_ong.html?id=NwxaqTvI5rlHLGJ7FPyj",
    "Ação da cidadania": "perfil_ong.html?id=ALdOwy6LJ8hu80kCkn8Z",
    "Caminha Down": "perfil_ong.html?id=EizWuxuwI6wYsTpcxlqD",
    "Escoteiros do Brasil": "perfil_ong.html?id=1Vc5Klv7FuvphY5JFBNt",
    "Hamburgada do bem": "perfil_ong.html?id=g9kJs7FSv5mXrObW3S3h",
    "Instituto Mara Gabrilli": "perfil_ong.html?id=KfgQWJEsgLQcXwAyqB6d",
    "Themis Furigo": "perfil_ong.html?id=DPQ15shMkYWRn3QHURx3",
    "Mães da Sé": "perfil_ong.html?id=bp2HUaJkKbupsD1kCXcZ",
    "Mulheres Solidárias": "perfil_ong.html?id=jgrYG7Fp2d9hLRBI63eM"

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

      const url = new URL('resultado.html', window.location.href);
      url.searchParams.append('ongs', JSON.stringify(relatedONGs));

      window.location.href = url.href;
    }
  }

const urlParams = new URLSearchParams(window.location.search);
const relatedONGs = urlParams.get('ongs');

const ongList = document.getElementById('ongList');

if (relatedONGs) {
    const ongsToShow = JSON.parse(relatedONGs);

    ongsToShow.forEach(ong => {
        const ongItem = document.createElement('li');
        ongItem.classList.add('bloco');
        ongItem.innerHTML = `
            <a href="${getONGURL(ong.nome)}" class="ongContainer">
                <img src="https://uploaddeimagens.com.br/images/004/541/947/full/imagem_2023-07-12_121512599.png?1689174926" class="bloco_image_result" alt="${ong.nome}" />
                <div class="bloco_overlay">
                    <div class="bloco_header">
                        <svg class="bloco__arc" xmlns="http://www.w3.org/2000/svg">
                            <path />
                        </svg>
                       <div class="bloco_title_header_ong">
                            <h2 class="bloco_title">${ong.nome}</h2>
                        </div>
                    </div>
                    <p class="bloco_description">Você pode nos ajudar de forma: ${ong.itens.join(', ')}</p>
                </div>
            </a>
        `;

        ongList.appendChild(ongItem);
    });
}


function getONGURL(nome) {
    return ongURLs[nome];
}

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
