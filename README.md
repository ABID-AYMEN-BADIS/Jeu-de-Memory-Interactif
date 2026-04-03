# 🎮 Jeu de Memory Interactif

Jeu de memory avec sauvegarde des scores, développé avec React, Node.js, Express et MongoDB.




## ⚙️ Prérequis

* Docker
* Docker Compose


## 📥 Installation

git clone git@github.com:ABID-AYMEN-BADIS/Jeu-de-Memory-Interactif.git
cd memory-game


## 🚀 Lancement

docker-compose up --build

### 🔗 Accès

* Frontend : [http://localhost:3002]
* Backend API : [http://localhost:5000]


## 🎯 Fonctionnalités

* Plateau 4x4 avec 8 paires d’emojis
* Compteur de coups
* Sauvegarde des scores avec pseudo
* Tableau des 5 meilleurs scores
* Nouvelle partie avec mélange des cartes
* Animations de retournement de cartes
* Interface responsive


## 🛠️ Technologies utilisées

* Frontend : React 18
* Backend : Node.js + Express
* Base de données: MongoDB
* Conteneurisation: Docker

---

## 🔌 API

### 📥 Récupérer les scores

GET /api/scores

### 📤 Ajouter un score

POST /api/scores


## 🛑 Arrêt de l'application


docker-compose down

### 🧹 Supprimer les volumes (données)

docker-compose down -v



