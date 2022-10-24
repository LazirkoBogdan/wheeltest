import ResizeContainer from "../../display/ResizeContainer";
import { LoadManager } from "../../../managers/LoadManager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
export default class View extends ResizeContainer {
  protected config: any;
  onInitialize() {
   this.visible = false
  }

  addConfig(config: any) {
    this.config = config;
  }

  createText(config: any) {
    const text = new Text(config.text, config.style);
    text.x = config.x;
    text.y = config.y;
    text.anchor.set(0.5);
    return text;
  }

  createButton(config: any, cb?: any) {
    const container = new Container();
    const bt = new Graphics();
    bt.beginFill(config.bg.color);
    bt.drawRoundedRect(
      config.bg.x,
      config.bg.y,
      config.bg.width,
      config.bg.height,
      config.bg.round
    );
    bt.endFill();
    bt.alpha = config.bg.alpha;
    container.addChild(bt);
    const text = this.createText(config.text);
    container.addChild(text);
    bt.addChild(text);
    // @ts-ignore
    container.interactive = true;
    // @ts-ignore
    container.buttonMode = true;
    // @ts-ignore
    container.on("pointerdown", () => {
      if (cb) cb();
    });
    container.x = config.container.x;
    container.y = config.container.y;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    return container;
  }

  createSprite(config: any) {
    const sprite: Sprite = new Sprite(this.getTexture(config.tex));
    sprite.x = config.x;
    sprite.y = config.y;
    sprite.alpha = config.alpha;
    sprite.scale.set(config.scale || 1);
    sprite.anchor.set(config.anchor);
    return sprite;
  }

  show(config: any, cb: any) {
    this.visible = true;
  }

  hide(config: any, cb: any) {
    this.visible = false;
  }

  reset() {}

  destroy() {}

  getTexture(tex: string) {
    return LoadManager.getTextureFromAtlases(tex);
  }
}
