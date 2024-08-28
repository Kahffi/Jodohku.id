import { useState } from "react";
import random from "random";

export default function useGetScore() {
	const [score, setScore] = useState(null);
	const [isPending, setIsPending] = useState(false);

	function getScore() {
		setIsPending(true);
		console.log("halo");

		setTimeout(() => {
			setScore(random.int(0, 100));
			console.log("on wait");
			setIsPending(false);
		}, 5500);
	}

	return { score, isPending, getScore };
}
