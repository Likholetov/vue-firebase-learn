import Vue from 'vue';

let defaultUserData = {
	books: {},
	words: {}
};

export default {
	state: {
		userData: defaultUserData
	},
	mutations: {
		setUserData(state, payload) {
			state.userData = payload;
		},
		addUserBook(state, payload) {
			Vue.set(state.userData.books, payload.bookId, payload.book);
		},
		addUserWord(state, payload) {
			Vue.set(state.userData.words, payload.wordId, payload.word);
		},
		addUserBookPart(state, payload) {
			Vue.set(
				state.userData.books[payload.bookId].parts,
				payload.partId,
				{ addedDate: payload.timestamp }
			);
		},
		updateUserBookPartLastOpenedDate(state, payload) {
			Vue.set(
				state.userData.books[payload.bookId].parts[payload.partId],
				'lastOpenedDate',
				payload.timestamp
			);
		},
		updateUserBookPartFinishInfo(state, payload) {
			Vue.set(
				state.userData.books[payload.bookId].parts[payload.partId],
				'finishedDate',
				payload.timestamp
			);
			Vue.set(
				state.userData.books[payload.bookId].parts[payload.partId],
				'rating',
				payload.rating
			);
		}
	},
	actions: {
		loadUserData({ commit }, payload) {
			commit('setProcessing', true);
			let userDataRef = Vue.$db.collection('userData').doc(payload);
			userDataRef
				.get()
				.then(data => {
					let userData = data.exists ? data.data() : defaultUserData;

					if (!userData.books) {
						userData.books = {};
					}

					if (!userData.words) {
						userData.words = {};
					}

					commit('setUserData', userData);
					commit('setProcessing', false);
				})
				.catch(() => commit('setProcessing', false));
		},
		addUserBook({ commit, getters }, payload) {
			commit('setProcessing', true);
			let userDataRef = Vue.$db
				.collection('userData')
				.doc(getters.userId);
			let book = {
				addedDate: new Date(),
				parts: {}
			};

			userDataRef
				.set(
					{
						books: {
							[payload]: book
						}
					},
					{ merge: true }
				)
				.then(() => {
					commit('addUserBook', { bookId: payload, book: book });
					commit('setProcessing', false);
				});
		},
		addUserWord({ commit, getters }, payload) {
			commit('setProcessing', true);
			let userDataRef = Vue.$db
				.collection('userData')
				.doc(getters.userId);
			let word = {
				origText: payload.origText,
				transText: payload.transText,
				type: payload.type,
				addedDate: new Date(),
				bucket: 1,
				nextShowDate: new Date()
			};

			if (payload.origPrefix) word.origPrefix = payload.origPrefix;

			userDataRef
				.set(
					{
						words: {
							[payload.key]: word
						}
					},
					{ merge: true }
				)
				.then(() => {
					commit('addUserWord', { wordId: payload.key, word: word });
					commit('setProcessing', false);
				});
		},
		updateUserBookPartStats({ commit, getters }, payload) {
			let userDataRef = Vue.$db
				.collection('userData')
				.doc(getters.userId);
			let timestamp = new Date();

			if (!getters.userData.books[payload.bookId].parts[payload.partId]) {
				userDataRef
					.update({
						[`books.${payload.bookId}.parts.${payload.partId}.addedDate`]: timestamp
					})
					.then(() => {
						commit('addUserBookPart', {
							bookId: payload.bookId,
							partId: payload.partId,
							timestamp: timestamp
						});
					});
			}

			userDataRef
				.update({
					[`books.${payload.bookId}.parts.${payload.partId}.lastOpenedDate`]: timestamp
				})
				.then(() => {
					commit('updateUserBookPartLastOpenedDate', {
						bookId: payload.bookId,
						partId: payload.partId,
						timestamp: timestamp
					});
				});
		},
		finishUserBookPart({ commit, getters }, payload) {
			let userDataRef = Vue.$db
				.collection('userData')
				.doc(getters.userId);
			let timestamp = new Date();

			userDataRef
				.update({
					[`books.${payload.bookId}.parts.${payload.partId}.finishedDate`]: timestamp,
					[`books.${payload.bookId}.parts.${payload.partId}.rating`]: payload.rating
				})
				.then(() => {
					commit('updateUserBookPartFinishInfo', {
						bookId: payload.bookId,
						partId: payload.partId,
						timestamp: timestamp,
						rating: payload.rating
					});
				});
		}
	},
	getters: {
		userData: state => state.userData
	}
};
