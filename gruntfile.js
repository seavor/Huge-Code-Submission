module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.initConfig({

		compass: {
			dev: {
				options: {
					config: 'config.rb'
				}
			}
		},

		watch: {
			options: {livereload: true},

			scripts: {
				files: ['public/js/main.js'],
				tasks: []
			},
			sass: {
				files: ['components/sass/style.scss'],
				tasks: ['compass:dev']
			},
			html: {
				files: ['public/index.html', 'public/js/*.js', 'public/styles/*.css'],
				tasks: [ ]
			}
		}

	});

	grunt.registerTask('default', 'watch');
}