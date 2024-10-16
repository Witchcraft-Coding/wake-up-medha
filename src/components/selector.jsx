import { Hue, Saturation, useColor } from "react-color-palette";
import PropTypes from "prop-types";
import { useMemo } from "react";
import invert from "invert-color";

const Selector = ({ defaultColour, setColour, height = 200 }) => {
	const [colour, setColourInternal] = useColor(defaultColour);
	const invertedColour = useMemo(
		() => invert(colour?.hex ?? colour, true),
		[colour]
	);

	const handleColourChange = (newColour) => {
		setColourInternal(newColour);
		setColour(newColour);
	};

	return (
		<>
			<div
				style={{
					height,
					border: `2px solid ${invertedColour}`,
					borderRadius: "12px",
				}}
			>
				<Saturation
					height={height}
					color={colour}
					onChange={handleColourChange}
				/>
			</div>
			<div
				style={{
					padding: "3px",
					marginTop: "14px",
					backgroundColor: colour.hex,
				}}
			>
				<Hue color={colour} onChange={handleColourChange} />
			</div>
			{colour.hex}
		</>
	);
};

Selector.propTypes = {
	defaultColour: PropTypes.any.isRequired,
	setColour: PropTypes.func.isRequired,
	setInvertedColour: PropTypes.func,
	height: PropTypes.number,
};

export default Selector;
