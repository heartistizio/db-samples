var { Pool } = require('pg');

module.exports = async function repositoryFactory() {
	if (!process.env.POSTGRES_CONNECTION) {
		return undefined;
	}

	var pool = new Pool({ connectionString: process.env.POSTGRES_CONNECTION });
	var client = await pool.connect();

	return {
		async find(search) {
			var [ commentRes, boardRes ] = await Promise.all([
				client.query(' SELECT * FROM comments NATURAL LEFT JOIN rich_content WHERE board_id = $1', [ search ]),
				client.query(' SELECT * FROM boards WHERE board_id = $1', [ search ])
			]);

			return {
				board: boardRes.rows[0] || {},
				posts: commentRes.rows
			};
		}
	};
};
