class Leaderboard {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    getGlobalLeaderboard(limit = 10) {
        return this.users
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    getCountryLeaderboard(country, limit = 10) {
        return this.users
            .filter(u => u.country === country)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    getUserRank(user) {
        const sortedUsers = [...this.users].sort((a, b) => b.score - a.score);
        return sortedUsers.findIndex(u => u.id === user.id) + 1;
    }

    getCountryRank(user) {
        const countryUsers = this.users.filter(u => u.country === user.country);
        const sortedCountryUsers = [...countryUsers].sort((a, b) => b.score - a.score);
        return sortedCountryUsers.findIndex(u => u.id === user.id) + 1;
    }
}
