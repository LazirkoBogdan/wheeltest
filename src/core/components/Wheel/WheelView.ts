import View from "../base/View";
import { Sprite, Ticker } from "pixi.js";
import { gsap } from "gsap";
import { signal } from "../../../services/SignalsService";
import { sound } from "@pixi/sound";
import { moveTween, alphaTween } from "../../../utils/Tweens";
export default class WheelView extends View {
  private wheelsCenter: any;
  private wheelsPointer: any;
  private spinButton: any;
  private title: any;
  private startAngle: number = 35;
  private section = [
    { id: 0, weight: 0, credits: 0 },
    { id: 1, weight: 100, credits: 200 },
    { id: 2, weight: 20, credits: 1000 },
    { id: 3, weight: 50, credits: 400 },
    { id: 4, weight: 10, credits: 2000 },
    { id: 5, weight: 100, credits: 200 },
    { id: 6, weight: 20, credits: 1000 },
    { id: 7, weight: 50, credits: 400 },
    { id: 8, weight: 4, credits: 5000 },
  ];
  private weight = [0, 100, 20, 50, 10, 100, 20, 50, 4];
  private items = [0, 200, 1000, 400, 2000, 200, 1000, 400, 5000];
  private spining: boolean;
  private isRandom: boolean = true;
  private randomSector: number = 1;

  onInitialize() {
    super.onInitialize();
    this.spining = false;
    this.wheelsCenter = this.createSprite(this.config.wheelsCenter);
    for (let i = 0; i <= this.config.wheelPeaces; i++) {
      const peace: Sprite = this.createSprite(this.config.wheelPeace);
      peace.angle = i * this.config.wheelPeace.angle;
      peace.pivot.x = this.config.wheelPeace.pivot.x;
      peace.pivot.y = this.config.wheelPeace.pivot.y;

      const text = this.createText(this.config.wheelPeace.text);
      text.text = this.section[i].credits;
      peace.addChild(text);

      this.wheelsCenter.addChild(peace);
    }
    this.wheelsPointer = this.createSprite(this.config.wheelsPointer);

    this.addChild(this.wheelsCenter);
    this.addChild(this.wheelsPointer);

    this.title = this.createText(this.config.wheelTitle);
    this.addChild(this.title);

    this.spinButton = this.createButton(this.config.spinButton, () => {
      if (this.spining) return;
      this.spining = true;
      this.spinButton.scale.set(0.8);
      sound.play("wheelClick");
      this.tweenWheel();
      setTimeout(() => {
        this.spinButton.scale.set(1);
      }, 100);
    });
    this.addChild(this.spinButton);

    signal.on("CHEAT_RANDOM", this.updateIsRandom.bind(this));
    signal.on("CHEAT_WHEEL_SLICE", this.updateRandomSector.bind(this));
  }

  updateRandomSector(value: any) {
    this.randomSector = value.slice;
  }

  updateIsRandom(value: any) {
    this.isRandom = value.random;
  }

  tweenWheel() {
    const result = this.isRandom? this.weightedRandom(this.items, this.weight):this.weightedRandom(this.items, this.weight,true,this.randomSector)
    // @ts-ignore
    const angleWin = -(this.config.wheelOffest * result.index);
    // @ts-ignore
    const win = result.item || 0;

    const update = (delta: any) => {
      this.updateWheel(delta, this.wheelsCenter);
    };

    const tween = gsap.to(this.wheelsCenter, {
      angle: this.startAngle + 30,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        Ticker.system.add(update);
        setTimeout(() => {
          Ticker.system.remove(update);
          this.wheelsCenter.angle = 0;
          const tween = gsap.to(this.wheelsCenter, {
            angle: angleWin,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              this.spining = false;
              this.wheelsCenter.angle = angleWin;
              this.startAngle = angleWin;
              sound.play("wheelLanding");
              setTimeout(() => {
                signal.dispatch("LOAD_WIN_SCENE", { win });
              }, 500);

              signal.dispatch("WIN-COLLECT", { win });
            },
          });
          tween.play();
        }, 2000);
      },
    });

    tween.play();
  }

  updateWheel(delta: any, wheel: any) {
    if (wheel.angle > 359) {
      wheel.angle = 0;
    }
    wheel.angle += 12 * delta;
  }

  show(config: any, cb: any) {
    super.show(config, cb);
    this.spinButton.x = this.config.spinButton.container.x + 500;
    this.title.y = this.config.wheelTitle.y - 500;

    this.wheelsCenter.alpha = 0;
    this.wheelsPointer.alpha = 0;

    alphaTween(this.wheelsCenter, 1, 0.4, "cubic.in");
    alphaTween(this.wheelsPointer, 1, 0.4, "cubic.in");
    moveTween(
      this.spinButton,
      this.config.spinButton.container.x,
      this.config.spinButton.container.y,
      0.4,
      "cubic.in",
      () => {}
    );
    moveTween(
      this.title,
      this.config.wheelTitle.x,
      this.config.wheelTitle.y,
      0.4,
      "cubic.in",
      () => {}
    );
  }

  hide(config: any, cb: any) {
    super.show(config, cb);
    alphaTween(this.wheelsCenter, 0, 0.4, "cubic.out");
    alphaTween(this.wheelsPointer, 0, 0.4, "cubic.out");
    moveTween(
      this.spinButton,
      this.config.spinButton.container.x + 500,
      this.config.spinButton.container.y,
      0.4,
      "cubic.in",
      () => {}
    );
    moveTween(
      this.title,
      this.config.wheelTitle.x,
      this.config.wheelTitle.y - 500,
      0.4,
      "cubic.in",
      () => {}
    );
  }

  weightedRandom(
    items: any,
    weights: number[],
    force?: boolean,
    cheatIndex: number = 0
  ) {
    if (items.length !== weights.length) {
      throw new Error("Items and weights must be of the same size");
    }

    if (!items.length) {
      throw new Error("Items must not be empty");
    }

    const cumulativeWeights: string | any[] = [];
    for (let i = 0; i < weights.length; i += 1) {
      cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();


    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      if (cumulativeWeights[itemIndex] >= randomNumber) {
        if (force) {
          return {
            item: items[cheatIndex],
            index: cheatIndex,
          };
        }else{
          return {
            item: items[itemIndex],
            index: itemIndex,
          };
        }
      }
    }
  }
}
