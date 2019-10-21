import * as firebase from 'firebase/app';

export default {
	state: {
		user: {
			isAuthenticated: false,
			uid: null
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user.isAuthenticated = true;
			state.user.uid = payload;
		},
		unsetUser(state) {
			state.user.isAuthenticated = false;
			state.user.uid = null;
		}
	},
	actions: {
		signUp({ commit }, payload) {
			commit('setProcessing', true);
			commit('clearError');
			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then(() => {
					commit('setProcessing', false);
				})
				.catch(function(error) {
					commit('setProcessing', false);
					commit('setError', error.message);
				});
		},
		signIn({ commit }, payload) {
			commit('setProcessing', true);
			commit('clearError');
			firebase
				.auth()
				.signInWithEmailAndPassword(payload.email, payload.password)
				.then(() => {
					commit('setProcessing', false);
				})
				.catch(function(error) {
					commit('setProcessing', false);
					commit('setError', error.message);
				});
		},
		stateChanged({ commit }, payload) {
			if (payload) {
				commit('setUser', payload.uid);
			} else {
				commit('unsetUser');
			}
		}
	},
	getters: {
		isUserAuthenticated: state => state.user.isAuthenticated
	}
};
