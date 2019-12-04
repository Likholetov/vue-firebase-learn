<template>
	<div>
		<v-card v-if="currentWord" class="mt-2">
			<v-card-title>
				<div class="headline">
					<original-word
						:word="currentWord"
						:size="40"
						:showAudio="true"
					></original-word>
				</div>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="headline" v-if="currentWord.showTrans">
				{{ currentWord.transText }}
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					class="mr-3"
					small
					color="primary"
					@click="currentWord.showTrans = true"
					v-if="!currentWord.showTrans"
				>
					<v-icon class="mr-2">visibility</v-icon>Показать
					перевод</v-btn
				>
				<v-btn
					small
					color="error"
					@click="noProcessWord(currentWord)"
					v-if="currentWord.showTrans"
				>
					<v-icon class="mr-2">error</v-icon>Я не запомнил это
					слово</v-btn
				>
				<v-btn
					small
					color="success"
					@click="processWord(currentWord)"
					v-if="!currentWord.showTrans"
				>
					<v-icon class="mr-2">check</v-icon>Я запомнил это
					слово</v-btn
				>
			</v-card-actions>
		</v-card>
		<v-card>
			<v-card-title class="headline" v-if="words.length">
				<span>Все слова на сегодня ({{ words.length }})</span>
			</v-card-title>
			<v-card-title v-else>
				<span
					>Нет слов для изучения, добавляйте новые слова из книг</span
				>
			</v-card-title>
			<v-card-text v-if="words.length">
				<v-list>
					<div v-for="(word, index) in words" :key="index">
						<v-list-item @click="selectWord(word)">
							<div class="title pa-1">
								<original-word
									:word="word"
									:size="40"
								></original-word>
							</div>
						</v-list-item>
					</div>
				</v-list>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import OriginalWord from './OriginalWord';

export default {
	components: {
		OriginalWord
	},
	data() {
		return {
			words: [],
			currentWord: null
		};
	},
	methods: {
		processWord(word) {
			this.$store.dispatch('processUserWord', word.key);
		},
		noProcessWord(word) {
			this.$store.dispatch('noProcessUserWord', word.key);
		},
		selectWord(word) {
			word.showTrans = false;
			this.currentWord = word;
		},
		setWords() {
			this.words = [];
			let userWords = this.$store.getters.userData.words;

			for (let property in userWords) {
				if (userWords.hasOwnProperty(property)) {
					let word = userWords[property];

					let isAvailable =
						word.nextShowDate instanceof Date
							? word.nextShowDate <= new Date()
							: word.nextShowDate.toDate() <= new Date();

					if (isAvailable) {
						this.words.push({
							origText: word.origText,
							transText: word.transText,
							origPrefix: word.origPrefix,
							key: property,
							type: word.type,
							showTrans: false
						});
					}
				}
			}

			this.currentWord = this.words.length > 0 ? this.words[0] : null;
		}
	},
	mounted() {
		this.$bus.$on('userword:updated', () => {
			this.setWords();
		});
		this.setWords();
	},
	beforeDestroy() {
		this.$bus.$off('userword:updated');
	}
};
</script>

<style lang="scss" scoped></style>
