export default {
	state: {
		books: [
			{
				id: 'kjgkgkgkgjkgkhg',
				title: 'Harry Potter - 1',
				description: 'First chapter',
				imageId: 'hhhhh',
				level: ['B2', 'C1'],
				rating: 4,
				ratingsCount: 100,
				youtubePlaylistId: 'kjkghkgkg',
				parts: [
					{
						id: 'ghfgfhfjfjk',
						title: 'part 1',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjq',
						title: 'part 2',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjw',
						title: 'part 3',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfje',
						title: 'part 4',
						youtube_id: 'dfhghdfjjkllj'
					}
				]
			},
			{
				id: 'kjgkgkgkgjklllgkhg',
				title: 'Harry Potter - 2',
				description: 'Second chapter',
				imageId: 'hhkhh',
				level: ['B1', 'B2'],
				rating: 3.5,
				ratingsCount: 50,
				youtubePlaylistId: 'kjkghkgkg',
				parts: [
					{
						id: 'ghfgfhfjfjk',
						title: 'part 1',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjq',
						title: 'part 2',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjw',
						title: 'part 3',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfje',
						title: 'part 4',
						youtube_id: 'dfhghdfjjkllj'
					}
				]
			},
			{
				id: 'kjgkgkgkgjklllgkhgff',
				title: 'Harry Potter - 3',
				description: 'Third chapter',
				imageId: 'hhnhh',
				level: ['B1', 'B2'],
				rating: 3.5,
				ratingsCount: 50,
				youtubePlaylistId: 'kjkghkgkg',
				parts: [
					{
						id: 'ghfgfhfjfjk',
						title: 'part 1',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjq',
						title: 'part 2',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfjw',
						title: 'part 3',
						youtube_id: 'dfhghdfjjkllj'
					},
					{
						id: 'ghfgfhfjfje',
						title: 'part 4',
						youtube_id: 'dfhghdfjjkllj'
					}
				]
			}
		],

		bookParts: [
			{
				bookId: 'kjgkgkgkgjkgkhg',
				bookPartId: 'ghfgfhfjfjk',
				bookTitle: 'Harry Potter - 1',
				partTitle: 'part 1',
				youtubeId: 'Wx_r_wap-Jg',
				content: [
					{
						sentences: [
							{
								originText: 'originText',
								transText: 'transText'
							},
							{
								originText: 'originText',
								transText: 'transText'
							},
							{
								originText: 'originText',
								transText: 'transText'
							}
						]
					},
					{
						sentences: [
							{
								originText: 'originText',
								transText: 'transText'
							},
							{
								originText: 'originText',
								transText: 'transText'
							},
							{
								originText: 'originText',
								transText: 'transText'
							}
						]
					}
				],
				words: [
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					},
					{
						origWord: 'Hi',
						transWord: 'Привет'
					}
				]
			}
		]
	},
	mutations: {
		setBooks(state, payload) {
			state.books = payload;
		}
	},
	getters: {
		getBooks: state => state.books,
		getParts: state => state.bookParts
	}
};
