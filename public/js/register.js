document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  fetch('http://localhost:5000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Usuário registrado com sucesso!") {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'admin.html'; 
    } else {
      alert('Erro no cadastro: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao tentar realizar o cadastro!');
  });
});

function goBackToStart() {
  window.location.href = 'admin.html'; 
}
