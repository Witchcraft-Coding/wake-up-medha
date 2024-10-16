import { useMemo } from "react";
import { Hue, Saturation, useColor } from "react-color-palette";
import invert from "invert-color";

import "react-color-palette/css";

import "./App.css";

function App() {
	const [colour, setColour] = useColor("white");
	const invertedColour = useMemo(() => invert(colour.hex, true), [colour]);

	return (
		<>
			<div
				style={{
					height: "100vh",
					width: "100vw",
					backgroundColor: colour.hex,
					color: invertedColour,
					display: "flex",
					flexDirection: "column",
					gap: "0",
					alignItems: "center",
					paddingTop: "30px",
				}}
			>
				<div
					style={{
						width: "min(200px, 95vw)",
						height: "200px",
						display: "flex",
						flexDirection: "column",
						gap: "0",
					}}
				>
					<Saturation
						height={200}
						color={colour}
						onChange={setColour}
					/>
					<div
						style={{
							padding: "3px",
							backgroundColor: colour.hex,
						}}
					>
						<Hue color={colour} onChange={setColour} />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
