import { useEffect, useMemo, useRef, useState } from "react";
import invert from "invert-color";
import { DateTime } from "luxon";
import styled from "styled-components";
import { useColor } from "react-color-palette";
import { useWakeLock } from "react-screen-wake-lock";

import "react-color-palette/css";

import Selector from "./components/selector";

import "./app.css";

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

const defaultColour = "#000000";

function App() {
	/**
	 * @type {import("react").MutableRefObject<HTMLAudioElement | null>}
	 */
	const audioRef = useRef(null);
	const [colour, setColour] = useColor(defaultColour);
	const invertedColour = useMemo(
		() => invert(colour?.hex ?? colour, true),
		[colour]
	);
	const { request: requestWakeLock } = useWakeLock({
		onRequest: () => console.log("Wake lock requested."),
	});

	const [alarmColour, setAlarmColour] = useState("#FFFFFF");
	const [alarmEnabled, setAlarmEnabled] = useState(false);
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [alarmTime, setAlarmTime] = useState("00:00");

	useEffect(() => {
		requestWakeLock();
	}, [requestWakeLock]);

	useEffect(() => {
		if (alarmEnabled) {
			const interval = setInterval(() => {
				const now = DateTime.now().toFormat("HH:mm");
				if (now == alarmTime) {
					setColour({ hex: alarmColour });
					if (soundEnabled) {
						audioRef.current?.play();
					}
					clearInterval(interval);
				}
			}, 500);
			return () => interval && clearInterval(interval);
		}
	}, [alarmEnabled, alarmTime, alarmColour, setColour, soundEnabled]);

	useEffect(() => {
		if (!alarmEnabled) {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
		}
	}, [alarmEnabled, soundEnabled]);

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
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0",
							height: "250px",
						}}
					>
						<Selector
							defaultColour={defaultColour}
							setColour={setColour}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0",
						}}
					>
						<h5>Alarm colour:</h5>
						<input
							value={alarmColour}
							onChange={(e) => setAlarmColour(e.target.value)}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0",
						}}
					>
						<h5>
							<label>
								<input
									type="checkbox"
									checked={alarmEnabled}
									onChange={(e) =>
										setAlarmEnabled(e.target.checked)
									}
								/>{" "}
								Enable alarm?
							</label>
						</h5>
						{alarmEnabled && (
							<>
								<h5>
									<label>
										<input
											type="checkbox"
											checked={soundEnabled}
											onChange={(e) =>
												setSoundEnabled(
													e.target.checked
												)
											}
										/>{" "}
										Enable sound?
									</label>
								</h5>
								<h5>Alarm time:</h5>
								<input
									type="time"
									value={alarmTime}
									onChange={(e) =>
										setAlarmTime(e.target.value)
									}
								/>
							</>
						)}
						<audio
							ref={audioRef}
							src={import.meta.env.BASE_URL + "alarm.mp3"}
							loop
						/>
					</div>
				</ShowOnHover>
			</Container>
		</>
	);
}

export default App;
