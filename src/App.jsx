import { useState } from "react";
import invert from "invert-color";

import "react-color-palette/css";

import "./app.css";
import styled from "styled-components";
import Selector from "./components/selector";

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
	const [colour, setColour] = useState("#FFFFFF");
	const [invertedColour, setInvertedColour] = useState(invert(colour, true));

	return (
		<>
			<Container
				style={{
					backgroundColor: colour,
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
					<Selector
						initColour="#FFFFFF"
						setColour={setColour}
						setInvertedColour={setInvertedColour}
					/>
				</ShowOnHover>
			</Container>
		</>
	);
}

export default App;
