import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";

export default function ScoreDisplay({ score }) {
	// 31 - 68 = 37

	const [progress, setProgress] = useState(0);
	const [colorLightness, setColorLightness] = useState(31);

	const wrapperAnimRef = useRef();

	const { userName, crushName } = useContext(AppContext);

	useEffect(() => {
		const incrementValue = 37 / 100;
		const ref = wrapperAnimRef.current;
		if (progress < score) {
			setTimeout(() => {
				setColorLightness((cl) => {
					return cl + incrementValue;
				});
				setProgress((p) => (p += 1));
			}, 40);
		}
		if (progress >= score) {
			ref.classList.remove("animate-bounce");
		}
	}, [progress, score]);

	return (
		<div className="flex flex-col gap-1 items-center">
			<div className="min-h-20 min-w-20">
				<div
					ref={wrapperAnimRef}
					className="overflow-visible w-20 h-20 absolute animate-bounce"
				>
					<div
						style={{
							backgroundColor: `hsla(342, 100%, ${colorLightness}%, 1)`,
						}}
						className="h-12 w-12 rotate-45 absolute mt-4 ml-4"
					></div>
					<div
						style={{
							backgroundColor: `hsla(342, 100%, ${colorLightness}%, 1)`,
						}}
						className="h-12 w-12 rounded-full absolute "
					></div>
					<div
						style={{
							backgroundColor: `hsla(342, 100%, ${colorLightness}%, 1)`,
						}}
						className="h-12 w-12 rounded-full absolute ml-8"
					></div>
				</div>
			</div>
			<h3
				style={{ color: `hsla(342, 100%, ${colorLightness}%, 1)` }}
				className="text-3xl italic"
			>
				{progress}
				<span className="text-slate-50">%</span>
			</h3>
			{progress >= score && (
				<p className="text-base text-gray-300">
					<span className="text-pink-300">{userName}</span> dan{" "}
					<span className="text-pink-300">{crushName}</span> memiliki kecocokan{" "}
					<span
						style={{
							color: `hsla(342, 100%, ${colorLightness}%, 1)`,
						}}
					>
						{score}
					</span>
					% sebagai pasangan
				</p>
			)}
		</div>
	);
}
