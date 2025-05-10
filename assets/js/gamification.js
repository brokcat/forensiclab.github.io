class GamificationSystem {
    constructor() {
        this.badges = [
            { id: 1, name: 'Débutant', icon: '🔰', level: 1 },
            { id: 2, name: 'Enquêteur', icon: '🕵️‍♂️', level: 2 },
            { id: 3, name: 'Expert', icon: '⭐', level: 3 }
        ];
        this.levels = [
            { id: 1, name: 'Niveau 1', requiredScore: 0 },
            { id: 2, name: 'Niveau 2', requiredScore: 500 },
            { id: 3, name: 'Niveau 3', requiredScore: 1500 }
        ];
        this.courses = [
            {
                id: 1,
                title: 'PDF Forensics',
                description: 'Analyse forensique des documents PDF',
                lessons: [
                    { id: 1, title: 'Introduction', completed: false },
                    { id: 2, title: 'Analyse des métadonnées', completed: false }
                ],
                challenges: [
                    { id: 1, title: 'Extraction de métadonnées', points: 100 },
                    { id: 2, title: 'Détection d\'exploits', points: 200 }
                ]
            }
            // ... autres cours
        ];
    }

    getCourseById(id) {
        return this.courses.find(c => c.id === id);
    }

    calculateLevel(score) {
        return this.levels.find(l => score >= l.requiredScore);
    }

    unlockBadges(user) {
        const availableBadges = this.badges.filter(b => user.score >= b.level * 1000);
        return availableBadges;
    }

    updateScore(user, points) {
        user.score += points;
        user.level = this.calculateLevel(user.score).id;
        user.badges = this.unlockBadges(user).map(b => ({
            id: b.id,
            name: b.name,
            icon: b.icon
        }));
        return user;
    }

    markLessonAsCompleted(courseId, lessonId) {
        const course = this.getCourseById(courseId);
        if (course) {
            const lesson = course.lessons.find(l => l.id === lessonId);
            if (lesson) {
                lesson.completed = true;
                return true;
            }
        }
        return false;
    }

    completeChallenge(courseId, challengeId) {
        const course = this.getCourseById(courseId);
        if (course) {
            const challenge = course.challenges.find(c => c.id === challengeId);
            if (challenge) {
                return challenge.points;
            }
        }
        return 0;
    }
}

// Initialisation du système de gamification
const gamification = new GamificationSystem();
