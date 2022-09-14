import captcha from "./captcha-svg.js";
import { svgWebp } from "@user.tax/webp";

const ENCODER = new TextEncoder(),
	encode = ENCODER.encode.bind(ENCODER);

export default async () => {
	const li = captcha();
	li[0] = await svgWebp(encode(li[0]), 10);
	return li;
};
