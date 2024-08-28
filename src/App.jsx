import { createContext, useState } from "react";
import useGetScore from "./hooks/useGetScore";
import ScoreDisplay from "./components/ScoreDisplay";

export const AppContext = createContext();

function App() {
	const [userName, setUserName] = useState("");
	const [crushName, setCrushName] = useState("");
	const { score, isPending, getScore } = useGetScore();

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		setUserName(formData.get("userName"));
		setCrushName(formData.get("crushName"));
		getScore();
	}

	return (
		<AppContext.Provider value={{ userName, crushName }}>
			<div className="flex flex-col font-chewy bg-slate-900 min-h-dvh text-gray-50 pb-14">
				<header className="flex flex-col items-center p-28 ">
					<h1 className="text-9xl">JODOHKU.ID</h1>
					<h2 className="text-3xl">
						Cek kecocokan hubungan kamu dengan crush atau pasanganmu
					</h2>
				</header>
				<main className="flex flex-col gap-10">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-8 w-full items-center"
					>
						<div className="flex gap-5">
							<input
								required
								name="userName"
								placeholder="Nama kamu"
								type="text"
								className="text-lg px-4 py-1 bg-slate-400/30 border-2 min-w-60 rounded-full focus:outline-none"
							/>
							<input
								required
								name="crushName"
								placeholder="Nama pasanganmu"
								type="text"
								className="text-lg px-4 py-1 bg-slate-400/30 border-2 min-w-60 rounded-full focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							className="text-xl text-white bg-red-400 rounded-full px-10 py-2 hover:bg-red-400/90"
						>
							CHECK
						</button>
					</form>

					{(isPending || score) && (
						<section className="flex justify-center text-xl">
							<div className="flex flex-col items-center border min-w-96 gap-5 p-11 rounded-xl bg-slate-500/40">
								{/* loading animation */}
								{isPending && (
									<>
										<h3>Memprediksi Kecocokan</h3>
										<div className="min-h-20 min-w-20">
											<div className="overflow-visible w-20 h-20  absolute animate-ping mt-1">
												<div className="h-12 w-12 bg-pink-500 rotate-45 absolute mt-4 ml-4  scale-75"></div>
												<div className="h-12 w-12 bg-pink-500 rounded-full absolute  scale-75"></div>
												<div className="h-12 w-12 bg-pink-500 rounded-full absolute ml-8 scale-75"></div>
											</div>
											<div className="overflow-visible w-20 h-20  absolute">
												<div className="h-12 w-12 bg-pink-500 rotate-45 absolute mt-4 ml-4"></div>
												<div className="h-12 w-12 bg-pink-500 rounded-full absolute "></div>
												<div className="h-12 w-12 bg-pink-500 rounded-full absolute ml-8"></div>
											</div>
										</div>
										<p className="text-gray-300 text-sm">
											Harap bersabar, kami sedang berusaha semaksimal mungkin
										</p>
									</>
								)}
								{/* result obtained */}
								{!isPending && score ? (
									<>
										<h3>JENGJENGJENG....</h3>
										<ScoreDisplay score={score} />
									</>
								) : null}
							</div>
						</section>
					)}
				</main>
			</div>
		</AppContext.Provider>
	);
}

export default App;
