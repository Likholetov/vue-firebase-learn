<template>
	<div>
		<v-avatar v-if="word.type == 1" color="teal" :size="size" class="mr-2">
			<span class="white--text">W</span>
		</v-avatar>
		<v-avatar
			v-if="word.type == 2"
			color="indigo"
			:size="size"
			class="mr-2"
		>
			<span class="white--text">PH</span>
		</v-avatar>
		{{ getFullOriginalWord(word) }}
		<v-icon class="ml-2" v-if="canPronounceWord" @click="pronounce(word)"
			>music_note</v-icon
		>
	</div>
</template>

<script>
import { getFullOriginalWord } from '../helpers/words';

export default {
	props: {
		word: Object,
		size: Number,
		showAudio: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			canPronounceWord: false,
			voice: null
		};
	},
	methods: {
		getFullOriginalWord: getFullOriginalWord,
		pronounce(word) {
			let msg = new SpeechSynthesisUtterance();
			msg.voice = this.voice;
			msg.rate = 1;
			msg.pitch = 1;
			msg.volume = 1;
			msg.text = this.getFullOriginalWord(word);

			speechSynthesis.speak(msg);
		}
	},
	created() {
		if (this.showAudio) {
			if ('speechSynthesis' in window) {
				let englishVoices = speechSynthesis
					.getVoices()
					.filter(v => v.name.toLowerCase().indexOf('english') >= 1);
				if (englishVoices.length) {
					this.canPronounceWord = true;
					this.voice = englishVoices[0];
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
