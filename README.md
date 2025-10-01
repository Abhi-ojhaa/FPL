# ⚽ FPL Analytics & Comparison API  

A **robust backend API** built with **Spring Boot** that provides comprehensive data for **Fantasy Premier League (FPL)**.  
It fetches and processes live data from the official FPL API and other football data sources, persists it in a **PostgreSQL database**, and exposes it through a clean, well-structured **RESTful API**.

The primary goal of this project is to serve as the **data backbone** for a rich FPL analytics frontend, offering:  
- 🆚 **Player comparisons**  
- 💰 **Budget-based suggestions**  
- 🏟️ **Club & fixture information**

---

## 📋 Table of Contents  
- [🌟 About The Project](#-about-the-project)  
- [✨ Key Features](#-key-features)  
- [📡 API Endpoints](#-api-endpoints)  
- [🛠️ Built With](#️-built-with)  
- [🏗️ Project Structure](#-project-structure)  
- [🚀 Getting Started](#-getting-started)  
  - [⚙️ Prerequisites](#️-prerequisites)  
  - [💻 Installation](#-installation)  
- [📬 Contact](#-contact)  

---

## 🌟 About The Project  

This project was born out of a passion for **Fantasy Premier League** and the desire to create a powerful, data-centric tool for FPL managers.  

The application is designed with a **multi-layered architecture** that separates:  
- Data fetching  
- Persistence  
- Business logic  

### Core Functionality  
- **Data Seeding** → Seeds the database with player and team data from the live FPL API.  
- **Data Synchronization** → Syncs league standings from *football-data.org* to enrich team data.  
- **RESTful API** → Exposes structured endpoints to serve data to any frontend application.  

This project demonstrates backend principles like **API design**, **database management (JPA/Hibernate)**, and **integration with external APIs**.  

---

## ✨ Key Features  
✔️ **Player Comparison** → Compare two FPL players head-to-head.  
✔️ **Budget Suggestions** → Get ranked lists of top players within a budget.  
✔️ **Club & Roster Data** → Detailed info for clubs + player rosters grouped by position.  
✔️ **Enriched Fixture Lists** → Fixtures with full team names (not just IDs).  
✔️ **Live Data Integration** → Pulls from both FPL API & football-data.org API.  
✔️ **Persistent Storage** → PostgreSQL-backed storage for efficiency.  

---

## 📡 API Endpoints  

### 🧑‍🤝‍🧑 Players  
- `GET /api/v1/player` → List all players.  
- `GET /api/v1/player/name/{playerName}` → Fetch player by name.  
- `GET /api/v1/player/compare?playerA={name}&playerB={name}` → Compare two players.  
- `GET /api/v1/player/suggestions?position={pos}&budget={amount}` → Get suggestions.  

### 🏟️ Clubs  
- `GET /api/v1/clubs` → List all clubs with league stats.  
- `GET /api/v1/clubs/info/{clubId}` → Fetch club stats.  
- `GET /api/v1/clubs/{clubId}` → Club roster grouped by position.  

### 📅 Fixtures  
- `GET /api/v1/fixtures` → Complete, enriched fixture list.  

---

## 🛠️ Built With  
- **Framework**: Spring Boot  
- **Language**: Java 21  
- **Database**: PostgreSQL  
- **ORM**: Spring Data JPA / Hibernate  
- **Build Tool**: Maven  

---

## 🏗️ Project Structure  

src/
├── model/ # JPA entities (Player, Club)
├── repository/ # Spring Data JPA repositories
├── service/ # Business logic layer
├── controller/ # REST controllers (PlayerController, ClubController, etc.)
├── dto/ # Data Transfer Objects
└── seeder/ # CommandLineRunner to seed database

---

## 🚀 Getting Started  

### ⚙️ Prerequisites  
- Java JDK **21+**  
- Maven  
- PostgreSQL instance  

### 💻 Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Abhi-ojhaa/fpl-analytics-api.git
   cd fpl-analytics-api
2.Configure Database
Edit src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fpl_data
spring.datasource.username=your_username
spring.datasource.password=your_password
football.data.api.key=your_api_key

3.Run the Application
mvn spring-boot:run
App starts on: http://localhost:8080

🎉

📬 Contact

👤 Abhinav Ojha
🔗 Portfolio: https://github.com/Abhi-ojhaa
📧 Email: ojhaabhinav18@gmail.com

🔗 Project Link: https://github.com/Abhi-ojhaa/fpl-analytics-api


