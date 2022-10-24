import Controller from "./UIController";
import View from "./UIView";
import Model from "./UIModel";

export const UIComponent = new Controller(new Model(), new View());
