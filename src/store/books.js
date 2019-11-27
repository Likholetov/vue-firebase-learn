export default {
	state: {
		books: [
			{
				id: 'kjgkgkgkgjkgkhg',
				title: 'Harry Potter - 1',
				description: 'First chapter',
				imageId: 'hhhhh',
				parts: 7,
				level: ['B2', 'C1'],
				rating: 4,
				ratingsCount: 100,
				youtubePlaylistId: 'kjkghkgkg'
			},
			{
				id: 'kjgkgkgkgjklllgkhg',
				title: 'Harry Potter - 2',
				description: 'Second chapter',
				imageId: 'hhkhh',
				parts: 7,
				level: ['B1', 'B2'],
				rating: 3.5,
				ratingsCount: 50,
				youtubePlaylistId: 'kjkghkgkg'
			},
			{
				id: 'kjgkgkgkgjklllgkhgff',
				title: 'Harry Potter - 3',
				description: 'Third chapter',
				imageId: 'hhnhh',
				parts: 7,
				level: ['B1', 'B2'],
				rating: 3.5,
				ratingsCount: 50,
				youtubePlaylistId: 'kjkghkgkg'
			}
		]
	},
	mutations: {
		setBooks(state, payload) {
			state.books = payload;
		}
	},
	getters: {
		getBooks: state => state.books
	}
};
