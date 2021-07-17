var { MongoClient } = require('mongodb');

const collectionName = 'pets';

module.exports = async function repositoryFactory() {
	if (!process.env.MONGODB_CONNECTION) {
		return undefined;
	}

	var client = new MongoClient(process.env.MONGODB_CONNECTION, {
		useUnifiedTopology: true
	});

	await client.connect();
	var collection = client.db('adoption').collection(collectionName);

	return {
		async find(search) {
			return await collection
				.find(
					{
						$text: { $search: search }
					},
					{ _id: 0 }
				)
				.sort({ score: { $meta: 'textScore' } })
				.limit(10)
				.toArray();
		}
	};
};
