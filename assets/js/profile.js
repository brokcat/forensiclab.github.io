class ProfileSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.leaderboard = new Leaderboard();
    }

    updateUserProgress(userId, courseProgress) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.progress = courseProgress;
            localStorage.setItem('users', JSON.stringify(this.users));
            return user;
        }
        return null;
    }

    getUserRank(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            return {
                global: this.leaderboard.getUserRank(user),
                country: this.leaderboard.getCountryRank(user)
            };
        }
        return null;
    }

    updateUserSettings(userId, settings) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.settings = settings;
            localStorage.setItem('users', JSON.stringify(this.users));
            return user;
        }
        return null;
    }

    getUserSettings(userId) {
        const user = this.users.find(u => u.id === userId);
        return user?.settings || {};
    }
}
