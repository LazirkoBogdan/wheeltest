import { log } from "../utils/Logger";
import { signal } from "../services/SignalsService";
import { ResizeService } from "../services/ResizeService";
import { LoadManager } from "../managers/LoadManager";
import { sound } from "@pixi/sound";
import { BackgroundComponent } from "../core/components/Background/index";
import { UIComponent } from "./components/UI";
import { PopupComponent } from "./components/Popup";
import {WheelComponent} from "./components/Wheel"
import { gameConfig } from "../config/gameConfig";
import {GameModel} from '../model/GameModel'
import Render from "../render/Render";

// @ts-ignore
import * as dat from 'dat.gui';


export default class Game {
  private application: Render;
  private model: any;
  constructor() {
    this.application = new Render(0x000000, 1);

    document.body.appendChild(this.application.view);
    ResizeService.init();
    LoadManager.init().then(() => {
      LoadManager.particleAssets().then(() => {
        LoadManager.initSound();
        sound.context.paused = false;
        this.initGame();
        this.hideLoader()
      });
    });
  }
  createCheatGUI(){
    const gui = new dat.GUI();
    const settings = {sector: 1, randomResult: true,};
    gui.add(settings, 'sector', 0, 8,1).onChange( (slice:number)=> {
      signal.dispatch("CHEAT_WHEEL_SLICE", { slice });
    });

    gui.add(settings, 'randomResult').onChange( (random:boolean)=> {
      signal.dispatch("CHEAT_RANDOM", { random });
    });
  }

  initGame() {
    this.model = GameModel.getModel()
    this.initModule()
    this.initSignal()
    this.updateBalance()
    this.showInitScene()
    this.createCheatGUI()
    ResizeService.resize();
  }
  initSignal(){
    signal.on("LOAD_WHEEL_SCENE", this.showWheelScene.bind(this));
    signal.on("LOAD_WIN_SCENE", this.showWinScene.bind(this));
    signal.on("LOAD_INIT_SCENE", this.showInitScene.bind(this));
  }
  initModule(){
    BackgroundComponent.addParent(this.application.stage, gameConfig.background);
    UIComponent.addParent(this.application.stage, gameConfig.UI);
    PopupComponent.addParent(this.application.stage, gameConfig.popup);
    WheelComponent.addParent(this.application.stage, gameConfig.Wheel);
  }
  hideLoader(){
    const loader = document.getElementsByClassName('lds-ripple')
    // @ts-ignore
    loader[0].style.display = 'none'
  }

  showInitScene(){
    BackgroundComponent.show( gameConfig.background)
    PopupComponent.show(gameConfig.popup);
    UIComponent.show(gameConfig.UI);
  }


  showWheelScene(){
    PopupComponent.hide(gameConfig.popup);
    WheelComponent.show(gameConfig.Wheel);
  }

  showWinScene(){
    WheelComponent.hide(gameConfig.Wheel);
    PopupComponent.showWinPopup(gameConfig.popup,()=>{

    });
  }

  updateBalance(){
    const win =  this.model.balance
    signal.dispatch("WIN-COLLECT", { win });
  }

}
