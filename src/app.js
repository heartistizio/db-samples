var express = require('express');

module.exports = async function appFactory(repositories) {
	var app = express();

	app.get('/get/:database', async function middleware(
		{ params: { database } = {}, query: { search = '' } = {} } = {},
		res
	) {
		var repository = repositories[database] || repositories[noop];
		var response = await repository.find(search);

		res.json({ status: 'ok', response });
	});

	app.use(express.static('./static'));
	app.listen(process.env.PORT);
	console.log(`Running on port: http://localhost:${process.env.PORT}`);

	return app;
};
