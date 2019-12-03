<template>
	<v-container grid-list-md v-if="part">
		<v-layout row wrap>
			<v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
				<v-card>
					<v-card-title primary-title>
						<div class="headline">
							Я закончил читать эту часть
							{{ finishedDate | formattedDate }}
						</div>
					</v-card-title>
					<v-card-text>
						<span>Моя оценка</span>
						<v-rating
							v-model="savedRating"
							color="success"
							half-increments
							readonly
							large
						></v-rating>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs12 sm10 offset-sm1>
				<book-part-content :part="part"></book-part-content>
			</v-flex>
			<v-flex xs12 sm10 offset-sm1>
				<book-part-words :words="part.words"></book-part-words>
			</v-flex>
			<v-flex xs12 sm10 offset-sm1 class="text-center">
				<v-dialog v-model="finishDialog" persistent max-width="600px">
					<v-btn
						slot="activator"
						color="success"
						tile
						@click="finishDialog = true"
						v-if="!finishedDate"
					>
						<v-icon>check</v-icon>
						Завершить урок
					</v-btn>
					<v-card>
						<v-card-title primary-title>
							<div class="headline">
								Я закончил читать эту часть!
							</div>
						</v-card-title>
						<v-card-text>
							<span>Моя оценка</span>
							<v-rating
								v-model="rating"
								color="success"
								half-increments
								large
							></v-rating>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="primary"
								tile
								@click.native="finishDialog = false"
							>
								<v-icon>close</v-icon> Закрыть
							</v-btn>
							<v-btn
								color="success"
								tile
								@click.native="finishWork"
							>
								<v-icon>check</v-icon> Ок
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import Vue from 'vue';
import BookPartContent from '../components/BookPartContent';
import BookPartWords from '../components/BookPartWords';

export default {
	components: {
		BookPartContent,
		BookPartWords
	},
	props: {
		bookId: {
			type: String,
			required: true
		},
		partId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			part: null,
			finishDialog: false,
			rating: 0
		};
	},
	computed: {
		finishedDate() {
			if (
				this.$store.getters.userData.books[this.bookId].parts[
					this.partId
				]
			) {
				return this.$store.getters.userData.books[this.bookId].parts[
					this.partId
				].finishedDate;
			}
		},
		savedRating() {
			if (
				this.$store.getters.userData.books[this.bookId].parts[
					this.partId
				]
			) {
				return this.$store.getters.userData.books[this.bookId].parts[
					this.partId
				].rating;
			}
		}
	},
	methods: {
		finishWork() {
			this.$store.dispatch('finishUserBookPart', {
				bookId: this.bookId,
				partId: this.partId,
				rating: this.rating
			});
			this.finishDialog = false;
		}
	},
	created() {
		Vue.$db
			.collection('bookParts')
			.where('bookId', '==', this.bookId)
			.where('bookPartId', '==', this.partId)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(s => {
					this.part = s.data();
				});
			})
			.then(() => {
				this.$store.dispatch('updateUserBookPartStats', {
					bookId: this.bookId,
					partId: this.partId
				});
			})
			.catch(error => console.log(error));
	}
};
</script>

<style lang="scss" scoped></style>
