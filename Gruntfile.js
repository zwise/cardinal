'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		jshint: {
			all: ['*.js', 'js/**/*.js', '!js/vendor/**', '!Gruntfile.js', '!node_modules'],
			options: {
				browser: true
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'sass/',
					cssDir: 'css/',
					imagesDir: 'img/',
					relativeAssets: true,
					outputStyle: 'expanded'
				}
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['css/**/*.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['css/**/*.css']
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'css/',
				src: ['*.css', '!*.min.css'],
				dest: './',
				ext: '.min.css'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			}
		},
		watch: {
			js: {
				files: '<%= lint.all %>',
				tasks: 'lint'
			},
			sass: {
				files: '<%= _.flatten(sass.compile.files) %>',
				tasks: 'sass'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Define Tasks
	grunt.registerTask('default', ['jshint', 'compass']);
	grunt.registerTask('build', ['default', 'cssmin', 'uglify']);
};