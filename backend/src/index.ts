import express from "express";
import { config } from "./config";
import { routeNames } from "./routes.config";
import { gameRouter } from "./routes/game/game-routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routeNames.game, gameRouter);

app.listen(config.PORT, () => {
  console.log(`🚀 App listening on port ${config.PORT}`);
});
