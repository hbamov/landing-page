import * as AssetEvent from "./events/AssetEvent";
import * as img from "./data/ImageData";
import { AssetManager } from "./managers/AssetManager";
import { FrontPage } from "./pages/FrontPage";
import "createjs";


/*****************************************************************************/
export class Template {


	//===== VARIABLES ======================================//
	private canvas: HTMLElement;
	private stage: createjs.Stage;
	private page: FrontPage;


	//===== CONSTRUCTOR ====================================//
	constructor() {

		this.am.addEventListener(AssetEvent.LOAD_COMPLETE, this.onLoadComplete.bind(this));
		this.am.loadManifest(img.MANIFEST);
	}


	//===== FUNCTIONS ======================================//
	private init() {

		this.canvas = document.getElementById("app");

		this.stage = new createjs.Stage("app");

		this.page = new FrontPage();
		this.page.width = this.canvas.clientWidth;
		this.page.height = this.canvas.clientHeight;
		this.stage.addChild(this.page);

		this.stage.update();
	}


	//===== EVENT LISTENERS ================================//
	private onLoadComplete(): void {

		this.init();
	}


	//===== CONVENIENCE ====================================//
	private get am(): AssetManager {
		return AssetManager.instance;
	}
}