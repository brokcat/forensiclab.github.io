class SettingsSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    updateAccountSettings(userId, settings) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.settings = settings;
            localStorage.setItem('users', JSON.stringify(this.users));
            return user;
        }
        return null;
    }

    updateInterfaceSettings(userId, settings) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            if (!user.settings) {
                user.settings = {};
            }
            Object.assign(user.settings, settings);
            localStorage.setItem('users', JSON.stringify(this.users));
            return user;
        }
        return null;
    }

    getSettings(userId) {
        const user = this.users.find(u => u.id === userId);
        return user?.settings || {};
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    applyFontSize(size) {
        const body = document.body;
        switch (size) {
            case 'small':
                body.style.fontSize = '0.9rem';
                break;
            case 'large':
                body.style.fontSize = '1.1rem';
                break;
            default:
                body.style.fontSize = '';
        }
    }

    applyLanguage(language) {
        document.documentElement.setAttribute('lang', language);
    }
}
