import Controller from "./Controller";
import View from "./View";
import Model from "./Model";

export const baseComponent = new Controller(new Model(), new View());
