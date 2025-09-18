# FPL Hub - Fantasy Premier League Dashboard

FPL Hub is a comprehensive web application designed for Fantasy Premier League (FPL) enthusiasts. It provides a rich, interactive interface to view player stats, club rosters, season fixtures, and data-driven player suggestions. This application is built with a Java Spring Boot backend and a modern React frontend.


---

## Features

* **Club Overviews:** Browse all Premier League clubs with key statistics like wins, losses, draws, and points.
* **Detailed Club Rosters:** View the complete player roster for each club, organized by position (Goalkeeper, Defender, Midfielder, Forward).
* **Full Season Fixtures:** See a list of all matches for the season, including kickoff times and final scores for completed games.
* **Player Comparison Engine:** Select any two players to see a head-to-head comparison of their key stats, visualized with a dynamic radar chart.
* **Player Suggestion Engine:** Get personalized player recommendations based on your desired position and budget.
* **Live Data Integration:** Player and club data are seeded and synchronized from the official Fantasy Premier League API and the Football-Data.org API.

---

## Technical Stack

### Backend

* **Java 17**
* **Spring Boot 3:** For building the robust REST API.
* **Spring Data JPA:** For database interactions.
* **H2 Database (or your preferred DB):** For storing player and club information.
* **Maven:** For dependency management.

### Frontend

* **React:** For building the user interface.
* **React Router:** For handling client-side navigation between pages.
* **Recharts:** For creating interactive charts (like the player comparison radar).
* **CSS:** For custom styling and layout.

---

## Core Components

### Backend Structure

* **Controllers (`/PlayerControl`):** Handle incoming HTTP requests for clubs, players, fixtures, and comparisons.
* **Services (`/Service`):** Contain the core business logic, such as fetching data from external APIs, synchronizing the database, and processing player comparisons/suggestions.
* **Repositories (`/PlayerRepo`):** Define the database query methods using Spring Data JPA.
* **Models (`/model`):** Define the `Player` and `Club` database entities.
* **DTOs (`/dto`):** Data Transfer Objects used to map incoming data from external APIs.
* **Data Seeder (`/Seeder`):** An initial process to populate the database with data from the FPL API when the application starts.

### Frontend Structure

* **Pages (`/pages`):** Top-level React components for each main view of the application (HomePage, ClubsPage, ComparisonPage, etc.).
* **Components (`/components`):** Reusable UI elements like `ClubCard`, `PlayerCard`, and `PlayerDetailModal`.
* **Assets (`/assets`):** Static assets like images and SVGs used in the application.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Java JDK 17 or later
* Maven
* Node.js and npm
* An API key from [football-data.org](https://www.football-data.org/) (for club stats)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Your-Username/your-repository-name.git](https://github.com/Your-Username/your-repository-name.git)
    ```

2.  **Configure Backend:**
    * Navigate to the root of the Java project.
    * In `src/main/resources/application.properties`, add your football-data.org API key:
        ```properties
        football.data.api.key=YOUR_API_KEY_HERE
        ```
    * Run the Spring Boot application. It will automatically seed the database on the first run.

3.  **Configure Frontend:**
    * Navigate to the frontend directory (e.g., `/frontend`).
    * Install the necessary NPM packages:
        ```sh
        npm install
        ```
    * Start the React development server:
        ```sh
        npm run dev
        ```

The application should now be running, with the frontend available at `http://localhost:5173` and the backend at `http://localhost:8080`.

---
