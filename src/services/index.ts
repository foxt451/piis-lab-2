import { EnemyService } from "./enemy-service";
import { GameService } from "./game-service";
import { HeroService } from "./hero-service";
import { MazeService } from "./maze-service";

export const mazeService = new MazeService();
export const heroService = new HeroService();
export const gameService = new GameService();
export const enemyService = new EnemyService();
