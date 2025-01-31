function loadHeader() {
    return fetch('header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o cabeçalho');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header').innerHTML = data;
        setActiveLink(); 
        addLogoutListener(); 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function setActiveLink() {
    var currentPage = window.location.pathname.split("/").pop();
    var links = document.querySelectorAll(".nav-links a");
    links.forEach(function(link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

function addLogoutListener() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            localStorage.removeItem('token'); 
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }
}

function init() {
    loadHeader();
}

document.addEventListener("DOMContentLoaded", init);

function openHelpEmail() {
    const email = "adm@drakobuild.com"; 
    const subject = encodeURIComponent("Solicitação de ajuda - DrakoBuild");
    const body = encodeURIComponent("Olá, preciso de ajuda com...");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
