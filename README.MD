# Laboratory work #1 for PIIS

## Description

A maze game, where you have to keep gopher walking as long as possible.

## Gameplay

The gopher will always try to reach the closest of all 4 treasures to him, and do it in the shortest way possible. You can place new walls by clicking on empty spaces and it will make gopher recalculate the shortest path, using the algorithm you selected (tip: the do not differ gameplay-wise), and, possibly change the route (you can always see the calculated route on the map). For each new cell on the maze the gopher visits you get a point to your score. When gopher reaches a treasure or, according to his calculations, he can no longer reach any treasure, the game ends.

## Game process

## Stack

Client: react/redux
Back: express
Common: socket.io/typescript
Algorithms: DFS for maze generation, Lee algorithm and A\* for path finding
