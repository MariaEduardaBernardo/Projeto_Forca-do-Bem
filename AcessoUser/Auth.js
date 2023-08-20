// Verifique se o usuário está autenticado
firebase.auth().onAuthStateChanged((user) => {
    const accountDropdown = document.getElementById("accountDropdown");
    const accountLink = document.getElementById("accountLink");
    const registerOption = document.getElementById("registerOption");
    const loginOption = document.getElementById("loginOption");
    const profileOption = document.getElementById("profileOption");
    const logoutButton = document.getElementById("logoutButton");

    if (user) {
        // Usuário autenticado
        accountLink.textContent = "Minha conta";
        registerOption.style.display = "none";
        loginOption.style.display = "none";
        profileOption.style.display = "block";
        logoutButton.style.display = "block";

        
    } else {
        // Usuário não autenticado
        accountLink.textContent = "Entrar na conta";
        registerOption.style.display = "block";
        loginOption.style.display = "block";
        profileOption.style.display = "none";
        logoutButton.style.display = "none";
    }
});
