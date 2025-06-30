# 🗺️ GridRoute Optimizer

**GridRoute Optimizer** is a full-stack web application that allows users to input delivery stops on a grid and computes the most optimized route using Manhattan distance. Built for logistics/delivery use-cases, it's a mini TSP (Traveling Salesman Problem) visualizer.

---

## 🚀 Live Demo

- 🌐 Frontend (Netlify): https://gridmaproute-optimizer.netlify.app   (# 🗺️ GridRoute Optimizer

**GridRoute Optimizer** is a full-stack web application that allows users to input delivery stops on a grid and computes the most optimized route using Manhattan distance. Built for logistics/delivery use-cases, it's a mini TSP (Traveling Salesman Problem) visualizer.

---

## 🚀 Live Demo

- 🌐 Frontend (Netlify): [https://gridmaproute-optimizer.netlify.app] (https://gridmaproute-optimizer.netlify.app)
- 🔧 Backend (Render): [https://gridroute-project.onrender.com/docs](https://gridroute-project.onrender.com/docs)

---

## 🧠 Features

- 📍 Add delivery coordinates manually or by clicking on the map.
- 🧮 Optimizes delivery route using Manhattan distance.
- 🔁 Option to return to the starting point.
- 🗺️ Visualizes the route live on a grid with arrows.
- 🌍 Google Maps background (optional toggle in UI).

---

## 🛠️ Tech Stack

| Frontend            | Backend        |
|---------------------|----------------|
| React + Vite        | FastAPI (Python)|
| Tailwind CSS        | CORS Middleware |
| Google Maps API     | Permutations-based TSP |
| Netlify Deployment  | Render Deployment |

---

## ⚙️ How It Works

1. User enters grid size and coordinates for grid or delivery stop on map coordinates.
2. App calculates the optimal order of visiting the stops.
3. The result is shown on a dynamic grid with start ➝ stop ➝ end animation.
4. Total distance and optimize root is shown below and in map as entered.

---

## 🧩 Project Structure

)
- 🔧 Backend (Render): [https://gridroute-project.onrender.com/docs](https://gridroute-project.onrender.com/docs)

---

## 🧠 Features

- 📍 Add delivery coordinates manually or by clicking on the map.
- 🧮 Optimizes delivery route using Manhattan distance.
- 🔁 Option to return to the starting point.
- 🗺️ Visualizes the route live on a grid with arrows.
- 🌍 Google Maps background (optional toggle in UI).

---

## 🛠️ Tech Stack

| Frontend            | Backend        |
|---------------------|----------------|
| React + Vite        | FastAPI (Python)|
| Tailwind CSS        | CORS Middleware |
| Google Maps API     | Permutations-based TSP |
| Netlify Deployment  | Render Deployment |

---

## ⚙️ How It Works

1. User enters grid size and delivery stop coordinates.
2. App calculates the optimal order of visiting the stops.
3. The result is shown on a dynamic grid with start ➝ stop ➝ end animation.
4. Total distance is shown below.

---

## 🧩 Project Structure

GridRouteProject/
├── gridroute-frontend/ # React app (Vite + Tailwind)
│ ├── App.jsx
│ ├── Sidebar.jsx
│ ├── GridView.jsx
│ └── .env
├── gridroute-backend/ # FastAPI backend
│ ├── main.py
│ └── requirements.txt

thanku


