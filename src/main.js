import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import VueYouTubeEmbed from 'vue-youtube-embed';
import firebaseConfig from './config/firebase.js';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App),
	created() {
		firebase.auth().onAuthStateChanged(user => {
			this.$store.dispatch('stateChanged', user);
		});
	}
}).$mount('#app');
