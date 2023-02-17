import Wave from "./wave.js";
import D from "./D.js";
import PATTERN from "./pattern.js";

const random = (base, offset = 0) => Math.random() * base + offset,
	randomInt = (base, offset = 0) => parseInt(random(base, offset));

export default (width, height) => {
	height = height || width;

	const layerCount = randomInt(6, 6),
		segmentCount = random(10, 5),
		wave = new Wave({
			width,
			height,
			segmentCount,
			layerCount,
			variance: random(10, 0.1),
			strokeWidth: 0,
			strokeColor: "none",
		}),
		{ svg } = wave.generateSvg(),
		path = [],
		randomColor = (base) => {
			var i = 0,
				r = [],
				n = 0;
			while (++i < 4) {
				r.unshift(randomInt(255));
				n += r[0];
			}
			n = n / base / 3;
			r = r.map((i) => {
				i = Math.round(i / n);
				if (i > 255) {
					i = 255;
				}
				return i;
			});

			return r.map((i) => {
				i = i.toString(16);
				if (i.length < 2) {
					i = "0" + i;
				}
				return i;
			}).join("");
		},
		opstep = .5 / layerCount,
		ico_n = randomInt(4, 4);

	svg.path.reverse();
	var n = 0,
		opacity = 0.5;
	for (const i of svg.path) {
		path.push(
			`<path d="${i.d}" stroke-dasharray="${randomInt(
				20,
			)}" stroke="rgba(${randomInt(255)},${randomInt(255)},${randomInt(255)},${
				randomInt(30) / 100
			})" stroke-width="${randomInt(3)}px" fill="url(#bg${
				++n % 4
			})" fill-opacity="${opacity}" transform="rotate(${n % 2 ? 180 : 0} ${
				width / 2
			} ${height / 2})"></path>`,
		);
		opacity -= opstep;
	}

	const size = randomInt(Math.round(height / 20), Math.round(height / 10)),
		box_h = randomInt(height - size),
		box_w = randomInt(width - size),
		block_y = box_h,
		block_x = box_w,
		d_n = randomInt(D.length);
	path.splice(
		parseInt(layerCount / 2),
		0,
		`<svg viewBox="0 0 1024 1024" x="${block_x}" y="${block_y}" width="${size}" height="${size}"><path d="${
			D[d_n]
		}" fill="url(#ico)" fill-opacity=".65" transform="skewX(${randomInt(
			20,
			-10,
		)}) skewY(${randomInt(20, -10)})"></path></svg>`,
	);
	path.push(
		`<rect fill-opacity="${
			randomInt(30) / 100
		}" height="100%" width="100%" fill="url(#bg2)"></rect>`,
	);

	const [psize, pattern] = PATTERN[randomInt(PATTERN.length)],
		color = [randomColor(70), randomColor(225)];
	if (Math.random() < .5) {
		color.reverse();
	}
	return [
		`<svg
	viewBox="0 0 ${width} ${height}"
	xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg0" x1="50%" y1="0" x2="50%" y2="100%">
			<stop offset="0%" stop-color="#${color[0]}"></stop>
			<stop offset="100%" stop-color="#${color[1]}"></stop>
		</linearGradient>
		<linearGradient id="bg1" x1="0%" y1="50%" x2="100%" y2="50%">
			<stop offset="100%" stop-color="#${color[0]}"></stop>
			<stop offset="0%" stop-color="#${color[1]}"></stop>
		</linearGradient>
		<linearGradient id="bg2" x1="0%" y1="0" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#${color[0]}"></stop>
			<stop offset="100%" stop-color="#${color[1]}"></stop>
		</linearGradient>
    <pattern id="ico" patternTransform="scale(${randomInt(10, 5) / 100})" width="1024px" height="1024px" patternUnits="userSpaceOnUse">
    <path fill="${color[0]}" d="M322.56 400.32c25.6-70.4-18.88-190.4-37.44-234.56a17.28 17.28 0 0 0-24-8.64c-42.56 22.08-153.6 85.44-179.2 155.84a128 128 0 1 0 240.64 87.68z m196.16 32C448 469.44 265.6 573.44 224 689.28A210.56 210.56 0 1 0 619.52 832c42.24-115.84-32-313.28-61.44-385.92a28.48 28.48 0 0 0-39.36-12.8zM893.76 64a21.44 21.44 0 0 0-29.76-9.6c-52.8 27.52-192 105.92-224 192a160 160 0 1 0 298.88 108.8c32.96-86.08-22.4-235.2-45.12-291.2z"></path>
	  </pattern>
    <pattern id="p" patternTransform="scale(${
			randomInt(100) / 25 + .5
		}) rotate(${randomInt(360)})" width="${psize}px" height="${psize}px" patternUnits="userSpaceOnUse">
    <path fill="url(#bg2)" d="${pattern}"></path>
	  </pattern>
  </defs>
  <rect fill-opacity="${randomInt(30) / 100}" height="100%" width="100%" fill="url(#p)"></rect>
  ${path.join("\n")}
</svg>`,
		d_n,
		block_x,
		block_y,
		size,
	];
};
