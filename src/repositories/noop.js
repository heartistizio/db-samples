module.exports = async function createRepository() {
	return {
		async find() {
			return Promise.resolve([]);
		}
	};
};
