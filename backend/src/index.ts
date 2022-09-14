import express from "express";
import { config } from "./config";
import { routeNames } from "./routes.config";
import { gameRouter } from "./routes/game/game-routes";

const app = express();

app.use(routeNames.game, gameRouter);

app.listen(config.PORT, () => {
  console.log(`🚀 App listening on port ${config.PORT}`);
});
