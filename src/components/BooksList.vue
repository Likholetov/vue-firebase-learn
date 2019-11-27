<template>
	<v-container grid-list-md>
		<v-layout row wrap>
			<v-flex
				v-for="book in books"
				:key="book.id"
				xs12
				sm10
				md8
				offset-sm-1
				offset-md-2
			>
				<v-card color="info" class="white--text">
					<v-container fluid>
						<v-layout row>
							<v-flex xs4 md3>
								<v-img
									height="100px"
									src="https://i2.rozetka.ua/goods/11346973/76109916_images_11346973164.jpg"
								></v-img>
								<div class="text-xs-center">
									<v-btn flat color="white">
										<v-icon left>visibility</v-icon> YouTube
									</v-btn>
								</div>
							</v-flex>
							<v-flex xs8 md9>
								<v-card-title>
									<div>
										<div class="headline">
											{{ book.title }}
										</div>
										<div>{{ book.description }}</div>
										<v-divider class="white"></v-divider>
										<div>
											Уровень:
											{{ getBookLevel(book.level) }},
											{{ book.parts }} частей
										</div>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-rating
										v-model="book.rating"
										color="yellow"
										readonly
										dense
										half-increments
									></v-rating>
									<div class="ml-1">
										<span>{{ book.rating }}</span>
										<span>({{ book.ratingsCount }})</span>
									</div>
									<v-spacer></v-spacer>
									<v-btn class="primary" flat>Открыть</v-btn>
								</v-card-actions>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	computed: {
		books() {
			return this.$store.getters.getBooks;
		}
	},
	methods: {
		getBookLevel(level) {
			return level.join('/');
		}
	}
};
</script>

<style lang="scss" scoped></style>
