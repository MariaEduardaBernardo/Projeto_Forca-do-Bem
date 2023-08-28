const textDocRef = firestore.collection("Textos").doc("PagInicial");

// SLIDE Página Inicial
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Slide1;

    const paragraphElement = document.getElementById("Slide1");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Slide2;

    const paragraphElement = document.getElementById("Slide2");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Slide3;

    const paragraphElement = document.getElementById("Slide3");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

// Descricao sobre o checklist
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().DescBotao;

    const paragraphElement = document.getElementById("textoDescricao");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

// Rodape
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Rodape;

    const paragraphElement = document.getElementById("textoRodape");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});


// ONGs da pagina inicial
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Ong_AGJ;

    const paragraphElement = document.getElementById("Ong_AGJ");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});


textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Ong_CD;

    const paragraphElement = document.getElementById("Ong_CD");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Ong_HB;

    const paragraphElement = document.getElementById("Ong_HB");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Ong_AGJ;

    const paragraphElement = document.getElementById("Ong_MG");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Ong_TH;

    const paragraphElement = document.getElementById("Ong_TH");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

// Termos de uso
const textTermos = firestore.collection("Termos_de_uso").doc("sgeZAxKi8MslruFCmso4");

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto;

    const paragraphElement = document.getElementById("termo1");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto2;

    const paragraphElement = document.getElementById("termo2");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto3;

    const paragraphElement = document.getElementById("termo3");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto4;

    const paragraphElement = document.getElementById("termo4");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto5;

    const paragraphElement = document.getElementById("termo5");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto6;

    const paragraphElement = document.getElementById("termo6");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textTermos.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Texto7;

    const paragraphElement = document.getElementById("termo7");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});


/*Página de usuário*/
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().TextoUser;

    const paragraphElement = document.getElementById("TextoUser");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

/*Dicas para doar */
textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Dica1;

    const paragraphElement = document.getElementById("Dica1");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Dica2;

    const paragraphElement = document.getElementById("Dica2");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Dica3;

    const paragraphElement = document.getElementById("Dica3");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

textDocRef.get().then((doc) => {
  if (doc.exists) {
    const text = doc.data().Dica4;

    const paragraphElement = document.getElementById("Dica4");
    paragraphElement.textContent = text;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto:", error);
});

/*Termos para ONGS*/
const textDocRef2 = firestore.collection("Termos_de_uso").doc("DH9ko1cpzH2rskGBIuzF");

const listElement1 = document.getElementById("TermoOng1");
const listElement2 = document.getElementById("TermoOng2");
const listElement3 = document.getElementById("TermoOng3");
const listElement4 = document.getElementById("TermoOng4");
const listElement5 = document.getElementById("TermoOng5");
const listElement6 = document.getElementById("TermoOng6");
const listElement7 = document.getElementById("TermoOng7");

textDocRef2.get().then((doc) => {
  if (doc.exists) {
    const termoOng1 = doc.data().TermoOng1;
    const termoOng2 = doc.data().TermoOng2;
    const termoOng3 = doc.data().TermoOng3;
    const termoOng4 = doc.data().TermoOng4;
    const termoOng5 = doc.data().TermoOng5;
    const termoOng6 = doc.data().TermoOng6;
    const termoOng7 = doc.data().TermoOng7;

    function createListElement(list, containerElement) {
      if (Array.isArray(list)) {
        const ulElement = document.createElement("ul");

        list.forEach((term) => {
          const liElement = document.createElement("li");
          liElement.textContent = term;
          ulElement.appendChild(liElement);
        });

        containerElement.appendChild(ulElement);
      }
    }

    createListElement(termoOng1, listElement1);
    createListElement(termoOng2, listElement2);
    createListElement(termoOng3, listElement3);
    createListElement(termoOng4, listElement4);
    createListElement(termoOng5, listElement5);
    createListElement(termoOng6, listElement6);
    createListElement(termoOng7, listElement7);
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar os textos:", error);
});


const textDocRefInicio = firestore.collection("Termos_de_uso").doc("DH9ko1cpzH2rskGBIuzF");

textDocRefInicio.get().then((doc) => {
  if (doc.exists) {
    const TermoOngOInicio = doc.data().TermoOngOInicio;

    const paragraphElementInicio = document.getElementById("TermoOngOInicio");
    paragraphElementInicio.textContent = TermoOngOInicio;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto de início:", error);
});

const textDocRefFim = firestore.collection("Termos_de_uso").doc("DH9ko1cpzH2rskGBIuzF");

textDocRefFim.get().then((doc) => {
  if (doc.exists) {
    const termoOngFim = doc.data().TermoOngFim;

    const paragraphElementFim = document.getElementById("TermoOngFim");
    paragraphElementFim.textContent = termoOngFim;
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar o texto de fim:", error);
});

/*Página do segundo cadastro ONG */
const textDocRef3 = firestore.collection("Textos").doc("PagCadastroOng");

const introducao = document.getElementById("Intro");

textDocRef3.get().then((doc) => {
  if (doc.exists) {
    const Intro = doc.data().Intro;

    function createListElement(list, containerElement) {
      if (Array.isArray(list)) {
        const ulElement = document.createElement("p");

        list.forEach((term) => {
          const liElement = document.createElement("p");
          liElement.textContent = term;
          ulElement.appendChild(liElement);
        });

        containerElement.appendChild(ulElement);
      }
    }

    createListElement(Intro, introducao);
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar os textos:", error);
});


/*Politica de privacidade*/
const textDocRef4 = firestore.collection("Termos_de_uso").doc("Politica");

const listElement8 = document.getElementById("conteudo1");
const listElement9 = document.getElementById("conteudo2");
const listElement10 = document.getElementById("conteudo3");
const listElement11 = document.getElementById("conteudo4");
const listElement12 = document.getElementById("conteudo5");
const listElement13 = document.getElementById("conteudo6");
const listElement14 = document.getElementById("title");

textDocRef4.get().then((doc) => {
  if (doc.exists) {
    const conteudo1 = doc.data().conteudo1;
    const conteudo2 = doc.data().conteudo2;
    const conteudo3 = doc.data().conteudo3;
    const conteudo4 = doc.data().conteudo4;
    const conteudo5 = doc.data().conteudo5;
    const conteudo6 = doc.data().conteudo6;
    const title = doc.data().title;

    function createListElement(list, containerElement) {
      if (Array.isArray(list)) {
        const ulElement = document.createElement("ul");

        list.forEach((term) => {
          const liElement = document.createElement("p");
          liElement.textContent = term;
          ulElement.appendChild(liElement);
        });

        containerElement.appendChild(ulElement);
      }
    }

    createListElement(conteudo1, listElement8);
    createListElement(conteudo2, listElement9);
    createListElement(conteudo3, listElement10);
    createListElement(conteudo4, listElement11);
    createListElement(conteudo5, listElement12);
    createListElement(conteudo6, listElement13);
    createListElement(title, listElement14);
  } else {
    console.log("Documento não encontrado");
  }
}).catch((error) => {
  console.error("Erro ao recuperar os textos:", error);
});
