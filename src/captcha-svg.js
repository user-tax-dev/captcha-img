import Wave from "./wave.js";
import D from "./D.js";
import PATTERN from "./pattern.js";

const random = (base, offset = 0) => Math.random() * base + offset,
	randomInt = (base, offset = 0) => parseInt(random(base, offset));

export default () => {
	const layerCount = randomInt(6, 6),
		height = 800,
		width = 800,
		size = randomInt(64, 96),
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
		block_y = randomInt(height - size),
		block_x = randomInt(width - size),
		d_n = randomInt(D.length),
		path = [
			`<svg viewBox="-1000 -1000 2024 2024" x="${block_x}" y="${block_y}" width="${size}" height="${size}"><path d="${
				D[d_n]
			}" fill="url(#bg3)" transform="skewX(${randomInt(
				20,
				-10,
			)}) skewY(${randomInt(20, -10)})" fill-opacity=".8"></path></svg>`,
		],
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
		opstep = .5 / layerCount;

	svg.path.reverse();
	var n = 0,
		opacity = 0.5;
	for (const i of svg.path) {
		path.push(
			`<path
		d="${i.d}"
		stroke="none"
		stroke-width="0"
		fill="url(#bg${++n % 4})"
		fill-opacity="${opacity}"
    transform="rotate(${n % 2 ? 180 : 0} ${width / 2} ${height / 2})" 
	></path>`,
		);
		opacity -= opstep;
	}

	const [psize, pattern] = PATTERN[randomInt(PATTERN.length)],
		color = [randomColor(64), randomColor(220)];
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
		<linearGradient id="bg3" x1="0%" y1="0" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#${randomColor(180)}"></stop>
			<stop offset="50%" stop-color="#${randomColor(25)}"></stop>
			<stop offset="100%" stop-color="#${randomColor(180)}"></stop>
		</linearGradient>
    <pattern id="p" patternTransform="scale(${
			randomInt(100) / 25 + .5
		}) rotate(${randomInt(180)})" width="${psize}px" height="${psize}px" patternUnits="userSpaceOnUse">
    <path fill="url(#bg3)" d="${pattern}"></path>
	  </pattern>
  </defs>
  <rect fill-opacity="${randomInt(30) / 100}" height="100%" width="100%" fill="url(#p)"></rect>
  ${path.join("\n")}
  <rect fill-opacity="${randomInt(30) / 100}" height="100%" width="100%" fill="url(#bg2)"></rect>
</svg>`,
		block_x,
		block_y,
		size,
		d_n,
	];
};
