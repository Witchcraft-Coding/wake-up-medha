import { useMemo } from "react";
import { Hue, Saturation, useColor } from "react-color-palette";
import invert from "invert-color";

import "react-color-palette/css";

import "./App.css";
import styled from "styled-components";

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	gap: 0;
	align-items: center;
	padding-top: 30px;
`;

const ShowOnHover = styled.div`
	opacity: 0;
	transition: opacity 0.3s;

	&:hover {
		opacity: 1;
	}
`;

function App() {
	const [colour, setColour] = useColor("white");
	const invertedColour = useMemo(
		() => invert(colour.hex, true),
		[colour],
		[colour.hex]
	);

	return (
		<>
			<Container
				style={{
					backgroundColor: colour.hex,
					color: invertedColour,
				}}
			>
				<ShowOnHover
					style={{
						width: "min(200px, 95vw)",
						height: "200px",
						display: "flex",
						flexDirection: "column",
						gap: "0",
						border: `2px solid ${invertedColour}`,
						borderRadius: "12px",
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
					{colour.hex}
				</ShowOnHover>
			</Container>
		</>
	);
}

export default App;
