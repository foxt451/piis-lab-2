import { enemyService, heroService, mazeService } from ".";
import { StartGameRequestDto, StartGameResponseDto } from "../types/game";

export class GameService {
  generateGame(info: StartGameRequestDto): StartGameResponseDto {
    const maze = mazeService.generateMaze(info.mazeGenerationInfo);

    const initialHeroInfo = heroService.findInitialHeroInfo(maze);
    const response: StartGameResponseDto = {
      maze,
      hero: initialHeroInfo,
      gameScore: 1,
      enemies: [enemyService.getEnemy(maze, "1", {x: 0, y: 0})],
    };
    return response;
  }
}
