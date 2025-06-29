from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Tuple
from itertools import permutations

app = FastAPI()

# ✅ CORS middleware so frontend (localhost:5173) can talk to backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GridRequest(BaseModel):
    grid: List[List[int]]
    start: Tuple[int, int]
    stops: List[Tuple[int, int]]
    return_to_start: bool = False

def manhattan(a: Tuple[int, int], b: Tuple[int, int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

@app.post("/optimize-route")
def optimize_route(data: GridRequest):
    start = data.start
    stops = data.stops

    best_route = []
    min_distance = float("inf")

    for perm in permutations(stops):
        route = [start] + list(perm)
        if data.return_to_start:
            route.append(start)

        dist = sum(manhattan(route[i], route[i+1]) for i in range(len(route)-1))
        if dist < min_distance:
            min_distance = dist
            best_route = route

    return {
        "optimized_route": best_route,
        "total_distance": min_distance
    }
