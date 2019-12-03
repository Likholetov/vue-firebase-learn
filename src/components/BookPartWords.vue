<template>
	<v-container fluid>
		<span class="display-1">Слова:</span>
		<v-data-iterator
			:items="words"
			:items-per-page.sync="itemsPerPage"
			:footer-props="{ itemsPerPageOptions }"
			hide-default-footer
		>
			<template v-slot:default="props">
				<v-row>
					<v-col
						v-for="item in props.items"
						:key="item.name"
						cols="12"
						sm="6"
						md="6"
						lg="4"
					>
						<v-card>
							<v-card-title>
								<v-avatar
									v-if="item.type == 1"
									color="teal"
									size="40"
									class="mr-2"
								>
									<span class="white--text">W</span>
								</v-avatar>
								<v-avatar
									v-if="item.type == 2"
									color="indigo"
									size="40"
									class="mr-2"
								>
									<span class="white--text">PH</span>
								</v-avatar>
								{{ getFullOriginalWord(item) }}</v-card-title
							>
							<v-divider></v-divider>
							<v-card-text>
								{{ item.transText }}
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="primary"
									fab
									@click="addWord(item)"
									><v-icon>add</v-icon></v-btn
								>
								<v-snackbar
									v-model="snackbar"
									bottom
									light
									color="warning"
									><span
										><v-icon class="mr-5">warning</v-icon
										>{{ snackbarText }}</span
									>
								</v-snackbar>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
import { getFullOriginalWord } from '../helpers/words';

export default {
	props: {
		data: {
			type: Object,
			default: null
		}
	},
	computed: {
		itemsPerPage() {
			return this.words.length;
		},
		words() {
			if (!this.data) return [];

			let words = [];

			for (let property in this.data) {
				if (this.data.hasOwnProperty(property)) {
					let word = this.data[property];
					word.key = property;
					words.push(word);
				}
			}

			return words;
		}
	},
	data() {
		return {
			itemsPerPageOptions: [],
			snackbar: false,
			snackbarText: null
		};
	},
	methods: {
		getFullOriginalWord: getFullOriginalWord,
		addWord(entity) {
			let userWords = this.$store.getters.userData.words;
			let wordAdded = userWords[entity.key];
			if (wordAdded) {
				this.snackbar = true;
				this.snackbarText = 'Вы уже добавили это слово!';
			} else {
				this.$store.dispatch('addUserWord', entity);
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
