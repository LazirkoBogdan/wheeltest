import Controller from "../base/Controller";

export default class PopupController extends Controller {

    showWinPopup(config: any, cb: any){
       this.view.showWinPopup(config, cb)
    }
}
