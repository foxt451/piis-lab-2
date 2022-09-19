import express from "express";
import http from "http";
import { config } from "./config";
import { routeNames } from "./routes.config";
import { gameRouter } from "./routes/game/game-routes";
import cors from "cors";
import { Server } from "socket.io";
import { initSocketHandler } from "./socket-handlers";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
initSocketHandler(io);

app.use(cors());
app.use(express.json());
app.use(routeNames.game, gameRouter);

server.listen(config.PORT, () => {
  console.log(`🚀 App listening on port ${config.PORT}`);
});
