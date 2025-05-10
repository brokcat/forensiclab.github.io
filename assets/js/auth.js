class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUserId = localStorage.getItem('currentUserId');
    }

    register(username, email, password, country) {
        const user = {
            id: Date.now(),
            username,
            email,
            password: this.hashPassword(password),
            country,
            score: 0,
            level: 1,
            badges: [],
            progress: {}
        };
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        return user;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && this.verifyPassword(password, u.password));
        if (user) {
            localStorage.setItem('currentUserId', user.id);
            return user;
        }
        return null;
    }

    hashPassword(password) {
        return password.split('').reduce((hash, char) => hash * 31 + char.charCodeAt(0), 0);
    }

    verifyPassword(password, hashed) {
        return this.hashPassword(password) === hashed;
    }

    getCurrentUser() {
        const userId = localStorage.getItem('currentUserId');
        return this.users.find(u => u.id === userId);
    }

    logout() {
        localStorage.removeItem('currentUserId');
        window.location.href = 'auth/login.html';
    }
}

// Initialisation de l'authentification
const auth = new AuthSystem();

// Gestion du formulaire de connexion
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = auth.login(email, password);
            if (user) {
                window.location.href = 'dashboard/index.html';
            } else {
                alert('Email ou mot de passe incorrect.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const country = document.getElementById('country').value;

            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas.');
                return;
            }

            const user = auth.register(username, email, password, country);
            if (user) {
                window.location.href = 'dashboard/index.html';
            } else {
                alert('Une erreur est survenue lors de l\'inscription.');
            }
        });
    }
});
