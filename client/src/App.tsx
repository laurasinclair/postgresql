import { useEffect, useState } from "react";
import pizzaService from "./services/pizza.service";
import PizzaType from './types'

function App() {
	const [allPizzas, setAllPizzas] = useState<PizzaType[]>([]);
	const [newPizza, setNewPizza] = useState<PizzaType>({
		name: "",
		description: "",
		rating: 5,
	});
	const [error, setError] = useState<undefined | string>(undefined);

	const fetchPizzas = async () => {
		try {
			const res = await pizzaService.getAllPizzas();
			const data: PizzaType[] = res.data;
			if (!data) throw new Error("No data to show");
			setAllPizzas(data);
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.message || err);
		}
	};

	useEffect(() => {
		fetchPizzas();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setError(undefined);

		const { name, value } = e.target;
		setNewPizza((prev: PizzaType) => ({
			...prev,
			[name]: name === "rating" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(undefined);

		try {
			const res = await pizzaService.createPizza(newPizza);
			const data: PizzaType = res.data;
			setAllPizzas((prev: PizzaType[]) => [...prev, data]);
			setNewPizza({ name: "", description: "", rating: 5 });
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.message || err);
		}
	};

	return (
		<div className="App">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h2>Add a new pizza</h2>
					<fieldset>
						<div>
							<label htmlFor="name">Pizza name</label>
							<input
								type="text"
								name="name"
								id="name"
								value={newPizza.name}
								onChange={handleChange}
							/>
						</div>

						<div style={{ width: "fit-content" }}>
							<label htmlFor="rating">Rating</label>
							<select
								name="rating"
								id="rating"
								value={newPizza.rating}
								onChange={handleChange}
							>
								{[5, 4, 3, 2, 1].map((number, i) => (
									<option key={`${number}_${i}`} value={number}>
										{number}
									</option>
								))}
							</select>
						</div>
					</fieldset>

					<fieldset>
						<div>
							<label htmlFor="description">Description</label>
							<textarea
								name="description"
								id="description"
								value={newPizza.description}
								onChange={handleChange}
							/>
						</div>
					</fieldset>

					<button type="submit">Submit pizza</button>

					{error && <div className="error">❌ {error}</div>}
				</form>
			</div>

			{allPizzas.length > 0 && (
				<div>
					<h2>List of pizzas</h2>
					<div className="pizzas">
						{allPizzas
							.map((pizza: PizzaType, i) => {
								return (
									<div
										className="pizza"
										key={`${i}_${pizza.description}`}
									>
										<h4>{pizza.name}</h4>
										<p>{pizza.description}</p>
										{pizza.rating} ⭐
									</div>
								);
							})
							.reverse()}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
