import Wave from "./wave.js";
import D from "./D.js";
import PATTERN from "./pattern.js";

const random = (base, offset = 0) => Math.random() * base + offset,
	randomInt = (base, offset = 0) => parseInt(random(base, offset));

export default () => {
	const layerCount = randomInt(6, 6),
		height = 800,
		width = 800,
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
			`<path d="${i.d}" stroke="rgba(${randomInt(255)},${randomInt(
				255,
			)},${randomInt(255)},${randomInt(30) / 100})" stroke-width="${randomInt(
				3,
			)}px" fill="url(#bg${
				++n % 4
			})" fill-opacity="${opacity}" transform="rotate(${n % 2 ? 180 : 0} ${
				width / 2
			} ${height / 2})"></path>`,
		);
		opacity -= opstep;
	}
	path.push(
		`<rect fill-opacity="${
			randomInt(30) / 100
		}" height="100%" width="100%" fill="url(#bg2)"></rect>`,
	);
	const size = randomInt(30, 70),
		box_h = randomInt(height - size),
		box_w = randomInt(width - size),
		block_y = box_h,
		block_x = box_w,
		d_n = randomInt(D.length);
	path.push(
		`<svg viewBox="0 0 1024 1024" x="${block_x}" y="${block_y}" width="${size}px" height="${size}px"><path d="${
			D[d_n]
		}" fill="url(#ico)" transform="skewX(${randomInt(
			20,
			-10,
		)}) skewY(${randomInt(20, -10)})"></path></svg>`,
	);

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
    <pattern id="ico" patternTransform="rotate(${randomInt(
			360,
		)})" width="${randomInt(15, 55)}px" height="${randomInt(15, 55)}px" patternUnits="userSpaceOnUse">
    <path fill="rgba(${randomInt(50)},${randomInt(50)},${randomInt(50)},.8)" d="M36.445 4.336c3.047-1.484 5.808-1.953 8.282-1.406.208.026.377.13.507.312l.118.586c-.495 2.5-2.045 4.857-4.649 7.07l-.351.157c-1.823.312-3.243-.3-4.258-1.836h-.04c-.963-1.51-.95-3.034.04-4.57l.351-.313M50 23.125c-1.823-1.224-3.307-3.138-4.453-5.742l-.078-.39c.182-1.824 1.146-3.022 2.89-3.595L50 13.203v9.922M29.766 0c-1.302 1.875-3.373 3.346-6.211 4.414l-.39.04c-1.824-.287-2.97-1.329-3.438-3.126L19.609 0h10.157M0 13.203c1.042.026 1.98.508 2.812 1.445l.196.391c.625 3.333.351 6.12-.82 8.36l-.47.39-.585-.039L0 23.086v-9.883M19.61 50c.051-1.172.611-2.174 1.68-3.008l.39-.156c3.385-.417 6.146.039 8.28 1.367l.352.469-.078.586-.468.742H19.609m17.54-18.36c-.652-1.692-.326-3.19.976-4.492a.68.68 0 01.352-.195c3.307-.86 6.106-.755 8.398.313l.43.43v.585c-.99 2.37-2.982 4.35-5.977 5.938l-.39.078c-1.876-.052-3.139-.925-3.79-2.617v-.04m7.883 15.43c-3.411.313-6.172-.247-8.281-1.68a.713.713 0 01-.313-.507.657.657 0 01.079-.547c1.354-2.188 3.658-3.815 6.914-4.883h.39c1.823.339 2.93 1.406 3.32 3.203.34 1.797-.234 3.23-1.718 4.297l-.39.117m-10.93-13.086c1.822.365 2.93 1.446 3.32 3.243v.039c.312 1.77-.287 3.19-1.797 4.257l-.39.118c-3.438.26-6.186-.339-8.243-1.797a.713.713 0 01-.312-.508.765.765 0 01.078-.586c1.38-2.161 3.698-3.75 6.953-4.766h.39M10.86 6.054c-2.03 2.709-4.283 4.389-6.757 5.04l-.586-.078-.352-.47c-.73-2.447-.417-5.233.938-8.358l.234-.313c1.51-1.12 3.047-1.237 4.61-.352h.038c1.589.964 2.266 2.357 2.032 4.18l-.157.352m2.149 11.836c-.912-3.282-.886-6.081.078-8.399a.713.713 0 01.39-.43c.183-.104.378-.104.587 0 2.395.886 4.44 2.813 6.132 5.782l.078.39c0 1.823-.833 3.112-2.5 3.868-1.692.65-3.203.364-4.53-.86l-.235-.351m22.383-3.868c.234 3.36-.352 6.094-1.758 8.204l-.508.351-.586-.117c-2.161-1.38-3.763-3.685-4.805-6.914v-.39c.365-1.824 1.433-2.917 3.204-3.282h.039c1.77-.339 3.19.247 4.257 1.758l.157.39M1.68 43.008c2.552-2.24 5.09-3.425 7.617-3.555l.547.195.273.547c.209 2.552-.65 5.222-2.578 8.008l-.312.234c-1.693.808-3.23.612-4.61-.585-1.354-1.25-1.745-2.748-1.172-4.493l.235-.351m9.922-10.82c-3.386-.652-5.886-1.954-7.5-3.907a.63.63 0 01-.196-.547.794.794 0 01.274-.547c1.9-1.718 4.557-2.656 7.968-2.812.157 0 .3.04.43.117 1.615.834 2.37 2.162 2.266 3.985v.039c-.156 1.823-1.107 3.033-2.852 3.632l-.39.04m13.437-10.743c3.177 1.172 5.417 2.839 6.719 5l.117.586-.352.469c-2.135 1.432-4.882 1.94-8.242 1.523l-.39-.156c-1.485-1.12-2.032-2.565-1.641-4.336v-.039c.443-1.77 1.576-2.8 3.398-3.086l.391.04m-7.773 14.452c1.744-.677 3.255-.39 4.53.86h.04c1.25 1.302 1.55 2.825.898 4.57l-.273.313c-2.682 2.083-5.287 3.112-7.813 3.086l-.546-.196a.75.75 0 01-.235-.547c-.078-2.578.95-5.195 3.086-7.851l.313-.235"></path>
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
		block_x,
		block_y,
		size,
		d_n,
	];
};