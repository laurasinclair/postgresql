const validateInputs = (req, res, next) => {
	const { name, description, rating } = req.body;

	if (name == undefined || name === "") return res.status(400).send({message: "Pizza name missing"});
	if (description == undefined || description === "") return res.status(400).send({message: "Pizza description missing"});
	if (rating == undefined || rating === "") return res.status(400).send({message: "Pizza rating missing"});
	if (typeof rating !== "number") return res.status(400).send({message: "Pizza rating should be a number"});

	next();
};

module.exports = validateInputs;