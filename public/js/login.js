document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const email = document.getElementById('username').value; 
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login bem-sucedido!');
            window.location.href = "admin.html"; 
        } else {
            alert('Erro no login: ' + data.error); 
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar fazer login.');
    }
});
