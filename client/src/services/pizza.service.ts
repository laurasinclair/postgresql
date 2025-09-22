import axios from "axios";

class PizzaService {
	constructor() {
		this.api = axios.create({ baseURL: "http://localhost:5005" });
	}

	getAllPizzas = () => {
		return this.api.get(`/pizzas`);
	};

	createPizza = (requestBody) => {
		return this.api.post("/pizzas", requestBody);
	};
}

const pizzaService = new PizzaService();
export default pizzaService;