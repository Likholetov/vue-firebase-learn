<template>
	<v-card color="info" class="white--text">
		<v-container fluid>
			<v-layout row>
				<v-flex xs4 md3>
					<v-img height="150px" :src="book.imageUrl"></v-img>
					<div class="text-center">
						<v-btn text tile color="white">
							<v-icon left>visibility</v-icon> YouTube
						</v-btn>
					</div>
				</v-flex>
				<v-flex xs8 md9>
					<v-card-title>
						<div>
							<div>
								{{ book.title }}
							</div>
						</div>
					</v-card-title>
					<v-card-text>
						<div class="white--text">
							{{ book.description }}
						</div>
						<v-divider class="white"></v-divider>
						<div class="white--text">
							Уровень:
							{{ getBookLevel(book.level) }},
							{{ book.parts.length }} частей
						</div>
					</v-card-text>
					<v-card-actions>
						<v-flex row>
							<!-- <v-rating
								v-model="book.rating"
								color="yellow"
								readonly
								dense
								half-increments
							></v-rating>
							<div class="ml-1">
								<span>{{ book.rating }}</span>
								<span>({{ book.ratingsCount }})</span>
							</div> -->
							<v-spacer></v-spacer>
							<v-btn
								class="primary"
								text
								tile
								v-if="canLoadBook(book.id)"
								@click="loadBook(book.id)"
								>Загрузить</v-btn
							>
							<div v-if="getUserDataBook(book.id)">
								<v-icon color="white">work_outline</v-icon>
								Книга скачана
								{{ getBookAddedDate(book.id) | formattedDate }}
							</div>
						</v-flex>
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-container>
	</v-card>
</template>

<script>
import * as bookHelper from '../helpers/book';
import { mapGetters } from 'vuex';

export default {
	props: {
		book: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing'])
	},
	methods: {
		getBookLevel: bookHelper.getBookLevel,
		canLoadBook(bookId) {
			let book = this.getUserDataBook(bookId);
			return this.isUserAuthenticated && !this.getProcessing && !book;
		},
		getUserDataBook(bookId) {
			return this.userData.books[bookId];
		},
		loadBook(bookId) {
			this.$store.dispatch('addUserBook', bookId);
		},
		getBookAddedDate(bookId) {
			let book = this.getUserDataBook(bookId);
			return book.addedDate;
		}
	}
};
</script>

<style lang="scss" scoped></style>
