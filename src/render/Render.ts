import { Application, Container } from "pixi.js";
import { gsap } from "gsap";
import { signal } from "../services/SignalsService";

export default class Render extends Application {
  private readonly container: Container;
  public stage:Container
  constructor(color: number, density: number) {
    super({
      autoDensity: true,
      antialias: true,
      resolution: density,
      backgroundColor: color,
    });

    this.container = new Container();
    this.stage = new Container();
    this.container.addChild(this.stage)
    this.ticker.stop();

    gsap.ticker.fps(60);

    gsap.ticker.add((time) => {
      this.ticker.update(time);
    });


    this.makeInit();
  }

  makeInit() {
    signal.on("RESIZE", this.resizer.bind(this));
  }

  // @ts-ignore
  resizer({ scale, stage, screen }) {
    this.renderer.resize(screen.width, screen.height);
    this.stage.scale.set(scale);
    this.stage.x = (screen.width - stage.width * scale) / 2;
    this.stage.y = (screen.height - stage.height * scale) / 2;
  }
}
