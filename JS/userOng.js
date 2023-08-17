const form = document.getElementById('ong-form');
const db = firebase.firestore();
async function uploadImage(file) {
  if (!file) return "";

  const storageRef = storage.ref();
  const imageRef = storageRef.child('images/' + file.name);
  await imageRef.put(file);
  const imageUrl = await imageRef.getDownloadURL();
  const foto1Url = await uploadImage(form.foto1.files[0]);
  const foto2Url = await uploadImage(form.foto2.files[0]);
  const foto3Url = await uploadImage(form.foto3.files[0]);
  const ongImageUrl = await uploadImage(form.imageUrl.files[0]);
  const userImageUrl = await uploadImage(form.userImageUrl.files[0]);


  return imageUrl;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();


  const ongData = {
    name: form.name.value,
    description: form.description.value,
    imageUrl: "",
    userImageUrl: ""
  };

  // Salvar dados na coleção 'ongs'
  db.collection('ongs').add(ongData)
  .then(function(docRef) {
    const ongId = docRef.id;

    const InformacoesData = {
      ongName: form.ongName.value,
      ongEmail: form.ongEmail.value,
      ongPhone: form.ongPhone.value,
      ongAddress: form.ongAddress.value,
      ongCity: form.ongCity.value,
      ongState: form.ongState.value,
      ongHelp: form.ongHelp.value,
      foto1: form.foto1.value,
      foto2: form.foto2.value,
      foto3: form.foto3.value
    };

    // Criar uma nova subcoleção 'informacoes' dentro do documento da ong
    db.collection('ongs').doc(ongId).collection('Informacoes').add(InformacoesData)
    .then(function() {
      console.log('Documento salvo com ID:', ongId);
      form.reset();
    })
    .catch(function(error) {
      console.error('Erro ao criar subcoleção informacoes:', error);
    });
  })
  .catch(function(error) {
    console.error('Erro ao salvar documento:', error);
  });
});
