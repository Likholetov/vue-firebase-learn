<template>
	<v-card color="info" class="white--text">
		<v-container fluid>
			<v-layout row>
				<v-flex xs4 md3>
					<v-img height="100px" :src="book.imageUrl"></v-img>
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
								:to="{ name: 'book', params: { id: book.id } }"
								>Открыть</v-btn
							>
						</v-flex>
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-container>
	</v-card>
</template>

<script>
import * as bookHelper from '../helpers/book';
export default {
	props: {
		book: {
			type: Object,
			required: true
		}
	},
	methods: {
		getBookLevel: bookHelper.getBookLevel
	}
};
</script>

<style lang="scss" scoped></style>
