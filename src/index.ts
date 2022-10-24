import Game from "./core/game";

import { log } from "./utils/Logger";
import { Global } from "./utils/Global";

import "./style.css";

function start() {
  log("START GAME", "ACTION");
  Global.addGlobal("game", new Game());
}

start();
