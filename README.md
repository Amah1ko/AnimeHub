# AnimeHub

AnimeHub is a premium anime discovery application built with React, Vite, and Framer Motion.

## Features
- **Browse Anime**: View top rated and seasonal anime.
- **Search**: Find anime by title.
- **Watchlist**: Track what you plan to watch, are watching, or have completed.
- **Reviews**: Read and write reviews for anime.
- **Responsive Design**: Beautiful interface that works on all devices.

## Setup Instructions

### 1. Prerequisites
- Node.js installed.
- A MockAPI.io account.

### 2. MockAPI Setup
To use the Watchlist and Reviews features, you need a backend. We use MockAPI for this.
1.  Go to [MockAPI.io](https://mockapi.io/).
2.  Create a new project.
3.  **Create Resources**:
    *   `reviews`
    *   `watchlist` (Important: Must use this exact name)
4.  Copy your project API endpoint (e.g., `https://675dc55e63b05ed07978f8c6.mockapi.io/animehub`).
5.  Open `src/config/apiConfig.js` and update `REVIEWS_BASE_URL` with your project URL.

### 3. Install Dimensions
```bash
npm install
```

### 4. Run Locally
```bash
npm run dev
```

## Technologies
- React 19
- Vite
- Framer Motion (Animations)
- Sonner (Toast Notifications)
- Axios (API Client)
- Lucide React (Icons)
