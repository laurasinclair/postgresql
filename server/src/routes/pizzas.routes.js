const router = require("express").Router();
const validateInputs = require("../error-handling/validateInputs");
const { Pool } = require("pg");

const DB_USERNAME = process.env.DB_USERNAME;

const pool = new Pool({
	user: DB_USERNAME,
	host: "localhost",
	database: "postgres",
	// password: "yourpassword", // only if you set one
	port: 5432,
});

router.get("/", async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM pizzas");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error getting all pizzas");
  }
});

// post a new pizza
router.post("/", validateInputs, async (req, res) => {
	const { name, description, rating } = req.body;

	try {
		const result = await pool.query(
			"INSERT INTO pizzas (name, description, rating) VALUES ($1, $2, $3) RETURNING *",
			[name, description, rating]
		);
		console.log("🟢 POST /pizzas success", result.rows[0]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("DB error creating a pizza");
	}
});

module.exports = router;