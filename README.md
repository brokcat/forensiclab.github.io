# Plateforme de Formation en Forensique Numérique

Une plateforme complète de formation en forensique numérique inspirée par CyberDefenders, avec des cours, des labs et des challenges dans différents domaines de l'analyse forensique.

## Fonctionnalités

- Cours structurés en modules progressifs
- Support pour le contenu en Markdown
- Labs pratiques interactifs
- Challenges de type CTF
- Suivi de progression
- Mode sombre/clair
- Compatible avec GitHub Pages

## Domaines couverts

- Analyse de mémoire (Memory Forensics)
- Analyse de disque
- Analyse de trafic réseau
- Analyse de macros VBA
- Déobfuscation de code
- Threat Hunting

## Déploiement sur GitHub Pages

1. Créez un nouveau dépôt GitHub
2. Clonez ce dépôt sur votre machine locale
3. Copiez tous les fichiers de ce projet dans votre dépôt local
4. Poussez les modifications vers GitHub
5. Activez GitHub Pages dans les paramètres du dépôt (Settings > Pages)
6. Sélectionnez la branche `main` comme source
7. Votre site sera disponible à l'adresse `https://[votre-nom-utilisateur].github.io/[nom-du-repo]/`

## Structure du projet

```
forensic-platform/
├── index.html                  # Page d'accueil
├── assets/                     # Ressources statiques
│   ├── css/                    # Feuilles de style
│   ├── js/                     # Scripts JavaScript
│   └── images/                 # Images
├── courses/                    # Contenu des cours
│   ├── memory-forensics/       # Cours sur l'analyse de mémoire
│   ├── disk-analysis/          # Cours sur l'analyse de disque
│   ├── network-analysis/       # Cours sur l'analyse de trafic réseau
│   ├── vba-analysis/           # Cours sur l'analyse de macros VBA
│   ├── deobfuscation/          # Cours sur la déobfuscation
│   └── threat-hunting/         # Cours sur le threat hunting
├── labs/                       # Environnements de laboratoire
└── challenges/                 # Défis et CTF
```

## Développement local

Pour exécuter la plateforme localement :

```bash
# Utiliser un serveur HTTP simple avec Python
python -m http.server 8000

# Ou avec Node.js
npx serve
```

Puis ouvrez votre navigateur à l'adresse `http://localhost:8000`

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour améliorer la plateforme.

## Licence

MIT
