const languageSelect = document.getElementById('language-select');

function obterTextoTraduzidoForaSubcolecao(campoId, idiomaSelecionado) {
  return textDocRef.get()
    .then((doc) => {
      if (doc.exists) {
        let textoOriginal = doc.data()[campoId];
        const nomeDoCampoIngles = `${campoId}_en`;

        if (idiomaSelecionado === "ingles" && doc.data()[nomeDoCampoIngles]) {
          textoOriginal = doc.data()[nomeDoCampoIngles];
        }

        return textoOriginal;
      } else {
        return "Texto não encontrado para este idioma.";
      }
    })
    .catch((error) => {
      console.error("Erro ao recuperar o texto:", error);
      return "Erro ao recuperar o texto.";
    });
}

function obterTextoTraduzidoDentroSubcolecao(campoId, idiomaSelecionado) {
  const ongDocRef = firestore.collection("ongs").doc(ongId);

  console.log("ongId:", ongId); // Verifique se o valor de ongId está correto

  return ongDocRef.collection("Informacoes").get()
    .then((querySnapshot) => {
      console.log("Documentos em Informacoes:", querySnapshot.docs); // Verifique se há documentos na subcoleção

      if (!querySnapshot.empty) {
        const documento = querySnapshot.docs[0];
        console.log("Dados do documento:", documento.data()); // Verifique os dados do documento retornado

        return idiomaSelecionado === "ingles" && documento.data()[`${campoId}_en`]
          ? documento.data()[`${campoId}_en`]
          : documento.data()[campoId];
      } else {
        return "Texto não encontrado para este idioma.";
      }
    })
    .catch((error) => {
      console.error("Erro ao recuperar o texto:", error);
      return "Erro ao recuperar o texto.";
    });
}


function exibirTextoTraduzidoParaCampo(campoId) {
  const idiomaSelecionado = languageSelect.value;
  const paragraphElement = document.getElementById(campoId);

  if (campoId === "ongAbout") {
    obterTextoTraduzidoDentroSubcolecao(campoId, idiomaSelecionado)
      .then((textoTraduzido) => {
        paragraphElement.textContent = textoTraduzido;
      });
  } else {
    obterTextoTraduzidoForaSubcolecao(campoId, idiomaSelecionado)
      .then((textoTraduzido) => {
        paragraphElement.textContent = textoTraduzido;
      });
  }
}


languageSelect.addEventListener('change', () => {

  exibirTextoTraduzidoParaCampo("Slide1");
  exibirTextoTraduzidoParaCampo("Slide2");
  exibirTextoTraduzidoParaCampo("Slide3");
  exibirTextoTraduzidoParaCampo("DescBotao");
  exibirTextoTraduzidoParaCampo("Ong_AGJ");
  exibirTextoTraduzidoParaCampo("Ong_CD");
  exibirTextoTraduzidoParaCampo("Ong_HB");
  exibirTextoTraduzidoParaCampo("Ong_MG");
  exibirTextoTraduzidoParaCampo("Ong_TH");
  exibirTextoTraduzidoParaCampo("Dica1");
  exibirTextoTraduzidoParaCampo("Dica2");
  exibirTextoTraduzidoParaCampo("Dica3");
  exibirTextoTraduzidoParaCampo("Dica4");
  exibirTextoTraduzidoParaCampo("Rodape");
  exibirTextoTraduzidoParaCampo("description");
  exibirTextoTraduzidoParaCampo("TermoOngOInicio");
  exibirTextoTraduzidoParaCampo("TextoUser")
    exibirTextoTraduzidoParaCampo("ongAbout")
});





function obterTextoTraduzidoParaElemento(elementId, idiomaSelecionado) {
  const textosTraduzidos = {
    'DescBtn_mobile': {
      'portugues': 'Está com dúvidas sobre qual ONG apoiar? Não se preocupe, nós podemos te ajudar! Basta preencher um breve checklist de opções de atividades que nos ajudará a compreender suas preferências e princípios.',
      'ingles': 'Do you have doubts about which NGO to support? Don\'t worry, we can help you! Just fill out a brief checklist of activity options that will help us understand your preferences and principles.'
    },

    'message': {
      'portugues': '',
      'ingles': ''
    },
    'titleDuvida': {
      'portugues': 'Ficou com alguma dúvida?',
      'ingles': 'Have any questions?'
    },
    'textoContato': {
      'portugues': 'Utilize os nossos meios de contato abaixo e permita-nos guiá-lo rumo a uma compreensão completa e satisfatória. Responderemos o mais breve possível!',
      'ingles': 'Use our contact methods below and allow us to guide you towards a complete and satisfactory understanding. We will respond as soon as possible!'
    },
    'canaisTitulo': {
      'portugues': 'Nossos canais',
      'ingles': 'Our channels'
    },
    'sobre':{
      'portugues': 'Sobre Nós',
      'ingles': 'About Us'
    }
  };


  const textoTraduzido = textosTraduzidos[elementId][idiomaSelecionado] || textosTraduzidos[elementId]['portugues']; // Use português como padrão se a tradução para o idioma selecionado não estiver disponível
  return textoTraduzido;
}

