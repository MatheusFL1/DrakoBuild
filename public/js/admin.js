if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = "login.html";
}

function goBackToStart() {
  if (!document.getElementById('nextButton').disabled) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    window.location.href = "index.html"; 
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  addLogoutListener();
  clearAuthOnUnload();
});

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
