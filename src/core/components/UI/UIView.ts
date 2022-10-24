import View from "../base/View";
import { Text, Graphics } from "pixi.js";
import { gsap } from "gsap";
import { log } from "../../../utils/Logger";
import { signal } from "../../../services/SignalsService";


export default class UIView extends View {
  private balance: any;
  private balanceTitle: any;
  private bg: any;
  private _amount: any;
  onInitialize() {
    super.onInitialize();

    signal.on("WIN-COLLECT", this.win.bind(this));

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
    this.addChild(this.bg);

    this.balanceTitle = this.createText(this.config.balanceTitle);
    this.addChild(this.balanceTitle);

    this.balance = this.createText(this.config.balance);
    this.addChild(this.balance);
    this.balance.lastvalue = 0;
  }

  // @ts-ignore
  win(amount) {
    this.roll(this.balance.lastvalue + amount.win, 3);
  }

  roll(value: number, time: number) {
    const onUpdate = () => {
      this.balance.text = ~~this.balance.value;
    };
    const balanceTween = gsap.to(this.balance, time, {
      value,
      onUpdate,
      onComplete: () => {
        this.balance.lastvalue = value;
        balanceTween.kill();
      },
    });
  }

  show(config: any, cb: any) {
    super.show(config, cb);
  }
}
