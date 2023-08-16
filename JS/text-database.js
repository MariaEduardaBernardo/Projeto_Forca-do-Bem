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
