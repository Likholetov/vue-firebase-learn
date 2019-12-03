<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title>
				<div>
					<h3><v-icon class="mr-2">person</v-icon>{{ userName }}</h3>
					<h3><v-icon class="mr-2">email</v-icon>{{ userEmail }}</h3>
				</div>
			</v-card-title>

			<v-card-actions>
				<v-dialog v-model="dialog" persistent max-width="500">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on" text>
							Изменить мои данные
						</v-btn>
					</template>
					<v-card>
						<v-alert :value="getError" type="error">
							{{ getError }}
						</v-alert>
						<v-card-title class="headline"
							>Изменить мои данные?</v-card-title
						>
						<v-card-text>
							<v-form
								ref="form"
								v-model="valid"
								:lazy-validation="lazy"
							>
								<v-text-field
									label="Электронная почта"
									v-model.trim="email"
									:rules="emailRules"
									required
									prepend-icon="person"
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

								<h3>Я хочу изменить</h3>
								<v-radio-group v-model="changeType">
									<v-radio
										label="Имя"
										:value="'name'"
									></v-radio>
									<v-radio
										label="Электронный адрес"
										:value="'email'"
									></v-radio>
									<v-radio
										label="Пароль"
										:value="'password'"
									></v-radio>
								</v-radio-group>

								<v-text-field
									label="Имя"
									v-model.trim="newname"
									:rules="nameRules"
									required
									prepend-icon="person"
									type="text"
									v-if="changeType == 'name'"
								></v-text-field>

								<v-text-field
									label="Электронная почта"
									v-model.trim="newemail"
									:rules="emailRules"
									required
									prepend-icon="email"
									type="text"
									v-if="changeType == 'email'"
								></v-text-field>

								<v-text-field
									id="password"
									label="Пароль"
									v-model="newpassword"
									:rules="passwordRules"
									required
									prepend-icon="lock"
									type="password"
									v-if="changeType == 'password'"
								></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="dialog = false"
								>Отмена</v-btn
							>
							<v-btn
								color="primary"
								:disabled="getProcessing || !valid"
								@click.prevent="changeUserData"
								>Изменить</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			dialog: false,
			valid: false,
			email: '',
			emailRules: [
				v => !!v || 'Это поле обязательно для заполнения',
				v =>
					/.+@.+\..+/.test(v) ||
					'Пожалуйста введите настоящий адрес электронной почты'
			],
			password: '',
			passwordRules: [v => !!v || 'Это поле обязательно для заполнения'],
			name: '',
			nameRules: [
				v => !!v || 'Это поле обязательно для заполнения',
				v =>
					/^[a-zA-Zа-яА-Я]/.test(v) ||
					'Имя должно начинаться с буквы',
				v =>
					/^[\wа-яА-Я]+$/.test(v) ||
					'В имени присутствуют недопустимые символы'
			],
			lazy: false,
			newname: null,
			newemail: null,
			newpassword: null,
			changeType: 'name'
		};
	},
	computed: {
		...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError'])
	},
	methods: {
		changeUserData() {
			this.$store.dispatch('changeUserProfileData', {
				email: this.email,
				password: this.password,
				newName: this.newname,
				newEmail: this.newemail,
				newPassword: this.newpassword,
				changeType: this.changeType
			});
		}
	},
	created() {
		this.$bus.$on('user-profile-data-changed', () => {
			this.dialog = false;
		});
	},
	beforeDestroy() {
		this.$bus.$off('user-profile-data-changed');
	}
};
</script>

<style lang="scss" scoped></style>
