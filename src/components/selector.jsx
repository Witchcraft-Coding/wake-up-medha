import { Hue, Saturation, useColor } from "react-color-palette";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import invert from "invert-color";

const Selector = ({
	initColour,
	setColour,
	setInvertedColour = null,
	height = 200,
}) => {
	const [colour, setColourInternal] = useColor(initColour);
	const invertedColour = useMemo(() => invert(colour.hex, true), [colour]);

	useEffect(() => {
		setInvertedColour?.(invertedColour);
	}, [invertedColour, setInvertedColour]);

	const handleColourChange = (newColour) => {
		setColourInternal(newColour);
		setColour(newColour.hex);
	};

	return (
		<>
			<Saturation
				height={height}
				color={colour}
				onChange={handleColourChange}
			/>
			<div
				style={{
					padding: "3px",
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
	initColour: PropTypes.string.isRequired,
	setColour: PropTypes.func.isRequired,
	setInvertedColour: PropTypes.func,
	height: PropTypes.number,
};

export default Selector;
