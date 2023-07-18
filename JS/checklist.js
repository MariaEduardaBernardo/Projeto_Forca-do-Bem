const ongs = [
    {
      nome: "A gente ajuda",
      itens: ["Financeira", "Roupa","Alimento","Voluntario"]
    },
    {
      nome: "Ação da cidadania",
      itens: ["Financeira", "Roupa","Brinquedo","Alimento","Voluntario","Cobertor"]
    },
    {
      nome: "Caminha Down",
      itens: ["Financeira","Voluntario","Campanha"]
    },
    {
      nome: "Escoteiros do Brasil",
      itens: ["Financeira","Voluntario","Campanha"]
    },
    {
      nome: "Hamburgada do bem",
      itens: ["Financeira", "Voluntario"]
    },
    {
      nome: "Instituto Mara Gabrilli",
      itens: ["Financeira","Voluntario","Campanha"]
    },
    {
      nome: "Themis Furigo",
      itens: ["Financeira"]
    }
  ];

  const ongURLs = {
    "A gente ajuda": "ong_1.html",
    "Ação da cidadania": "ong_2.html",
    "Caminha Down": "ong_3.html",
    "Escoteiros do Brasil": "ong_4.html",
    "Hamburgada do bem": "ong_5.html",
    "Instituto Mara Gabrilli": "ong_6.html",
    "Themis Furigo": "ong_7.html"
  };

  function showRelatedONGs() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
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

