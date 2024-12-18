const loginForm = document.getElementById('loginForm');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const registerBtn = document.getElementById('registerBtn');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = loginForm.email.value;
    const senha = loginForm.senha.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.senha === senha);
    
    if (user) {
        window.location.href = 'docs.html';
    } else {
        alert('Usuário não encontrado ou senha incorreta! Por favor, registre-se.');
    }
});

forgotPasswordBtn.addEventListener('click', function() {
    const email = prompt("Digite seu email para recuperação:");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);
    
    if (user) {
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        alert(`Código de verificação (simulado): ${verificationCode}`);
        
        const userCode = prompt("Digite o código de verificação:");
        
        if (userCode === verificationCode) {
            const newPassword = prompt("Digite sua nova senha:");
            user.senha = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Senha atualizada com sucesso! Você pode fazer login agora.');
        } else {
            alert('Código de verificação incorreto.');
        }
    } else {
        alert('Usuário não encontrado!');
    }
});

registerBtn.addEventListener('click', function() {
    const nome = prompt("Digite seu nome:");
    const email = prompt("Digite seu email:");
    const senha = prompt("Digite sua senha:");
    const confirmaSenha = prompt("Confirme sua senha:");
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        alert('Usuário já registrado! Faça login.');
        return;
    }
    
    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    users.push({ nome, email, senha });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registro bem-sucedido! Você pode fazer login agora.');
});