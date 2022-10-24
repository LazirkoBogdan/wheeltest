import View from "../base/View";
import { Container, Graphics, Sprite, ParticleContainer } from "pixi.js";
import { Emitter } from "pixi-particles";

import { signal } from "../../../services/SignalsService";
import { moveTween, alphaTween } from "../../../utils/Tweens";
import {sound} from "@pixi/sound";
export default class PopupView extends View {
  private bg: any;
  private winBg: any;
  private mainPopup: Container;
  private wheel: Container;
  private wheelsCenter: any;
  private wheelsPointer: any;
  private button: any;
  private buttonTakeWin: any;
  private winPopup: Container;
  private winText: any;
  onInitialize() {
    super.onInitialize();
    signal.on("WIN-COLLECT", this.updateWinText.bind(this));
    this.mainPopup = new Container();
    this.addChild(this.mainPopup);

    this.winPopup = new Container();
    this.addChild(this.winPopup);

    this.winBg = new Graphics();
    this.winBg.beginFill(this.config.bg.color);
    this.winBg.drawRoundedRect(
      this.config.winBg.x,
      this.config.winBg.y,
      this.config.winBg.width,
      this.config.winBg.height,
      this.config.winBg.round
    );
    this.winBg.endFill();
    this.winBg.alpha = this.config.bg.alpha;
    this.winPopup.addChild(this.winBg);

    this.bg = new Graphics();
    this.bg.beginFill(this.config.bg.color);
    this.bg.drawRoundedRect(
      this.config.bg.x,
      this.config.bg.y,
      this.config.bg.width,
      this.config.bg.height,
      this.config.bg.round
    );
    this.bg.endFill();
    this.bg.alpha = this.config.bg.alpha;
    this.mainPopup.addChild(this.bg);

    this.config.texts.forEach((params: any) => {
      const text = this.createText(params);
      this.mainPopup.addChild(text);
    });

    this.wheelsCenter = this.createSprite(this.config.wheelsCenter);
    for (let i = 0; i <= this.config.wheelPeaces; i++) {
      const peace: Sprite = this.createSprite(this.config.wheelPeace);
      peace.angle = i * this.config.wheelPeace.angle;
      peace.pivot.x = this.config.wheelPeace.pivot.x;
      peace.pivot.y = this.config.wheelPeace.pivot.y;
      this.wheelsCenter.addChild(peace);
    }
    this.wheelsPointer = this.createSprite(this.config.wheelsPointer);
    this.wheelsCenter.addChild(this.wheelsPointer);
    this.mainPopup.addChild(this.wheelsCenter);

    this.button = this.createButton(this.config.nextButton, () => {
      this.button.scale.set(0.8);
      sound.play("creditsRollup");
      setTimeout(() => {
        signal.dispatch("LOAD_WHEEL_SCENE");
        this.button.scale.set(1);
      }, 100);
    });
    this.mainPopup.addChild(this.button);

    this.createEmitter();

    this.winPopup.addChild(this.buttonTakeWin);
    this.winText = this.createText(this.config.winText);
    this.winPopup.addChild(this.winText);
  }

  createEmitter() {
    const textures = this.config.emitterTex.map(this.getTexture);
    let elapsed = Date.now();
    const update = function () {
      requestAnimationFrame(update);
      let now = Date.now();
      emitter.update((now - elapsed) * 0.001);
      elapsed = now;
    };
    const container = new ParticleContainer();
    // @ts-ignore
    this.winPopup.addChild(container);
    // @ts-ignore
    const emitter = new Emitter(container, textures, this.config.emitter.coin);
    emitter.emit = true;
    update();

    this.buttonTakeWin = this.createButton(this.config.nextWinButton, () => {
      this.buttonTakeWin.scale.set(0.8);
      sound.play("creditsRollup");
      setTimeout(() => {
        signal.dispatch("LOAD_INIT_SCENE");
        this.buttonTakeWin.scale.set(1);
      }, 100);
    });
  }

  updateWinText(amount: any) {
    this.winText.text = `YOU WON ${amount.win} CREDITS`;
  }
  show(config: any, cb: any) {
    super.show(config, cb);
    this.mainPopup.alpha = 0;
    this.winPopup.alpha = 0;
    alphaTween(this.mainPopup, 1, 0.4, "cubic.in");
  }
  showWinPopup(config: any, cb: any) {
    this.visible = true;
    this.mainPopup.alpha = 0;
    this.winPopup.alpha = 0;
    this.winText.y = this.config.winText.y - 500;

    alphaTween(this.winPopup, 1, 0.4, "cubic.in", () => {
      moveTween(
        this.winText,
        this.config.winText.x,
        this.config.winText.y,
        0.4,
        "cubic.in",
        () => {}
      );
    });
  }
}
