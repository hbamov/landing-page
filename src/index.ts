import { Template } from "./Template";

const DOM_CONTENT_LOADED: string = "DOMContentLoaded";

function onReady(e: Event) {
	console.log("index: onReady");

	e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReady);
	var template: Template = new Template();
};

document.addEventListener(DOM_CONTENT_LOADED, onReady);

