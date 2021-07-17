const constants = require('./lib/constants');

module.exports = function (grunt) {
	grunt.initConfig({
		responsive_images: {
			dev: {
				options: {
					engine: 'gm',
					concurrency: 3,
					newFilesOnly: true,
					separator: '_',
					sizes: constants.imgSizes,
				},
				files: [
					{
						expand: true,
						src: ['**/*.{jpg,jpeg,png}'],
						cwd: 'public/originalImages',
						dest: 'public/img/posts/kerguelen',
					},
				],
			},
		},
		cwebp: {
			dynamic: {
				options: { q: 60 },
				files: [
					{
						expand: true,
						cwd: 'public/img/posts/kerguelen/',
						src: ['**/*.{jpg,png}'],
						dest: 'public/img/posts/kerguelen/',
					},
				],
			},
		},
	});

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-cwebp');
	grunt.registerTask('default', ['responsive_images', 'cwebp']);
};
