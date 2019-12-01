<template>
	<v-card class="pa-2">
		<div>
			<div class="display-1">{{ part.bookTitle }}</div>
			<div class="headline">{{ part.partTitle }}</div>
			<v-divider class="black"></v-divider>
		</div>
		<div class="text-center mt-2 mb-2 primary">
			<youtube
				:video-id="part.youtubeId"
				:player-width="playerWidth"
			></youtube>
		</div>
		<div class="mt-2">
			<v-tabs v-model="tabMode" fixed-tabs>
				<v-tab :key="'english'" ripple>Текст с подсказками</v-tab>
				<v-tab :key="'sidebyside'" ripple>Параллельно</v-tab>
				<v-tab-item :key="'english'"
					><div
						v-for="(paragraph, i) in part.content"
						:key="`par1${i}`"
					>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span
							v-for="(sentence, y) in paragraph.sentences"
							:key="`par1${i}sen1${y}`"
						>
							<span>{{ sentence.originText }}</span>
							<v-icon size="18" @click="toggleVisibility(i, y)"
								>help</v-icon
							>
							<span
								class="success--text"
								style="font-weight: bold;"
								v-if="getVisibility(i, y).value"
								>{{ sentence.transText }}</span
							>
						</span>
					</div></v-tab-item
				>
				<v-tab-item :key="'sidebyside'">
					<v-container>
						<v-layout
							row
							wrap
							v-for="(paragraph, i) in part.content"
							:key="`par2${i}`"
						>
							<v-flex xs6>
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span
									v-for="(sentence, y) in paragraph.sentences"
									:key="`par2${i}sen2${y}_orig`"
								>
									<span>{{ sentence.originText }}</span>
								</span>
							</v-flex>
							<v-flex xs6>
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span
									v-for="(sentence, y) in paragraph.sentences"
									:key="`par2${i}sen2${y}_trans`"
								>
									<span>{{ sentence.transText }}</span>
								</span>
							</v-flex>
						</v-layout>
					</v-container>
				</v-tab-item>
			</v-tabs>
		</div>
	</v-card>
</template>

<script>
export default {
	props: {
		part: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			tabMode: null,
			visibilityKeys: []
		};
	},
	computed: {
		playerWidth() {
			switch (this.$vuetify.breakpoint.name) {
				case 'xs':
					return '220px';
				case 'sm':
					return '400px';
				case 'md':
					return '500px';
				case 'lg':
					return '600px';
				case 'xl':
					return '800px';
			}
		}
	},
	methods: {
		getVisibility(i, y) {
			return this.visibilityKeys.find(k => k.key == `${i}${y}`);
		},
		toggleVisibility(i, y) {
			let flag = this.getVisibility(i, y);
			flag.value = !flag.value;
		}
	},
	created() {
		for (let i = 0; i < this.part.content.length; i++) {
			for (let j = 0; j < this.part.content[i].sentences.length; j++) {
				this.visibilityKeys.push({
					key: `${i}${j}`,
					value: false
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
