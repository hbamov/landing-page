import * as AssetEvent from "../events/AssetEvent";
import * as img from "../data/ImageData";
import { IImageData } from "../data/ImageData";
import "createjs";


/*****************************************************************************/
export class AssetManager extends createjs.EventDispatcher {


	//===== VARIABLES ======================================//
	private static allowInstance: boolean;
	private queue: any;

	private static _instance: AssetManager;


	//===== CONSTRUCTOR ====================================//
	constructor() {

		if (!AssetManager.allowInstance)
			throw new Error("This is a singleton class and cannot be instantiated.");

		super();
	}


	//===== FUNCTIONS ======================================//
	/**
	 * Loads assets from a manifest array.
	 * @param manifest 
	 */
	loadManifest(manifest: Array<IImageData>): void {

		this.queue = new createjs.LoadQueue(true);
		this.queue.on("complete", this.onLoadComplete, this);
		this.queue.loadManifest(manifest);
	}

	/**
	 * Returns the asset from the load queue.
	 * @param id 
	 */
	getAsset(id: string): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement {
		return this.queue.getResult(id);
	}


	//===== EVENT LISTENERS ================================//
	private onLoadComplete() {

		this.dispatchEvent(AssetEvent.LOAD_COMPLETE);
	}


	//===== GETTERS / SETTERS ==============================//
	static get instance(): AssetManager {

		if (!this._instance) {

			this.allowInstance = true;
			this._instance = new AssetManager();
			this.allowInstance = false;
		}

		return this._instance;
	}
}