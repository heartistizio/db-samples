var dotenv = require('dotenv');
var appFactory = require('./app');
var mongoDbRepositoryFactory = require('./repositories/mongodb');
var postgresRepositoryFactory = require('./repositories/postgres');
var noopRepositoryFactory = require('./repositories/noop');

async function init() {
	dotenv.config();

	await appFactory({
		noop: noopRepositoryFactory(),
		postgres: await postgresRepositoryFactory(),
		mongodb: await mongoDbRepositoryFactory()
	});
}

init();
