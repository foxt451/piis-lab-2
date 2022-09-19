# Laboratory work #1 for PIIS

## Description

A maze game, where you have to keep gopher walking as long as possible.

## Gameplay

The gopher will always try to reach the closest of all 4 treasures to him, and do it in the shortest way possible. You can place new walls by clicking on empty spaces and it will make gopher recalculate the shortest path, using the algorithm you selected (tip: they do not differ gameplay-wise), and, possibly change the route (you can always see the calculated route on the map). For each new cell on the maze that the gopher visits you get a point to your score. When gopher reaches a treasure or, according to his calculations, he can no longer reach any treasure, the game ends.

## Game process
Game Process:

![game process](https://user-images.githubusercontent.com/52706110/191001738-1062a6f6-dbb4-4ce7-ad2c-11dec3cf64eb.gif)

Menu:

![menu](https://user-images.githubusercontent.com/52706110/191001781-af4b2955-ccff-4d81-a760-a000ba1f6e93.png)

## Stack

Client: react/redux

Back: express

Common: socket.io, typescript

Algorithms: DFS for maze generation, Lee algorithm and A\* for path finding
