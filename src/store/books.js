import Vue from 'vue';

export default {
	state: {
		books: []
	},
	mutations: {
		setBooks(state, payload) {
			state.books = payload;
		}
	},
	actions: {
		loadBooks({ commit }) {
			Vue.$db
				.collection('books')
				.get()
				.then(querySnapshot => {
					let books = [];
					querySnapshot.forEach(s => {
						const data = s.data();
						let book = {
							id: s.id,
							title: data.title,
							description: data.description,
							imageUrl: data.imageUrl,
							level: data.level.slice(),
							youtubePlaylistId: data.youtubePlaylistId,
							parts: data.parts
						};

						books.push(book);
					});

					commit('setBooks', books);
				})
				.catch(error => console.log(error));
		}
	},
	getters: {
		getBooks: state => state.books,
		getParts: state => state.bookParts
	}
};
