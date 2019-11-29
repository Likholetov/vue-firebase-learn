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
						md="4"
						lg="3"
					>
						<v-card>
							<v-card-title>{{ item.origWord }}</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								{{ item.transWord }}
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" fab
									><v-icon>add</v-icon></v-btn
								>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
export default {
	props: {
		words: {
			type: Array,
			required: true
		}
	},
	computed: {
		itemsPerPage() {
			return this.words.length;
		}
	},
	data() {
		return {
			itemsPerPageOptions: []
		};
	}
};
</script>

<style lang="scss" scoped></style>
