import Controller from "./WheelController";
import View from "./WheelView";
import Model from "./WheelModel";

export const WheelComponent = new Controller(new Model(), new View());
