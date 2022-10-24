import { Container } from "pixi.js";

export default class Controller {
  public model: any;
  public view: any;
  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;
  }

  addParent(parent: Container, config: any) {
    parent.addChild(this.view);
    this.view.addConfig(config);
    this.onInitialize();
  }
  onInitialize() {
      this.view.onInitialize()
  }
  destroy() {
    this.view.destroy();
  }

  show(config?: any, cb?: any) {
    this.view.show(config, cb);
  }

  hide(config?: any, cb?: any) {
    this.view.hide(config, cb);
  }

  reset() {
    this.view.reset();
  }
}
