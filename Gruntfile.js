/*
 *
 * Copyright (c) 2013 Benoit Chesneau <benoitc@refuge.io>
 * Copyright (c) 2013 Nicolas Dufour  <nicolas.dufour@nemoworld.info>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */


var srcFiles = [
	"src/util.js", "src/base58.js", "src/session.js"
];

var fileHeader = '// <%= pkg.name %>.<%= pkg.release %> - ' +
  '<%= grunt.template.today("isoDateTime") %>\n';

/*global module, require*/
	module.exports = function (grunt) {
		'use strict';

		// Project configuration.
		grunt.initConfig({
			pkg  : grunt.file.readJSON("package.json"),

			'clean': {
				build : ["./dist"]
			},

			watch: {
				scripts: {
					files: '**/*.js',
					tasks: ['jshint'],
					options: {
							interrupt: true,
					},
				},
			},

			'concat': {
				all: {
					src: grunt.util._.flatten([
								 "src/deps/crypto-js/crypto.js", "src/deps/crypto-js/ripemd160.js",
								 "src/deps/js-nacl/lib/nacl.js", "src/deps/js-scrypt/browser/scrypt.js",
								 "src/deps/jsbn/jsbn.js", "src/deps/jsbn/jsbn2.js", "src/deps/polyfill.js",
								 "src/deps/ajax.js", srcFiles
								 ]),
					dest: 'dist/rtalk-nightly.js'
				},
			},

			'uglify': {
				options: {
					banner: fileHeader
				},
				dist: {
					src: "./dist/rtalk-nightly.js",
					dest: 'dist/rtalk-nightly.min.js'
				},
			},

			'jasmine': {
				// Your project's source files
				src : 'src/**/*.js',
				// Your Jasmine spec files
				specs : 'specs/**/*spec.js',
				// Your spec helper files
				helpers : 'specs/helpers/*.js'
			},

			jshint: {
				files: [
					'src/*.js',
				],
			},
		});

			// load dependencies
			grunt.loadTasks('tasks');
			grunt.loadNpmTasks('grunt-contrib-jasmine');
			grunt.loadNpmTasks('grunt-contrib-concat');
			grunt.loadNpmTasks('grunt-contrib-uglify');
			grunt.loadNpmTasks('grunt-contrib-jshint');
			grunt.loadNpmTasks('grunt-contrib-watch');


			grunt.registerTask("build", ["concat:all"]);
			grunt.registerTask("full", ["concat:all" , "uglify:dist"]);
			// task: test
			grunt.registerTask('test', ['jasmine']);
			//grunt.registerTask('test', ['jshint:all', 'jasmine', jasmine-node']);

			// Default task.
			grunt.registerTask('default', ['build']);
			};
