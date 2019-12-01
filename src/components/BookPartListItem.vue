<template>
	<div>
		<v-card color="accent" class="white--text">
			<v-card-title primary-title class="headline">{{
				part.title
			}}</v-card-title>
			<v-card-actions>
				<div v-if="finishedDate">
					<v-icon dark>check</v-icon>
					Завершена {{ finishedDate | formattedDate }}
				</div>
				<v-spacer></v-spacer>
				<v-btn
					tile
					class="primary"
					:to="{
						name: 'bookPart',
						params: { bookId: bookId, partId: part.id }
					}"
					v-if="isUserBookLoaded"
					>Открыть</v-btn
				>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		part: {
			type: Object,
			required: true
		},
		bookId: {
			required: true
		}
	},
	computed: {
		...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing']),
		isUserBookLoaded() {
			return (
				this.isUserAuthenticated &&
				!this.getProcessing &&
				!!this.userData.books[this.bookId]
			);
		},
		finishedDate() {
			if (!this.isUserBookLoaded) {
				return false;
			}

			let book = this.userData.books[this.bookId];

			if (book && book.parts[this.part.id]) {
				return book.parts[this.part.id].finishedDate;
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
