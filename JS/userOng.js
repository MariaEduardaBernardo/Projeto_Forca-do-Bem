const form = document.getElementById('ong-form');
const FormOng = firebase.firestore();

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const ongData = {
        name: form.name.value,
        description: form.description.value,
        imageUrl: form.imageUrl.value,
        userImageUrl: form.userImageUrl.value,
        status: "pendente"
    };

    // Salvar dados na coleção 'ongs' no Firestore
    FormOng.collection('ongs').add(ongData)
    .then(function(docRef) {
        const ongId = docRef.id;

        const informacoesData = {
            ongName: form.ongName.value,
            ongEmail: form.ongEmail.value,
            ongPhone: form.ongPhone.value,
            ongAddress: form.ongAddress.value,
            ongCity: form.ongCity.value,
            ongStates: form.ongStates.value,
            ongHelp: form.ongHelp.value,
            ongAbout: form.ongAbout.value
        };

        // Salvar dados na subcoleção 'Informacoes' dentro do documento da ong
        FormOng.collection('ongs').doc(ongId).collection('Informacoes').add(informacoesData)
        .then(function() {
            console.log('Dados do primeiro e segundo passo salvos com sucesso.');
            form.reset();
        })
        .catch(function(error) {
            console.error('Erro ao salvar dados do segundo passo:', error);
        });
    })
    .catch(function(error) {
        console.error('Erro ao salvar dados do primeiro passo:', error);
    });
});

