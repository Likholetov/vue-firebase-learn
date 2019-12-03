<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar color="primary" dark flat>
						<v-toolbar-title>Регистрация</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
					<v-card-text>
						<v-alert :value="error" type="error">
							{{ error }}
						</v-alert>
						<v-form
							ref="form"
							v-model="valid"
							:lazy-validation="lazy"
						>
							<v-text-field
								label="Имя"
								v-model.trim="name"
								:rules="nameRules"
								required
								prepend-icon="person"
								type="text"
							></v-text-field>

							<v-text-field
								label="Электронная почта"
								v-model.trim="email"
								:rules="emailRules"
								required
								prepend-icon="email"
								type="text"
							></v-text-field>

							<v-text-field
								id="password"
								label="Пароль"
								v-model="password"
								:rules="passwordRules"
								required
								prepend-icon="lock"
								type="password"
							></v-text-field>

							<v-text-field
								id="password"
								label="Повторите пароль"
								v-model="confirmPassword"
								:rules="[comparePasswords]"
								required
								prepend-icon="lock"
								type="password"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							@click.prevent="signup"
							:disabled="processing || !valid"
							>Зарегистрироваться</v-btn
						>
						<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		valid: false,
		name: '',
		nameRules: [
			v => !!v || 'Это поле обязательно для заполнения',
			v => /^[a-zA-Zа-яА-Я]/.test(v) || 'Имя должно начинаться с буквы',
			v =>
				/^[\wа-яА-Я]+$/.test(v) ||
				'В имени присутствуют недопустимые символы'
		],
		email: '',
		emailRules: [
			v => !!v || 'Это поле обязательно для заполнения',
			v =>
				/.+@.+\..+/.test(v) ||
				'Пожалуйста введите настоящий адрес электронной почты'
		],
		password: '',
		confirmPassword: '',
		passwordRules: [
			v => !!v || 'Это поле обязательно для заполнения',
			v =>
				(v && v.length >= 10) ||
				'Пароль должен быть не менее 10 символов'
		],
		lazy: false
	}),
	computed: {
		comparePasswords() {
			return this.password !== this.confirmPassword
				? 'Пароли не совпадают'
				: true;
		},
		error() {
			return this.$store.getters.getError;
		},
		processing() {
			return this.$store.getters.getProcessing;
		},
		isUserAuthenticated() {
			return this.$store.getters.isUserAuthenticated;
		}
	},
	watch: {
		isUserAuthenticated(val) {
			if (val === true) {
				this.$router.push('/');
			}
		}
	},
	methods: {
		signup() {
			this.$store.dispatch('signUp', {
				email: this.email,
				password: this.password,
				name: this.name
			});
		}
	}
};
</script>
