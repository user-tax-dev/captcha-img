import captcha from "./captcha-svg.js";
import { svgWebp } from "@user.tax/webp";

const ENCODER = new TextEncoder(),
	encode = ENCODER.encode.bind(ENCODER);

export default async (width, quality) => {
	const li = captcha(width);
	li[0] = await svgWebp(encode(li[0]), quality);
	return li;
};