languageSelect.addEventListener('change', () => {
  const idiomaSelecionado = languageSelect.value;

  const elementosParaTraduzir =
  ['DescBtn_mobile', 'message', 'titleDuvida', 'textoContato', 'canaisTitulo', 'sobre'];
  elementosParaTraduzir.forEach(elementId => {
    const elemento = document.getElementById(elementId);
    const textoTraduzido = obterTextoTraduzidoParaElemento(elementId, idiomaSelecionado);
    elemento.textContent = textoTraduzido;
  });
});

const translationsPagOngs = {
    'pagOngTitle': {
      'portugues': 'Descubra o poder da solidariedade!<br> Conheça nossas ONGs parceiras voltadas para as áreas de',
      'ingles': 'Discover the power of solidarity!<br> Get to know our partner NGOs focused on the areas of'
    },
    'pagOngSub1': {
      'portugues': 'Saúde',
      'ingles': 'Health'
    },
    'pagOngSub2': {
      'portugues': 'Educação',
      'ingles': 'Education'
    },
    'pagOngSub3': {
      'portugues': 'Meio ambiente',
      'ingles': 'Environment'
    },
    'pagOngSub4': {
      'portugues': 'Assistência social',
      'ingles': 'Social Assistance'
    },
    'dicasTitle': {
      'portugues': 'Algumas dicas para você doar com segurança',
      'ingles': 'Some tips for you to donate safely'
    },

    /*Header */
  'brand': {
    'portugues': 'Força do bem',
    'ingles': 'Force of Good'
  },
  'inicio': {
    'portugues': 'Início',
    'ingles': 'Home'
  },
  'Usuarios': {
    'portugues': 'Usuários',
    'ingles': 'Users'
  },
  'ONG': {
    'portugues': 'ONG',
    'ingles': 'NGO'
  },
  'Voluntario': {
    'portugues': 'Voluntário',
    'ingles': 'Volunteer'
  },
  'accountLink': {
    'portugues': 'Conta',
    'ingles': 'Account'
  },
  'Cadastrar': {
    'portugues': 'Cadastrar',
    'ingles': 'Register'
  },
  'Login': {
    'portugues': 'Login',
    'ingles': 'Log in'
  },
  'Perfil': {
    'portugues': 'Perfil',
    'ingles': 'Profile'
  },

  /*Footer*/
  'inicioFooter': {
        'portugues': 'Inicio',
        'ingles': 'Home'
    },
    'ongs': {
        'portugues': 'ONGs',
        'ingles': 'NGOs'
    },
    'voluntarios': {
        'portugues': 'Voluntários',
        'ingles': 'Volunteers'
    },
    'contato': {
        'portugues': 'Contato',
        'ingles': 'Contact'
    },
    'sobreNos': {
        'portugues': 'Sobre nós',
        'ingles': 'About Us'
    },
    'desenvolvidoPor': {
        'portugues': 'Desenvolvido por Agility Tech © 2023',
        'ingles': 'Developed by Agility Tech © 2023'
    },
    'termosDeUso': {
        'portugues': 'Termo de Uso',
        'ingles': 'Terms of Use'
    },
    'politicaPriva': {
        'portugues': 'Política de Privacidade',
        'ingles': 'Privacy Policy'
    },
    'requisitosONG': {
        'portugues': 'Requisitos para as ONGs',
        'ingles': 'Requirements for NGOs'
    },

    /*Pagina inicial */


    'title1':{
      'portugues': 'O que é uma ONG?',
      'ingles': "What's an NGO?"
    },
    'title2':{
      'portugues': 'O que elas fazem?',
      'ingles': "What do they do?"
    },
    'title3':{
      'portugues': 'Formas de ajudar?',
      'ingles': "How to help?"
    },

    /*Perfil da ONG */
    'informacoesTitle': {
        'portugues': 'Informações',
        'ingles': 'Information'
    },
    'formasDeAjudarTitle': {
        'portugues': 'Formas que você pode ajudar',
        'ingles': 'Ways You Can Help'
    },
    'nameOng': {
        'portugues': 'Nome: ',
        'ingles': 'Name: '
    },
    'emailOng': {
        'portugues': 'Email: ',
        'ingles': 'Email: '
    },
    'phoneOng': {
        'portugues': 'Telefone: ',
        'ingles': 'Phone: '
    },
    'addOng': {
        'portugues': 'Endereço: ',
        'ingles': 'Address: '
    },
    'cityOng': {
        'portugues': 'Cidade: ',
        'ingles': 'City: '
    },
    'stateOng': {
        'portugues': 'Estados que atende: ',
        'ingles': 'States Served: '
    },

    /*Perfil Voluntario*/
    'titleVolu': {
        'portugues': 'Perfil de Voluntário',
        'ingles': 'Volunteer profile'
    },

  'title-user': {
    'portugues': 'Configurações da Conta',
    'ingles': 'Account Settings'
  },
  'newNameLabel': {
    'portugues': 'Atualizar nome',
    'ingles': 'Update name'
  },
  'saveNameButton': {
    'portugues': 'Salvar',
    'ingles': 'Save'
  },
  'danger': {
    'portugues': 'Desativar conta',
    'ingles': 'Deactivate Account'
  },
  'deactivateAccountButton': {
    'portugues': 'Desativar Minha Conta',
    'ingles': 'Deactivate My Account'
  },
  'toastError': {
    'portugues': 'Por favor, selecione pelo menos uma opção para descobrir o resultado!',
    'ingles': 'Please select at least one option to discover the result!'
  },
  'toastOk': {
    'portugues': 'Os dados foram adicionados com sucesso!',
    'ingles': 'Data added successfully!'
  },
  'alertaExcluir': {
    'portugues': 'Se você deseja desativar sua conta, tenha em mente que essa ação é irreversível e resultará na exclusão permanente de todas as suas informações e dados associados à sua conta. Certifique-se de ter feito backup de qualquer informação importante antes de prosseguir. <br> Para desativar sua conta, clique no botão abaixo. Você será solicitado a confirmar sua ação antes que a conta seja desativada.',
    'ingles': 'If you wish to deactivate your account, please be aware that this action is irreversible and will result in the permanent deletion of all your account-related information and data. Make sure to back up any important information before proceeding. <br> To deactivate your account, click the button below. You will be asked to confirm your action before the account is deactivated.'
  },
  'editName': {
    'portugues': 'Aqui, você pode editar suas informações pessoais, incluindo seu nome. Basta digitar o novo nome no campo abaixo e clicar em "Salvar" para atualizar suas informações.',
    'ingles': 'Here, you can edit your personal information, including your name. Just enter the new name in the field below and click "Save" to update your information.'
  },
  'titleUser': {
    'portugues': 'Formas em que posso Ajudar',
    'ingles': 'Ways I Can Help'
  },
  'ajudarCom': {
    'portugues': 'Posso ajudar com:',
    'ingles': 'I can help with:'
  },
  'add': {
    'portugues': 'Adicionar',
    'ingles': 'Add'
  },
  'titleMeet': {
    'portugues': 'ONG que mais combina comigo',
    'ingles': 'NGO that best suits me'
  },
  'testButton': {
    'portugues': "Fazer Teste",
    'ingles': "Take the test"
  },
  'nomeUser': {
    'portugues': 'Nome: <span id="userName"></span>',
    'ingles': 'Name: <span id="userName"></span>'
  },
  'emailUser': {
    'portugues': 'Email: <span id="userEmail"></span>',
    'ingles': 'Email: <span id="userEmail"></span>'
  },
  'logoutButton': {
    'portugues': 'Sair',
    'ingles': 'Logout'
  },
  'editProfileButton': {
    'portugues': 'Editar avatar',
    'ingles': 'Edit avatar'
  },
  'avatarEsc': {
    'portugues': 'Escolha seu avatar',
    'ingles': 'Choose your avatar'
  },
  'cancelButton': {
    'portugues': 'Fechar',
    'ingles': 'Close'
  },
  'profile-photo-option': {
    'portugues': 'Salvar',
    'ingles': 'Save'
  }
};

  function updateLanguage() {
    const selectedLanguage = document.getElementById('language-select').value;
    const elements = Object.keys(translationsPagOngs );

    elements.forEach(elementId => {
      const element = document.getElementById(elementId);
      if (element && translationsPagOngs[elementId][selectedLanguage]) {
        element.innerHTML = translationsPagOngs[elementId][selectedLanguage];
      }
    });
  }

  document.getElementById('language-select').addEventListener('change', updateLanguage);

  updateLanguage();



