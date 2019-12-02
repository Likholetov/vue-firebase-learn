import * as firebase from 'firebase/app';

export default {
	state: {
		user: {
			isAuthenticated: false,
			uid: null,
			name: null
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user.isAuthenticated = true;
			state.user.uid = payload;
		},
		setUserName(state, payload) {
			state.user.name = payload;
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
					firebase
						.auth()
						.currentUser.updateProfile({
							displayName: payload.name
						})
						.then(() => commit('setUserName', payload.name));
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
		signOut() {
			firebase.auth().signOut();
		},
		stateChanged({ commit, dispatch }, payload) {
			if (payload) {
				commit('setUser', payload.uid);
				dispatch('loadUserData', payload.uid);
			} else {
				commit('unsetUser');
			}
		}
	},
	getters: {
		isUserAuthenticated: state => state.user.isAuthenticated,
		userId: state => state.user.uid
	}
};
