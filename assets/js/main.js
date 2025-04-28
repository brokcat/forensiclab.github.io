// Main JavaScript file for the Forensic Platform

const { createApp } = Vue;

// Main Vue application
const app = createApp({
    data() {
        return {
            darkMode: true,
            user: {
                loggedIn: false,
                name: '',
                progress: 0,
                completedCourses: [],
                completedChallenges: []
            },
            courses: [
                { id: 'memory-forensics', name: 'Memory Forensics', icon: 'fas fa-memory', progress: 0, total: 5, completed: 0 },
                { id: 'disk-analysis', name: 'Disk Analysis', icon: 'fas fa-hdd', progress: 0, total: 5, completed: 0 },
                { id: 'network-analysis', name: 'Network Traffic Analysis', icon: 'fas fa-network-wired', progress: 0, total: 5, completed: 0 },
                { id: 'vba-analysis', name: 'VBA Macro Analysis', icon: 'fas fa-file-word', progress: 0, total: 4, completed: 0 },
                { id: 'deobfuscation', name: 'Code Deobfuscation', icon: 'fas fa-code', progress: 0, total: 4, completed: 0 },
                { id: 'threat-hunting', name: 'Threat Hunting', icon: 'fas fa-search', progress: 0, total: 5, completed: 0 }
            ],
            activeCourse: null,
            markdownContent: '',
            renderedHTML: '',
            activeTab: 'edit',
            notifications: []
        };
    },
    mounted() {
        // Check for saved user data
        const savedUser = localStorage.getItem('forensicUser');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
        }
        
        // Check for dark/light mode preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.darkMode = savedTheme === 'dark';
            this.applyTheme();
        }
        
        // Load course progress
        this.loadProgress();
    },
    methods: {
        toggleTheme() {
            this.darkMode = !this.darkMode;
            this.applyTheme();
            localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        },
        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
        },
        loadProgress() {
            // In a real app, this would fetch from a backend
            // For now, we'll simulate with localStorage
            const savedProgress = localStorage.getItem('courseProgress');
            if (savedProgress) {
                const progress = JSON.parse(savedProgress);
                this.courses.forEach(course => {
                    if (progress[course.id]) {
                        course.completed = progress[course.id].completed;
                        course.progress = (course.completed / course.total) * 100;
                    }
                });
            }
        },
        saveProgress() {
            const progress = {};
            this.courses.forEach(course => {
                progress[course.id] = {
                    completed: course.completed,
                    total: course.total
                };
            });
            localStorage.setItem('courseProgress', JSON.stringify(progress));
            
            // Update user overall progress
            const totalCompleted = this.courses.reduce((sum, course) => sum + course.completed, 0);
            const totalModules = this.courses.reduce((sum, course) => sum + course.total, 0);
            this.user.progress = Math.round((totalCompleted / totalModules) * 100);
            localStorage.setItem('forensicUser', JSON.stringify(this.user));
        },
        markCourseComplete(courseId, moduleId) {
            const course = this.courses.find(c => c.id === courseId);
            if (course && course.completed < course.total) {
                course.completed++;
                course.progress = (course.completed / course.total) * 100;
                this.saveProgress();
                this.addNotification(`Module ${moduleId} completed in ${course.name}!`);
            }
        },
        addNotification(message) {
            this.notifications.push({
                id: Date.now(),
                message,
                read: false
            });
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.read);
            }, 5000);
        },
        renderMarkdown(content) {
            if (typeof marked !== 'undefined') {
                return marked.parse(content);
            }
            return content;
        },
        submitAnswer(questionId, answer) {
            // In a real app, this would send to a backend for validation
            console.log(`Answer submitted for question ${questionId}:`, answer);
            // Simulate successful submission
            this.addNotification('Answer submitted successfully!');
            return true;
        },
        startLab(labId) {
            // In a real app, this would initialize a lab environment
            console.log(`Starting lab ${labId}`);
            this.addNotification(`Lab ${labId} environment is being prepared...`);
            // Simulate lab startup
            setTimeout(() => {
                this.addNotification(`Lab ${labId} is ready!`);
                window.location.href = `/labs/${labId}.html`;
            }, 2000);
        }
    }
});

// Register any global components here
app.component('markdown-editor', {
    props: ['value'],
    template: `
        <div class="markdown-editor">
            <div class="tab-container">
                <div class="tab" :class="{ active: activeTab === 'edit' }" @click="activeTab = 'edit'">
                    <i class="fas fa-edit"></i> Edit
                </div>
                <div class="tab" :class="{ active: activeTab === 'preview' }" @click="activeTab = 'preview'">
                    <i class="fas fa-eye"></i> Preview
                </div>
            </div>
            
            <div v-if="activeTab === 'edit'">
                <textarea v-model="content" @input="updateContent" placeholder="Enter your markdown content here..."></textarea>
            </div>
            
            <div v-if="activeTab === 'preview'" class="markdown-preview" v-html="renderedHTML"></div>
        </div>
    `,
    data() {
        return {
            content: this.value,
            activeTab: 'edit',
            renderedHTML: ''
        };
    },
    mounted() {
        this.updatePreview();
    },
    methods: {
        updateContent(e) {
            this.content = e.target.value;
            this.$emit('update:value', this.content);
            this.updatePreview();
        },
        updatePreview() {
            if (typeof marked !== 'undefined') {
                this.renderedHTML = marked.parse(this.content);
            } else {
                this.renderedHTML = this.content;
            }
        }
    }
});

// Mount the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.mount('#app');
});
