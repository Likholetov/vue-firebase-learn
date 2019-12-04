import * as firebase from 'firebase/app';
import router from '../router';
import { EventBus } from '../infrastructure/eventBus';
import { VMenu } from 'vuetify/lib';

export default {
	state: {
		user: {
			isAuthenticated: false,
			uid: null,
			email: null,
			name: null
		},
		unsubscribeAuth: null
	},
	mutations: {
		setUser(state, payload) {
			state.user.isAuthenticated = true;
			state.user.uid = payload.uid;
			state.user.email = payload.email;
		},
		setUserName(state, payload) {
			state.user.name = payload;
		},
		setUserEmail(state, payload) {
			state.user.email = payload;
		},
		unsetUser(state) {
			state.user.isAuthenticated = false;
			state.user.uid = null;
		},
		setUnsubscribedAuth(state, payload) {
			state.unsubscribeAuth = payload;
		}
	},
	actions: {
		initAuth({ commit, dispatch, state }, payload) {
			return new Promise((resolve, reject) => {
				if (state.unsubscribeAuth) state.unsubscribeAuth();

				let unsubscribe = firebase
					.auth()
					.onAuthStateChanged(function(user) {
						dispatch('stateChanged', user);

						resolve(user);
					});

				commit('setUnsubscribedAuth', unsubscribe);
			});
		},
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
				commit('setUser', { uid: payload.uid, email: payload.email });
				commit('setUserName', payload.displayName);
				dispatch('loadUserData', payload.uid);
			} else {
				commit('unsetUser');
			}
		},
		changeUserProfileData({ commit }, payload) {
			let user = firebase.auth().currentUser;
			let credential = firebase.auth.EmailAuthProvider.credential(
				payload.email,
				payload.password
			);

			commit('setProcessing', true);
			commit('clearError');

			user.reauthenticateAndRetrieveDataWithCredential(credential)
				.then(function() {
					let currentUser = firebase.auth().currentUser;

					if (payload.changeType == 'name') {
						currentUser
							.updateProfile({
								displayName: payload.newName
							})
							.then(() => {
								commit('setUserName', payload.newName);
								commit('setProcessing', false);
								EventBus.notify('user-profile-data-changed');
							})
							.catch(error => {
								commit('setProcessing', false);
								commit('setError', error.message);
							});
					}

					if (payload.changeType == 'email') {
						currentUser
							.updateEmail(payload.newEmail)
							.then(() => {
								commit('setUserEmail', payload.newEmail);
								commit('setProcessing', false);
								EventBus.notify('user-profile-data-changed');
							})
							.catch(error => {
								commit('setProcessing', false);
								commit('setError', error.message);
							});
					}

					if (payload.changeType == 'password') {
						currentUser
							.updatePassword(payload.newPassword)
							.then(() => {
								commit('setProcessing', false);
								EventBus.notify('user-profile-data-changed');
							})
							.catch(error => {
								commit('setProcessing', false);
								commit('setError', error.message);
							});
					}
				})
				.catch(error => {
					commit('setProcessing', false);
					commit('setError', error.message);
				});
		}
	},
	getters: {
		isUserAuthenticated: state => state.user.isAuthenticated,
		userId: state => state.user.uid,
		userName: state => state.user.name,
		userEmail: state => state.user.email
	}
};
