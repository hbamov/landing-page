import * as clr from "./Colors";


/*****************************************************************************/
export interface ITextStyle {
	id: string;
	color: string;
	font: string;
	lineHeight: number;
	textAlign?: string;
}


/*****************************************************************************/
export const HEADLINE: ITextStyle = {
	id: "headline",
	color: clr.GRAY.hex,
	font: "bold 36px Arial",
	lineHeight: 36 * 1.2,
};

export const BODY: ITextStyle = {
	id: "body",
	color: clr.GRAY.hex,
	font: "16px Arial",
	lineHeight: 16 * 1.2,
};

export const BUCKET_HEADLINE: ITextStyle = {
	id: "bucketHeadline",
	color: clr.GRAY.hex,
	font: "bold 24px Arial",
	lineHeight: 24 * 1.2,
};

export const BUCKET_BODY: ITextStyle = {
	id: "bucketBody",
	color: clr.GRAY.hex,
	font: "14px Arial",
	lineHeight: 14 * 1.2,
};