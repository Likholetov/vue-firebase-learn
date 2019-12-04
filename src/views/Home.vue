<template>
	<div>
		<section>
			<v-parallax
				src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/hero.jpeg"
				height="600"
			>
				<v-layout
					column
					align-center
					justify-center
					class="white--text"
				>
					<img
						src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/vuetify.png"
						alt="Vuetify.js"
						height="200"
					/>
					<h1 class="white--text mb-2 display-1 text-center">
						Учите английский эффективно
					</h1>
					<div class="subheading mb-4 text-center">
						Делайте то, что интересно, получайте то, что нужно
					</div>
					<v-btn
						class="mt-12"
						color="primary"
						dark
						large
						@click="booksUrl()"
					>
						Начать
					</v-btn>
				</v-layout>
			</v-parallax>
		</section>

		<section>
			<v-layout column wrap class="my-12" align-center>
				<v-flex xs12 sm4 class="my-4">
					<div class="text-center">
						<h2 class="headline">
							Лучший способ выучить английский
						</h2>
						<span class="subheading">
							Легко и быстро
						</span>
					</div>
				</v-flex>
				<v-flex xs12>
					<v-container grid-list-xl>
						<v-layout row wrap align-center>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon
											x-large
											class="blue--text text--lighten-2"
											>mdi-palette</v-icon
										>
									</v-card-text>
									<v-card-title
										primary-title
										class="layout justify-center"
									>
										<div class="headline text-center">
											Увлекательные книги
										</div>
									</v-card-title>
									<v-card-text>
										Читайте свои любимые книги в оригинале.
										Узнайте, что скрыли от вас переводчики.
										Прокачайте знание английского, занимаясь
										в игровой форме. Расширьте словарный
										запас, научитесь понимать на слух, и вам
										больше не придется ждать перевода.
									</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon
											x-large
											class="blue--text text--lighten-2"
											>mdi-flash</v-icon
										>
									</v-card-text>
									<v-card-title
										primary-title
										class="layout justify-center"
									>
										<div class="headline">
											Быстро
										</div>
									</v-card-title>
									<v-card-text>
										Освойте английский язык по системе
										Себастьяна Лейтнера. Эта система —
										простое, но крайне эффективное
										применение принципа интервальных
										повторений, где карточки повторяются
										через увеличивающиеся интервалы.
									</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon
											x-large
											class="blue--text text--lighten-2"
											>event</v-icon
										>
									</v-card-text>
									<v-card-title
										primary-title
										class="layout justify-center"
									>
										<div class="headline text-center">
											Обновления
										</div>
									</v-card-title>
									<v-card-text>
										Заходите каждый день, повторяйте слова и
										следите за обновлениями. Новые книги -
										новые слова, новые слова - новые знания,
										а знания - это сила. Поразите друзей
										своей начитанностью и великолепным
										владением английским.
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>
		</section>

		<section v-if="books.length">
			<v-container grid-list-xl>
				<v-layout row wrap justify-center class="my-2">
					<v-flex xs12 sm8>
						<v-card class="elevation-0 transparent">
							<v-card-title
								primary-title
								class="layout justify-center"
							>
								<div class="headline mb-3">Случайные книги</div>
							</v-card-title>
							<v-card-text class="layout justify-center">
								<v-carousel xs12 md4>
									<v-carousel-item
										v-for="(book, i) in books"
										:key="i"
										:src="book.imageUrl"
										@click="goToBook(book.id)"
										style="cursor: pointer;"
									>
										<div class="bookTitle">
											{{ book.title }}
										</div>
									</v-carousel-item>
								</v-carousel>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</section>

		<!-- <section>
			<v-parallax
				src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/section.jpg"
				height="380"
			>
				<v-layout column align-center justify-center>
					<div class="headline white--text mb-4 text-center">
						Web development has never been easier
					</div>
					<em>Kick-start your application today</em>
					<v-btn
						class="mt-12"
						color="blue lighten-2"
						dark
						large
						href="/pre-made-themes"
					>
						Get Started
					</v-btn>
				</v-layout>
			</v-parallax>
		</section> -->

		<section>
			<v-container grid-list-xl>
				<v-layout row wrap justify-center class="my-12">
					<v-flex xs12 sm4>
						<v-card flat class="transparent">
							<v-card-title
								primary-title
								class="layout justify-center"
							>
								<div class="headline">О нас</div>
							</v-card-title>
							<v-card-text>
								VueLearn был создан в качестве дипломной работы.
								Цель данного проекта: продемонстрировать
								эффективность взаимодействия передовых
								технологий и проверенных временем методов для
								достижения лучших результатов.
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4 offset-sm1>
						<v-card flat class="transparent">
							<v-card-title
								primary-title
								class="layout justify-center"
							>
								<div class="headline">Контакты</div>
							</v-card-title>
							<v-card-text>
								<div class="mb-5">
									Мы открыты для предложений! Позвони и узнай,
									как ты можешь помочь проекту VueLearn!
								</div>
								<div class="mb-3">
									<v-icon
										class="blue--text text--lighten-2 mr-3"
										>mdi-phone</v-icon
									>+38 071 123-45-67
								</div>
								<div class="mb-3">
									<v-icon
										class="blue--text text--lighten-2 mr-3"
										>mdi-map-marker</v-icon
									>Донецк, ДНР
								</div>
								<div>
									<v-icon
										class="blue--text text--lighten-2 mr-3"
										>mdi-email</v-icon
									>vuelearn@gmail.com
								</div>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</section>
	</div>
</template>

<script>
export default {
	components: {},
	computed: {
		books() {
			let books = this.$store.getters.getBooks;
			if (!books) {
				return [];
			}

			const shuffled = books.sort(() => 0.5 - Math.random());
			let result = [];
			if (shuffled.length < 5) {
				result = shuffled;
			} else {
				result = shuffled.slice(0, 5);
			}

			return result;
		}
	},
	methods: {
		booksUrl() {
			this.$router.push({ name: 'books' });
		},
		goToBook(id) {
			this.$router.push({ name: 'book', params: { id: id } });
		}
	}
};
</script>

<style scoped>
.bookTitle {
	position: absolute;
	color: white;
	font-size: 2em;
	padding: 15px;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	text-align: center;
}
</style>
