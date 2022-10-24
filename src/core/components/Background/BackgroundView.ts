import View from "../base/View";
import { Sprite } from "pixi.js";

export default class BackgroundView extends View {
  private bg: Sprite;
  onInitialize() {
    super.onInitialize();

    this.bg = new Sprite(this.getTexture(this.config.bg.tex));
    this.x = this.config.bg.x;
    this.y = this.config.bg.y;
    this.addChild(this.bg)

  }
  show(config: any, cb: any) {
    super.show(config, cb);
  }
}
