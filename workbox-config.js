module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,html,json,txt}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};