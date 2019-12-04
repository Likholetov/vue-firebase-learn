<template>
	<v-container grid-list-md>
		<v-layout row wrap>
			<v-flex xs12 sm10 offset-sm1>
				<v-tabs v-model="tabMode" fixed-tabs>
					<v-tab :key="'data'" ripple>Мои данные</v-tab>
					<v-tab :key="'books'" ripple>Мои книги</v-tab>
					<v-tab :key="'words'" ripple>Мои слова</v-tab>
					<v-tab-item :key="'mydata'">
						<user-profile-data></user-profile-data>
					</v-tab-item>
					<v-tab-item :key="'books'"
						><BooksList :onlyMy="true"
					/></v-tab-item>
					<v-tab-item :key="'words'">
						<user-profile-words></user-profile-words>
					</v-tab-item>
				</v-tabs>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import UserProfileData from '../components/UserProfileData';
import UserProfileWords from '../components/UserProfileWords';
import BooksList from '../components/BooksList';

export default {
	components: {
		UserProfileData,
		UserProfileWords,
		BooksList
	},
	data() {
		return {
			tabMode: null
		};
	}
};
</script>

<style lang="scss" scoped></style>
